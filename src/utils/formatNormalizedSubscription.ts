import { NormalizedSubscription } from '@/types';
import moment from 'moment';

type StatusText = {
  title: string;
  sidenote: string;
  description: string;
};

export function formatNormalizedSubscription(
  subscription: NormalizedSubscription,
): StatusText {
  const currentDate = moment();
  const threeDaysFromNow = moment().add(3, 'days');
  let description = '';
  switch (subscription.type) {
    case 'no-subscription':
      return {
        title: '',
        sidenote: 'Start free trial',
        description: 'Activate your free trial now and enjoy all our features!',
      };
    case 'trialing':
      description = `Your ${
        subscription.product.name
      } Plan trial started on ${moment(
        subscription.subscription.trial_start,
      ).format('MMMM Do, YYYY')} and ends on ${moment(
        subscription.subscription.trial_end,
      ).format(
        'MMMM Do, YYYY',
      )}. Enjoy all the features during this trial period.`;
      if (subscription.subscription.canceled_at) {
        return {
          title: `${subscription.product.name} Plan`,
          sidenote: `(Canceled)`,
          description: `Your ${
            subscription.product.name
          } Plan trial was canceled on ${moment(
            subscription.subscription.canceled_at,
          ).format(
            'MMMM Do, YYYY',
          )}. You can start a new trial or choose a different plan.`,
        };
      } else if (
        subscription.subscription.cancel_at &&
        moment(subscription.subscription.cancel_at).isAfter(currentDate)
      ) {
        return {
          title: `${subscription.product.name} Plan`,
          sidenote: `(Cancels end of period)`,
          description: `Your ${
            subscription.product.name
          } Plan trial started on ${moment(
            subscription.subscription.trial_start,
          ).format('MMMM Do, YYYY')}. and cancels on ${moment(
            subscription.subscription.cancel_at,
          ).format(
            'MMMM Do, YYYY',
          )}. Enjoy all the features during this trial period.`,
        };
      } else if (
        moment(subscription.subscription.trial_end).isBetween(
          currentDate,
          threeDaysFromNow,
        )
      ) {
        return {
          title: `${subscription.product.name} Plan`,
          sidenote: '(Trial expires soon)',
          description: `Your ${
            subscription.product.name
          } Plan trial started on ${moment(
            subscription.subscription.trial_start,
          ).format('MMMM Do, YYYY')} and expires soon on ${moment(
            subscription.subscription.trial_end,
          ).format(
            'MMMM Do, YYYY',
          )}. Enjoy all the features during this trial period.`,
        };
      } else {
        return {
          title: `${subscription.product.name} Plan`,
          sidenote: '(Free trial)',
          description,
        };
      }
    case 'active':
      description = `You are currently subscribed to the ${
        subscription.product.name
      } Plan, and your subscription will renew on ${moment(
        subscription.subscription.current_period_end,
      ).format('MMMM Do, YYYY')}. `;
      if (subscription.subscription.canceled_at) {
        return {
          title: `${subscription.product.name} Plan`,
          sidenote: `(Canceled)`,
          description: `Your ${
            subscription.product.name
          } Plan was canceled on ${moment(
            subscription.subscription.canceled_at,
          ).format(
            'MMMM Do, YYYY',
          )}. You can reactivate your plan at any time to continue enjoying our features.`,
        };
      } else if (
        subscription.subscription.cancel_at &&
        moment(subscription.subscription.cancel_at).isAfter(currentDate)
      ) {
        return {
          title: `${subscription.product.name} Plan`,
          sidenote: `(Cancels end of period)`,
          description: `Your ${
            subscription.product.name
          } Plan started on ${moment(
            subscription.subscription.current_period_start,
          ).format('MMMM Do, YYYY')} and cancels on ${moment(
            subscription.subscription.cancel_at,
          ).format(
            'MMMM Do, YYYY',
          )}. You can continue enjoying all the features until then.`,
        };
      } else {
        return {
          title: `${subscription.product.name} Plan`,
          sidenote: '',
          description,
        };
      }
    case 'past_due':
      return {
        title: `${subscription.product.name} Plan`,
        sidenote: '(Past due)',
        description: `Your ${
          subscription.product.name
        } Plan payment is past due since ${moment(
          subscription.subscription.current_period_end,
        ).format(
          'MMMM Do, YYYY',
        )}. Please update your payment information to continue enjoying the features.`,
      };
    case 'canceled':
      description = `Your ${
        subscription.product.name
      } Plan was canceled on ${moment(
        subscription.subscription.canceled_at,
      ).format(
        'MMMM Do, YYYY',
      )}. You can reactivate your plan at any time to continue enjoying our features.`;
      if (
        subscription.subscription.trial_end &&
        moment(subscription.subscription.trial_end).isAfter(currentDate)
      ) {
        return {
          title: `${subscription.product.name} Plan`,
          sidenote: '(Canceled Trial)',
          description,
        };
      } else {
        return {
          title: `${subscription.product.name} Plan`,
          sidenote: '(Canceled)',
          description,
        };
      }
    case 'paused':
      return {
        title: `${subscription.product.name} Plan`,
        sidenote: '(Paused)',
        description: `Your ${subscription.product.name} Plan is currently paused. You can resume it anytime to continue enjoying the features.`,
      };
    case 'incomplete':
    case 'incomplete_expired':
      return {
        title: `${subscription.product.name} Plan`,
        sidenote: '(Incomplete)',
        description: `Your ${subscription.product.name} Plan setup is incomplete. Please complete the setup to enjoy all the features.`,
      };
    case 'unpaid':
      return {
        title: `${subscription.product.name} Plan`,
        sidenote: '(Unpaid)',
        description: `Your ${
          subscription.product.name
        } Plan payment is due since ${moment(
          subscription.subscription.current_period_end,
        ).format(
          'MMMM Do, YYYY',
        )}. Please pay the due amount to continue enjoying the features.`,
      };
    default:
      return {
        title: 'Unknown Subscription Plan',
        sidenote: '',
        description:
          'The status of your subscription plan is currently unknown. Please check back later or contact customer support.',
      };
  }
}
