'use server';
import { createSupabaseUserServerActionClient } from '@/supabase-clients/user/createSupabaseUserServerActionClient';
import { createSupabaseUserServerComponentClient } from '@/supabase-clients/user/createSupabaseUserServerComponentClient';
import { Enum, NormalizedSubscription, Table, UnwrapPromise } from '@/types';
import { serverGetLoggedInUser } from '@/utils/server/serverGetLoggedInUser';
import { createOrRetrieveCustomer } from '../admin/stripe';
import { stripe } from '@/utils/stripe';
import { toSiteURL } from '@/utils/helpers';
import { revalidatePath } from 'next/cache';

export const createOrganization = async (name: string) => {
  const supabase = createSupabaseUserServerComponentClient();
  const user = await serverGetLoggedInUser();
  const { data, error } = await supabase
    .from('organizations')
    .insert({
      title: name,
      created_by: user.id,
    })
    .select('*')
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export async function fetchSlimOrganizations() {
  const currentUser = await serverGetLoggedInUser();
  const supabaseClient = createSupabaseUserServerComponentClient();
  const { data: organizations, error: organizationsError } =
    await supabaseClient
      .from('organization_members')
      .select('organization_id')
      .eq('member_id', currentUser.id);

  if (organizationsError) {
    throw organizationsError;
  }

  const { data, error } = await supabaseClient
    .from('organizations')
    .select('id,title')
    .in(
      'id',
      organizations.map((org) => org.organization_id),
    )
    .order('created_at', {
      ascending: false,
    });
  if (error) {
    throw error;
  }

  return data || [];
}

export const getSlimOrganizationById = async (organizationId: string) => {
  const supabaseClient = createSupabaseUserServerComponentClient();
  const { data, error } = await supabaseClient
    .from('organizations')
    .select('id,title')
    .eq('id', organizationId)
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const getAllOrganizationsForUser = async (userId: string) => {
  const supabase = createSupabaseUserServerComponentClient();
  const { data: organizations, error: organizationsError } = await supabase.rpc(
    'get_organizations_for_user',
    {
      user_id: userId,
    },
  );
  if (!organizations) {
    throw new Error(organizationsError.message);
  }

  const { data, error } = await supabase
    .from('organizations')
    .select(
      '*, organization_members(id,member_id,member_role, user_profiles(*)), subscriptions(id, prices(id,products(id,name)))',
    )
    .in(
      'id',
      organizations.map((org) => org.organization_id),
    )
    .order('created_at', {
      ascending: false,
    });
  if (error) {
    throw error;
  }

  return data || [];
};

export type InitialOrganizationListType = UnwrapPromise<
  ReturnType<typeof getAllOrganizationsForUser>
>;

export const getOrganizationById = async (organizationId: string) => {
  const supabaseClient = createSupabaseUserServerComponentClient();

  const { data, error } = await supabaseClient
    .from('organizations')
    // query team_members and team_invitations in one go
    .select('*')
    .eq('id', organizationId)
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const getOrganizationTitle = async (organizationId: string) => {
  const supabaseClient = createSupabaseUserServerComponentClient();

  const { data, error } = await supabaseClient
    .from('organizations')
    // query team_members and team_invitations in one go
    .select('id,title')
    .eq('id', organizationId)
    .single();

  if (error) {
    throw error;
  }

  return data.title;
};

export const getLoggedInUserOrganizationRole = async (
  organizationId: string,
): Promise<Enum<'organization_member_role'>> => {
  const { id: userId } = await serverGetLoggedInUser();
  const supabase = createSupabaseUserServerComponentClient();
  const { data, error } = await supabase
    .from('organization_members')
    .select('*')
    .eq('member_id', userId)
    .eq('organization_id', organizationId)
    .single();

  if (error) {
    throw error;
  } else if (!data) {
    throw new Error('User is not a member of this organization');
  }

  return data.member_role;
};

export const updateOrganizationTitle = async (
  organizationId: string,
  title: string,
): Promise<Table<'organizations'>> => {
  'use server';
  const supabase = createSupabaseUserServerActionClient();
  const { data, error } = await supabase
    .from('organizations')
    .update({
      title,
    })
    .eq('id', organizationId)
    .select('*')
    .single();

  if (error) {
    throw error;
  }

  revalidatePath(`/organization/${organizationId}`);
  return data;
};

export const getNormalizedOrganizationSubscription = async (
  organizationId: string,
): Promise<NormalizedSubscription> => {
  const supabase = createSupabaseUserServerComponentClient();
  const { data: subscriptions, error } = await supabase
    .from('subscriptions')
    .select('*, prices(*, products(*))')
    .eq('organization_id', organizationId)
    .in('status', ['trialing', 'active']);

  if (error) {
    throw error;
  }

  if (!subscriptions || subscriptions.length === 0) {
    return {
      type: 'no-subscription',
    };
  }

  try {
    const subscription = subscriptions[0];
    console.log(subscription);

    const price = Array.isArray(subscription.prices)
      ? subscription.prices[0]
      : subscription.prices;
    if (!price) {
      throw new Error('No price found');
    }

    const product = Array.isArray(price.products)
      ? price.products[0]
      : price.products;
    if (!product) {
      throw new Error('No product found');
    }

    if (subscription.status === 'trialing') {
      if (!subscription.trial_start || !subscription.trial_end) {
        throw new Error('No trial start or end found');
      }
      return {
        type: 'trialing',
        trialStart: subscription.trial_start,
        trialEnd: subscription.trial_end,
        product: product,
        price: price,
        subscription,
      };
    } else if (subscription.status) {
      return {
        type: subscription.status,
        product: product,
        price: price,
        subscription,
      };
    } else {
      return {
        type: 'no-subscription',
      };
    }
  } catch (err) {
    return {
      type: 'no-subscription',
    };
  }
};

export async function createCustomerPortalLinkAction(organizationId: string) {
  'use server';
  const user = await serverGetLoggedInUser();
  const supabaseClient = createSupabaseUserServerActionClient();
  const { data, error } = await supabaseClient
    .from('organizations')
    .select('id, title')
    .eq('id', organizationId)
    .single();

  if (error) {
    throw error;
  }

  if (!data) {
    throw new Error('Organization not found');
  }

  const customer = await createOrRetrieveCustomer({
    organizationId: organizationId,
    organizationTitle: data.title,
    email: user.email || '',
  });

  if (!customer) throw Error('Could not get customer');
  const { url } = await stripe.billingPortal.sessions.create({
    customer,
    return_url: toSiteURL(`/organization/${organizationId}/settings/billing`),
  });

  return url;
}

export async function createCheckoutSessionAction({
  organizationId,
  priceId,
  isTrial = false,
}: {
  organizationId: string;
  priceId: string;
  isTrial?: boolean;
}) {
  'use server';
  const TRIAL_DAYS = 14;
  const user = await serverGetLoggedInUser();

  const organizationTitle = await getOrganizationTitle(organizationId);

  const customer = await createOrRetrieveCustomer({
    organizationId: organizationId,
    organizationTitle: organizationTitle,
    email: user.email || '',
  });
  if (!customer) throw Error('Could not get customer');
  if (isTrial) {
    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      customer,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      allow_promotion_codes: true,
      subscription_data: {
        trial_period_days: TRIAL_DAYS,
        trial_settings: {
          end_behavior: {
            missing_payment_method: 'cancel',
          },
        },
        metadata: {},
      },
      success_url: toSiteURL(
        `/organization/${organizationId}/settings/billing`,
      ),
      cancel_url: toSiteURL(`/organization/${organizationId}/settings/billing`),
    });

    return stripeSession.id;
  } else {
    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      customer,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      allow_promotion_codes: true,
      subscription_data: {
        trial_from_plan: true,
        metadata: {},
      },
      success_url: toSiteURL(
        `/organization/${organizationId}/settings/billing`,
      ),
      cancel_url: toSiteURL(`/organization/${organizationId}/settings/billing`),
    });

    return stripeSession.id;
  }
}

