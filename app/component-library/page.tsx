import { Button } from '@/components/ui/shadcn/button'
import { Badge } from '@/components/ui/shadcn/badge'
import { Progress } from '@/components/ui/shadcn/progress'
import { Separator } from '@/components/ui/shadcn/separator'
import { SectionDivider } from '@/components/ui/section-divider/section-divider'
import { Swatch } from './_components/swatch'
import {Section} from "@/components/ui/section/section";
import {ChatHead} from "@/components/ui/chat-head/chat-head";

export default function ComponentLibrary() {
  return (
    <>
      <h1>Component Library</h1>

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

      <Section title="Buttons">
        <Button>Default</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
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

      <Section title="Progress" className="max-w-md flex-col items-stretch gap-4">
        <div className="flex flex-col gap-1">
          <span className="label">Dragon Slayer II — in progress</span>
          <Progress value={65} />
        </div>
        <div className="flex flex-col gap-1">
          <span className="label">Sins of the Father — completed</span>
          <Progress value={100} variant="secondary" />
        </div>
        <div className="flex flex-col gap-1">
          <span className="label">Song of the Elves — not started</span>
          <Progress value={0} variant="muted" />
        </div>
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
