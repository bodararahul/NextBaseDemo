import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from './lib/database.types';

export type AppSupabaseClient = SupabaseClient<Database>;
export type Table<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];
export type TableInsertPayload<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert'];
export type TableUpdatePayload<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update'];

export type View<T extends keyof Database['public']['Views']> =
  Database['public']['Views'][T]['Row'];
export type DBFunction<T extends keyof Database['public']['Functions']> =
  Database['public']['Functions'][T]['Returns'];

export type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

export type Enum<T extends keyof Database['public']['Enums']> =
  Database['public']['Enums'][T];

export interface SupabaseFileUploadOptions {
  /**
   * The number of seconds the asset is cached in the browser and in the Supabase CDN. This is set in the `Cache-Control: max-age=<seconds>` header. Defaults to 3600 seconds.
   */
  cacheControl?: string;
  /**
   * the `Content-Type` header value. Should be specified if using a `fileBody` that is neither `Blob` nor `File` nor `FormData`, otherwise will default to `text/plain;charset=UTF-8`.
   */
  contentType?: string;
  /**
   * When upsert is set to true, the file is overwritten if it exists. When set to false, an error is thrown if the object already exists. Defaults to false.
   */
  upsert?: boolean;
}

/** One of the providers supported by GoTrue. */
export type AuthProvider =
  | 'apple'
  | 'azure'
  | 'bitbucket'
  | 'discord'
  | 'facebook'
  | 'github'
  | 'gitlab'
  | 'google'
  | 'keycloak'
  | 'linkedin'
  | 'notion'
  | 'slack'
  | 'spotify'
  | 'twitch'
  | 'twitter'
  | 'workos';

export type DropzoneFile = File & {
  path: string;
};

export type DropzoneFileWithDuration = DropzoneFile & {
  duration: number;
};

export type NoSubscription = {
  type: 'no-subscription';
};

export type TrialSubscription = {
  type: 'trialing';
  trialStart: string;
  trialEnd: string;
  product: Table<'products'>;
  price: Table<'prices'>;
  subscription: Table<'subscriptions'>;
};

export type ActiveSubscription = {
  type: 'active';
  product: Table<'products'>;
  price: Table<'prices'>;
  subscription: Table<'subscriptions'>;
};

export type PastDueSubscription = {
  type: 'past_due';
  product: Table<'products'>;
  price: Table<'prices'>;
  subscription: Table<'subscriptions'>;
};

export type CanceledSubscription = {
  type: 'canceled';
  product: Table<'products'>;
  price: Table<'prices'>;
  subscription: Table<'subscriptions'>;
};

export type PausedSubscription = {
  type: 'paused';
  product: Table<'products'>;
  price: Table<'prices'>;
  subscription: Table<'subscriptions'>;
};

export type IncompleteSubscription = {
  type: 'incomplete';
  product: Table<'products'>;
  price: Table<'prices'>;
  subscription: Table<'subscriptions'>;
};

export type IncompleteExpiredSubscription = {
  type: 'incomplete_expired';
  product: Table<'products'>;
  price: Table<'prices'>;
  subscription: Table<'subscriptions'>;
};

export type UnpaidSubscription = {
  type: 'unpaid';
  product: Table<'products'>;
  price: Table<'prices'>;
  subscription: Table<'subscriptions'>;
};

export type NormalizedSubscription =
  | NoSubscription
  | TrialSubscription
  | ActiveSubscription
  | PastDueSubscription
  | CanceledSubscription
  | PausedSubscription
  | IncompleteSubscription
  | IncompleteExpiredSubscription
  | UnpaidSubscription;
