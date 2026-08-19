export type Membership = 'member' | 'f2p'

export type AccountType = 'normal' | 'ironman'

export interface AccountDetails {
  username: string
  membership: Membership
  accountType: AccountType
}

export const DEFAULT_ACCOUNT_DETAILS: AccountDetails = {
  username: '',
  membership: 'member',
  accountType: 'normal',
}
