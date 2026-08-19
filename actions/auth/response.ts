/** Mirrors `toSafeOwner()` in server/src/controllers/auth.controller.ts. */
export interface IOwner {
  id: string;
  email: string | null;
  phone: string | null;
  name: string | null;
  payoutAccount: string | null;
  planTier: string;
  reminderTemplate: string;
  hasPin: boolean;
  emailVerified: boolean;
}

export interface IAuthResponseData {
  token: string;
  owner: IOwner;
  isNewOwner?: boolean;
}
