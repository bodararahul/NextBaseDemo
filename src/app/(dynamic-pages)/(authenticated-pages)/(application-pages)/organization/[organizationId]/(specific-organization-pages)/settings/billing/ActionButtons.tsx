'use client';

import { Button } from '@/components/ui/Button';
import { T } from '@/components/ui/Typography';
import {
  createCheckoutSessionAction,
  createCustomerPortalLinkAction,
} from '@/data/user/organizations';
import { useToastMutation } from '@/hooks/useToastMutation';
import { getStripe } from '@/utils/stripe-client';
import ExternalLinkIcon from 'lucide-react/dist/esm/icons/external-link';

export function CreateSubscriptionButton({
  organizationId,
  priceId,
}: {
  organizationId: string;
  priceId: string;
}) {
  const { mutate, isLoading } = useToastMutation(
    async () => {
      return await createCheckoutSessionAction({
        organizationId: organizationId,
        priceId: priceId,
      });
    },
    {
      loadingMessage: 'Please wait...',
      errorMessage: 'Failed to create subscription',
      successMessage: 'Redirecting...',
      onSuccess: async (sessionId) => {
        const stripe = await getStripe();
        stripe?.redirectToCheckout({ sessionId });
      },
    },
  );

  return (
    <Button
      variant="outline"
      className="w-full"
      onClick={() => {
        mutate();
      }}
    >
      {isLoading ? 'Loading...' : 'Choose'}
    </Button>
  );
}

export function StartFreeTrialButton({
  organizationId,
  priceId,
}: {
  organizationId: string;
  priceId: string;
}) {
  const { mutate, isLoading } = useToastMutation(
    async () => {
      return await createCheckoutSessionAction({
        organizationId: organizationId,
        priceId: priceId,
        isTrial: true,
      });
    },
    {
      loadingMessage: 'Please wait...',
      errorMessage: 'Failed to create subscription',
      successMessage: 'Redirecting...',
      onSuccess: async (sessionId) => {
        const stripe = await getStripe();
        stripe?.redirectToCheckout({ sessionId });
      },
    },
  );

  return (
    <Button
      variant="outline"
      className="w-full"
      onClick={() => {
        mutate();
      }}
    >
      {isLoading ? 'Starting trial...' : 'Start Free Trial'}
    </Button>
  );
}

export function ManageSubscriptionButton({
  organizationId,
}: {
  organizationId: string;
}) {
  const { mutate, isLoading } = useToastMutation(
    async () => {
      return await createCustomerPortalLinkAction(organizationId);
    },
    {
      loadingMessage: 'Please wait...',
      errorMessage: 'Failed to get customer portal link',
      successMessage: 'Redirecting...',
      onSuccess: (url) => {
        window.location.assign(url);
      },
    },
  );

  return (
    <div className="space-y-2">
      <Button
        variant="default"
        type="button"
        onClick={() => {
          mutate();
        }}
      >
        <span>{isLoading ? 'Loading...' : 'Manage Subscription'} </span>
        <ExternalLinkIcon aria-hidden="true" className="ml-2 w-5 h-5" />{' '}
      </Button>
      <T.P className="text-gray-500 dark:text-slate-400 text-sm">
        Manage your subscription. You can modify, upgrade or cancel your
        membership from here.
      </T.P>
    </div>
  );
}
