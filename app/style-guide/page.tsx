import { Button } from '@/components/ui/shadcn/button'
import { Badge } from '@/components/ui/shadcn/badge'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from '@/components/ui/shadcn/card'
import { Progress } from '@/components/ui/shadcn/progress'
import { Separator } from '@/components/ui/shadcn/separator'
import { Input } from '@/components/ui/shadcn/input'
import { Textarea } from '@/components/ui/shadcn/textarea'
import { Label } from '@/components/ui/shadcn/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/shadcn/select'
import { Checkbox } from '@/components/ui/shadcn/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/shadcn/radio-group'
import { Switch } from '@/components/ui/shadcn/switch'
import { SectionDivider } from '@/components/ui/section-divider/section-divider'
import { Swatch } from './_components/swatch'
import { ThemeColorPalette } from './_components/color-swatch'
import { SpacingScale } from './_components/spacing-scale'
import { GridExample } from './_components/grid-example'
import {Section} from "@/components/ui/section/section";
import {ChatHead} from "@/components/ui/chat-head/chat-head";
import { QuestProgress } from "@/components/ui/quest-progress/quest-progress"

export default function StyleGuide() {
  return (
    <>
      <h1>Style Guide</h1>

      <Section title="Typography" className="flex-col items-stretch gap-4 rounded-lg border border-border bg-card p-6">
        <Swatch label=".eyebrow">
          <span className="eyebrow">Companion for Gielinor</span>
        </Swatch>
        <Swatch label="h1">
          <h1>Track the grind. Trust the Sage.</h1>
        </Swatch>
        <Swatch label="h2">
          <h2>Song of the Elves</h2>
        </Swatch>
        <Swatch label="h3">
          <h3>Dragon Slayer II</h3>
        </Swatch>
        <Swatch label="h4">
          <h4>Combat Level</h4>
        </Swatch>
        <Swatch label="p">
          <p>
            Questly keeps every skill, quest and diary in one parchment — and a Sage on call
            whenever you&apos;re stuck between a slayer task and a life choice.
          </p>
        </Swatch>
        <div className="flex flex-wrap items-end gap-6">
          <Swatch label=".section-heading">
            <span className="section-heading">Skills</span>
          </Swatch>
          <Swatch label=".label">
            <span className="label">Stats</span>
          </Swatch>
          <Swatch label=".stat-value">
            <span className="stat-value">1,543</span>
          </Swatch>
        </div>
      </Section>

      <Section title="Colors" className="flex-col items-stretch gap-4 lg:flex-row lg:items-start">
        <div className="flex-1">
          <ThemeColorPalette theme="light" label="Light" />
        </div>
        <div className="flex-1">
          <ThemeColorPalette theme="dark" label="Dark" />
        </div>
      </Section>

      <Section title="Spacing" className="max-w-md flex-col items-stretch gap-4">
        <SpacingScale />
      </Section>

      <Section title="Grid" className="flex-col items-stretch gap-4">
        <GridExample />
      </Section>

      <Section title="Buttons">
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="link">Link</Button>
      </Section>

      <Section title="Hero CTAs" className="gap-3">
        <Button size="lg">View my stats</Button>
        <Button size="lg" variant="outline">
          Ask the Sage
        </Button>
      </Section>

      <Section title="Badges">
        <Badge>In Progress</Badge>
        <Badge variant="secondary">Completed</Badge>
        <Badge variant="muted">Not Started</Badge>
        <Badge variant="destructive">Failed</Badge>
        <Badge variant="outline">Outline</Badge>
      </Section>

      <Section title="Card" className="items-start gap-4">
        <Card className="w-72">
          <CardHeader>
            <CardTitle>Dragon Slayer II</CardTitle>
            <CardDescription>Quest • Grandmaster</CardDescription>
            <CardAction>
              <Badge variant="secondary">In Progress</Badge>
            </CardAction>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Track down the Elder Kiln and prove yourself against a dragonkin.
            </p>
          </CardContent>
          <CardFooter>
            <Button size="sm" variant="outline">
              View details
            </Button>
          </CardFooter>
        </Card>

        <Card size="sm" className="w-72">
          <CardHeader>
            <CardTitle>Cook&apos;s Assistant</CardTitle>
            <CardDescription>Quest • Novice</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Gather an egg, a bucket of milk, and a pot of flour for the cook.
            </p>
          </CardContent>
        </Card>
      </Section>

      <Section title="Progress" className="max-w-md flex-col items-stretch gap-4">
        <QuestProgress questName="Cook's Assistant" status="completed" />
        <QuestProgress questName="Dragon Slayer II" status="in-progress" />
        <QuestProgress questName="Song of the Elves" status="not-started" />
      </Section>

      <Section title="Form Controls" className="max-w-md flex-col items-stretch gap-6">
        <Swatch label="Label">
          <Label htmlFor="sg-label-demo">Character name</Label>
        </Swatch>

        <Swatch label="Helper text" className="flex flex-col gap-1.5">
          <Label htmlFor="sg-helper-demo">RuneScape username</Label>
          <Input id="sg-helper-demo" placeholder="Zezima" />
          <span className="helper-text">Used to sync your Hiscores and quest progress.</span>
        </Swatch>

        <Swatch label="Error message" className="flex flex-col gap-1.5">
          <Label htmlFor="sg-error-demo">RuneScape username</Label>
          <Input id="sg-error-demo" placeholder="Zezima" aria-invalid className="border-destructive" />
          <span className="error-message">Character name is required.</span>
        </Swatch>

        <Swatch label="Input" className="flex flex-col gap-1.5">
          <Label htmlFor="sg-input">Character name</Label>
          <Input id="sg-input" placeholder="Zezima" />
        </Swatch>

        <Swatch label="Input (disabled)" className="flex flex-col gap-1.5">
          <Label htmlFor="sg-input-disabled">Character name</Label>
          <Input id="sg-input-disabled" placeholder="Zezima" disabled />
        </Swatch>

        <Swatch label="Textarea" className="flex flex-col gap-1.5">
          <Label htmlFor="sg-textarea">Quest notes</Label>
          <Textarea id="sg-textarea" placeholder="Talk to Sir Vyvin about the Fremennik Trials..." />
        </Swatch>

        <Swatch label="Select" className="flex flex-col gap-1.5">
          <Label htmlFor="sg-select">Skill</Label>
          <Select>
            <SelectTrigger id="sg-select" className="w-full">
              <SelectValue placeholder="Choose a skill" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="attack">Attack</SelectItem>
              <SelectItem value="slayer">Slayer</SelectItem>
              <SelectItem value="agility">Agility</SelectItem>
            </SelectContent>
          </Select>
        </Swatch>

        <Swatch label="Checkbox" className="flex flex-row items-center gap-2">
          <Checkbox id="sg-checkbox" defaultChecked />
          <Label htmlFor="sg-checkbox">Show completed quests</Label>
        </Swatch>

        <Swatch label="Radio Group" className="flex flex-col gap-2">
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
        </Swatch>

        <Swatch label="Switch" className="flex flex-row items-center gap-2">
          <Switch id="sg-switch" defaultChecked />
          <Label htmlFor="sg-switch">Enable notifications</Label>
        </Swatch>
      </Section>

      <Section title="Separator &amp; Section Divider" className="max-w-md flex-col items-stretch gap-6">
        <Separator />
        <SectionDivider />
      </Section>

      <Section title="Chathead" className="gap-3">
        <ChatHead avatar="the_sage_avatar.png" fallbackAvatar="🧙" status="online" />
        <ChatHead avatar="the_sage_avatar.png" fallbackAvatar="🧙" status="away" />
        <ChatHead avatar="the_sage_avatar.png" fallbackAvatar="🧙" status="offline" />
      </Section>
    </>
  )
}
