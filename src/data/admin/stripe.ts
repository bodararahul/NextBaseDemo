import { supabaseAdminClient } from '@/supabase-clients/admin/supabaseAdminClient';
import { stripe } from '@/utils/stripe';
import Stripe from 'stripe';

export const createOrRetrieveCustomer = async ({
  email,
  organizationId,
  organizationTitle,
}: {
  email?: string;
  organizationId: string;
  organizationTitle?: string;
}) => {
  const { data, error } = await supabaseAdminClient
    .from('customers')
    .select('stripe_customer_id')
    .eq('organization_id', organizationId)
    .single();
  if (error || !data?.stripe_customer_id) {
    // No customer record found, let's create one.
    const customerData: {
      metadata: { supabaseOrganizationId: string };
      email?: string;
      description?: string;
    } = {
      metadata: {
        supabaseOrganizationId: organizationId,
      },
    };
    if (email) customerData.email = email;
    if (organizationTitle) customerData.description = organizationTitle;
    const customer = await stripe.customers.create(customerData);
    // Now insert the customer ID into our Supabase mapping table.
    const { error: supabaseError } = await supabaseAdminClient
      .from('customers')
      .insert([
        { organization_id: organizationId, stripe_customer_id: customer.id },
      ]);
    if (supabaseError) throw supabaseError;
    console.log(`New customer created and inserted for ${organizationId}.`);
    return customer.id;
  }
  return data.stripe_customer_id;
};
