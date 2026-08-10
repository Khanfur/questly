import { Input } from '@/components/ui/shadcn/input'
import { Label } from '@/components/ui/shadcn/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/shadcn/radio-group'

export function HeaderAccountDetails() {
  return (
    <div className="flex flex-col gap-4">
      <span className="text-sm font-medium text-foreground">Account details</span>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="sg-radio-username">RuneScape username</Label>
        <Input id="sg-radio-username" placeholder="Zezima" />
        <span className="helper-text">Used to sync your Hiscores and quest progress.</span>
      </div>

      <div className="flex flex-col gap-2">
        <Label>Membership</Label>
        <RadioGroup defaultValue="member" className="gap-2">
          <div className="flex items-center gap-2">
            <RadioGroupItem value="member" id="sg-radio-member" />
            <Label htmlFor="sg-radio-member">Member</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="f2p" id="sg-radio-f2p" />
            <Label htmlFor="sg-radio-f2p">Free-to-play</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="flex flex-col gap-2">
        <Label>Account type</Label>
        <RadioGroup defaultValue="normal" className="gap-2">
          <div className="flex items-center gap-2">
            <RadioGroupItem value="normal" id="sg-radio-normal" />
            <Label htmlFor="sg-radio-normal">Normal Account</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="ironman" id="sg-radio-ironman" />
            <Label htmlFor="sg-radio-ironman">Ironman</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}
