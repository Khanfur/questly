export const Membership = {
  member: 'member',
  f2p: 'f2p',
}

export type Membership = (typeof Membership)[keyof typeof Membership]

export const AccountType = {
  main: 'main',
  ironman: 'ironman',
  hcIronman: 'hc_ironman',
}
export type AccountType = (typeof AccountType)[keyof typeof AccountType]

export interface AccountDetails {
  username: string
  membership: Membership
  accountType: AccountType
}

export const DEFAULT_ACCOUNT_DETAILS: AccountDetails = {
  username: '',
  membership: Membership.member,
  accountType: AccountType.main,
}
