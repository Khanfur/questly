'use client'

import { useMemo } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { questDetails } from '@/lib/data'
import { sageSuggestions, skills } from '@/lib/fixtures'
import { useAccountDetails } from '@/lib/hooks/use-account-details'
import { useQuestProgress } from '@/lib/hooks/use-quest-progress'
import { calculateCombatLevel } from '@/lib/integrations/osrs-hiscores'
import { buildQuestLog } from '@/lib/quest-log/quest-log'
import { QuestStatus } from '@/lib/types/quest'
import { SkillInfo } from '@/lib/types/skill'
import { questStartIcon, skillsIcon } from '@dava96/osrs-icons'

import { useSettingsDrawer } from '@/components/layout/header/settings-drawer-context'
import { AskTheSage } from '@/components/ui/ask-the-sage/ask-the-sage'
import { QuestListItem } from '@/components/ui/quest-list-item/quest-list-item'
import { SectionDivider } from '@/components/ui/section-divider/section-divider'
import { SectionWindow } from '@/components/ui/section-window/section-window'
import { Button } from '@/components/ui/shadcn/button'
import { SkillCard } from '@/components/ui/skill-card/skill-card'
import { SkillCardGrid } from '@/components/ui/skill-card/skill-card-grid'
import { StatCard } from '@/components/ui/stat-card/stat-card'
import { StatCardGroup } from '@/components/ui/stat-card/stat-card-group'

// Cap on how many quests the homepage's Quest Log preview shows, so it stays
// roughly as tall as the Skills grid alongside it instead of listing all ~196
// quests — in-progress quests take priority, "up next" (not-started, in tier
// order) fills any remaining slots.
const HOMEPAGE_QUEST_LIMIT = 4

export default function Home() {
  const router = useRouter()
  const { setOpen } = useSettingsDrawer()
  const { hiscores, hiscoresHydrated } = useAccountDetails()
  const { statusByQuest, setQuestStatus, questsHydrated } = useQuestProgress()

  // Overlay the fixture skill list (names + icons) with real levels from the
  // player's stored hiscores, when available, so the grid reflects their
  // actual progress instead of the placeholder level-99 data.
  const displaySkills: SkillInfo[] = skills.map((skill) => {
    const hiscoreSkill = hiscores?.skills.find((s) => s.name === skill.name)
    return hiscoreSkill && hiscoreSkill.level >= 0 ? { ...skill, level: hiscoreSkill.level } : skill
  })

  const totalLevel =
    hiscores?.overall && hiscores.overall.level >= 0 ? hiscores.overall.level : 2277

  const combatLevel = hiscores ? calculateCombatLevel(hiscores.skills) : 126

  // Build the real Quest Log (from the generated questDetails, merged with
  // the player's locally-tracked completion status) so the homepage preview
  // and Quest Points stat reflect actual progress, same as `/quests`.
  const questLog = useMemo(() => buildQuestLog(questDetails, statusByQuest), [statusByQuest])
  const allQuests = useMemo(() => questLog.flatMap((tier) => tier.quests), [questLog])

  const totalQuests = allQuests.length
  const completedQuests = allQuests.filter((quest) => quest.status === QuestStatus.Completed).length
  const earnedQp = allQuests
    .filter((quest) => quest.status === QuestStatus.Completed)
    .reduce((sum, quest) => sum + quest.questPoints, 0)
  const totalQp = allQuests.reduce((sum, quest) => sum + quest.questPoints, 0)

  const inProgressQuests = allQuests.filter((quest) => quest.status === QuestStatus.InProgress)
  const upNextQuests = allQuests
    .filter((quest) => quest.status === QuestStatus.NotStarted)
    .slice(0, Math.max(0, HOMEPAGE_QUEST_LIMIT - inProgressQuests.length))
  const previewQuests = [...inProgressQuests, ...upNextQuests].slice(0, HOMEPAGE_QUEST_LIMIT)

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
          <Button
            size="lg"
            variant="outline"
            nativeButton={false}
            render={<Link href="/ask-the-sage">Ask the Sage</Link>}
          />
        </div>
      </div>

      <StatCardGroup>
        <StatCard
          className="sm:min-w-45"
          label="Combat Level"
          stat={combatLevel}
          loading={!hiscoresHydrated}
        />
        <StatCard
          className="sm:min-w-45"
          label="Total Level"
          stat={totalLevel}
          loading={!hiscoresHydrated}
        />
        <StatCard
          className="sm:min-w-45"
          label="Quest Points"
          stat={earnedQp}
          secondaryStat={totalQp}
          loading={!questsHydrated}
        />
      </StatCardGroup>

      <SectionDivider className={'my-8'} />

      <div className={'grid grid-cols-1 gap-6 lg:grid-cols-2'}>
        <SectionWindow title={'Skills'} icon={skillsIcon}>
          <SkillCardGrid>
            {displaySkills.map((skill: SkillInfo) => (
              <SkillCard skill={skill} key={skill.name} loading={!hiscoresHydrated} />
            ))}
          </SkillCardGrid>
        </SectionWindow>

        <SectionWindow title={'Quest Log'} icon={questStartIcon}>
          <div className={'flex h-full flex-col'}>
            <div className="flex flex-col">
              {questsHydrated ? (
                previewQuests.map((quest) => (
                  <QuestListItem
                    key={quest.name}
                    quest={quest}
                    onStatusChange={(status) => setQuestStatus(quest.name, status)}
                  />
                ))
              ) : (
                <div className="h-40 animate-pulse rounded bg-muted" aria-hidden="true" />
              )}
            </div>

            <Link
              href="/quests"
              className="label mt-auto self-end pt-2 text-primary hover:underline"
            >
              View full quest log ({completedQuests}/{totalQuests}) →
            </Link>
          </div>
        </SectionWindow>
      </div>

      <SectionDivider className={'my-8'} />

      <AskTheSage
        message={
          "Back again? Your Slayer's crept to 71 but you're still avoiding Vannaka. Ask me anything — task advice, quest order, gear upgrades. I won't judge. Much."
        }
        suggestions={sageSuggestions}
        onOpenChat={() => router.push('/ask-the-sage')}
      />
    </>
  )
}