export const getActiveProductsWithPrices = async () => {
  const supabase = createSupabaseUserServerComponentClient();
  const { data, error } = await supabase
    .from('products')
    .select('*, prices(*)')
    .eq('active', true)
    .eq('prices.active', true)
    .order('unit_amount', { foreignTable: 'prices' });

  if (error) {
    throw error;
  }

  return data || [];
};

export const getPendingInvitationsInOrganization = async (
  organizationId: string,
) => {
  const supabase = createSupabaseUserServerComponentClient();
  const { data, error } = await supabase
    .from('organization_join_invitations')
    .select(
      '*, inviter:user_profiles!inviter_user_id(*), invitee:user_profiles!invitee_user_id(*)',
    )
    .eq('organization_id', organizationId)
    .eq('status', 'active');

  if (error) {
    throw error;
  }

  return data || [];
};
export const getTeamMembersInOrganization = async (organizationId: string) => {
  const supabase = createSupabaseUserServerComponentClient();
  const { data, error } = await supabase
    .from('organization_members')
    .select('*, user_profiles(*)')
    .eq('organization_id', organizationId);

  if (error) {
    throw error;
  }

  return data.map((member) => {
    const { user_profiles, ...rest } = member;
    if (!user_profiles) {
      throw new Error('No user profile found for member');
    }
    return {
      ...rest,
      user_profiles: user_profiles,
    };
  });
};

export const getOrganizationAdmins = async (organizationId: string) => {
  const supabase = createSupabaseUserServerComponentClient();
  const { data, error } = await supabase
    .from('organization_members')
    .select('*, user_profiles(*)')
    .eq('organization_id', organizationId)
    .or('member_role.eq.admin,member_role.eq.owner');

  if (error) {
    throw error;
  }

  return data.map((member) => {
    const { user_profiles, ...rest } = member;
    if (!user_profiles) {
      throw new Error('No user profile found for member');
    }
    return {
      ...rest,
      user_profiles: user_profiles,
    };
  });
};

export const getDefaultOrganization = async () => {
  const supabaseClient = createSupabaseUserServerComponentClient();
  const user = await serverGetLoggedInUser();
  const { data: preferences, error } = await supabaseClient
    .from('user_private_info')
    .select('id, default_organization')
    .eq('id', user.id)
    .single();

  if (error) {
    throw error;
  }

  return preferences.default_organization;
};

export async function setDefaultOrganization(organizationId: string) {
  const supabaseClient = createSupabaseUserServerComponentClient();
  const user = await serverGetLoggedInUser();
  const { error: updateError } = await supabaseClient
    .from('user_private_info')
    .update({ default_organization: organizationId })
    .eq('id', user.id);

  if (updateError) {
    throw updateError;
  }

  revalidatePath('/');
}
