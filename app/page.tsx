'use client'

import { questStartIcon, skillsIcon } from '@dava96/osrs-icons'

import { useSettingsDrawer } from '@/components/layout/header/settings-drawer-context'
import { AskTheSage } from '@/components/ui/ask-the-sage/ask-the-sage'
import { QuestProgress } from '@/components/ui/quest-progress/quest-progress'
import { SectionDivider } from '@/components/ui/section-divider/section-divider'
import { SectionWindow } from '@/components/ui/section-window/section-window'
import { Button } from '@/components/ui/shadcn/button'
import { SkillCard } from '@/components/ui/skill-card/skill-card'
import { SkillCardGrid } from '@/components/ui/skill-card/skill-card-grid'
import { StatCard } from '@/components/ui/stat-card/stat-card'
import { StatCardGroup } from '@/components/ui/stat-card/stat-card-group'
import { quests, sageSuggestions, skills } from '@/lib/fixtures'

export default function Home() {
  const { setOpen } = useSettingsDrawer()

  return (
    <>
      <div className={'flex flex-col items-center mb-4'}>
        <span className="eyebrow">Companion for Gielinor</span>
        <h1>Track the grind.</h1>
        <h1>Trust the Sage.</h1>
        <p className={'max-w-md text-center mb-4'}>
          Questly keeps every skill, quest and diary in one parchment — and a Sage on call whenever
          you're stuck between a slayer task and a life choice.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <Button size="lg" onClick={() => setOpen(true)}>
            View my stats
          </Button>
          <Button size="lg" variant="outline">
            Ask the Sage
          </Button>
        </div>
      </div>

      <StatCardGroup>
        <StatCard className="sm:min-w-45" label="Combat Level" stat={112} />
        <StatCard className="sm:min-w-45" label="Total Level" stat={1543} />
        <StatCard className="sm:min-w-45" label="Quest Points" stat={284} secondaryStat={341} />
      </StatCardGroup>

      <SectionDivider className={'my-8'} />

      <div className={'grid grid-cols-1 gap-6 md:grid-cols-2'}>
        <SectionWindow title={'Skills'} icon={skillsIcon}>
          <SkillCardGrid>
            {skills.map((skill) => (
              <SkillCard skill={skill} key={skill.name} />
            ))}
          </SkillCardGrid>
        </SectionWindow>

        <SectionWindow title={'Quest Log'} icon={questStartIcon}>
          <div className={'flex flex-col gap-4'}>
            {quests.map((quest) => (
              <QuestProgress key={quest.name} questName={quest.name} status={quest.status} />
            ))}
          </div>
        </SectionWindow>
      </div>

      <SectionDivider className={'my-8'} />

      <AskTheSage
        message={
          "Back again? Your Slayer's crept to 71 but you're still avoiding Vannaka. Ask me anything — task advice, quest order, gear upgrades. I won't judge. Much."
        }
        suggestions={sageSuggestions}
      />
    </>
  )
}
