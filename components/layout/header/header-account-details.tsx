'use client'

import { useAccountDetails } from '@/lib/hooks/use-account-details'
import type { AccountType, Membership } from '@/lib/types/account'

import { Input } from '@/components/ui/shadcn/input'
import { Label } from '@/components/ui/shadcn/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/shadcn/radio-group'

export function HeaderAccountDetails() {
  const { accountDetails, updateAccountDetails } = useAccountDetails()

  return (
    <div className="flex flex-col gap-4">
      <span className="text-sm font-medium text-foreground">Account details</span>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="sg-radio-username">RuneScape username</Label>
        <Input
          id="sg-radio-username"
          placeholder="Zezima"
          value={accountDetails.username}
          onChange={(event) => updateAccountDetails({ username: event.target.value })}
        />
        <span className="helper-text">Used to sync your Hiscores and quest progress.</span>
      </div>

      <div className="flex flex-col gap-2">
        <Label>Membership</Label>
        <RadioGroup
          value={accountDetails.membership}
          onValueChange={(value: Membership) =>
            updateAccountDetails({ membership: value as Membership })
          }
          className="gap-2"
        >
          <div className="flex items-center gap-2">
            <RadioGroupItem value="member" id="sg-radio-member" />
            <Label htmlFor="sg-radio-member">Member</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="f2p" id="sg-radio-f2p" />
            <Label htmlFor="sg-radio-f2p">Free to play</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="flex flex-col gap-2">
        <Label>Account type</Label>
        <RadioGroup
          value={accountDetails.accountType}
          onValueChange={(value: AccountType) =>
            updateAccountDetails({ accountType: value as AccountType })
          }
          className="gap-2"
        >
          <div className="flex items-center gap-2">
            <RadioGroupItem value="main" id="sg-radio-main" />
            <Label htmlFor="sg-radio-main">Main</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="ironman" id="sg-radio-ironman" />
            <Label htmlFor="sg-radio-ironman">Ironman</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="hc_ironman" id="sg-radio-hc-ironman" />
            <Label htmlFor="sg-radio-hc-ironman">Hardcore Ironman</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}
