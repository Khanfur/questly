'use client'

import {
  agilityIcon,
  attackIcon,
  constructionIcon,
  cookingIcon,
  craftingIcon,
  defenceIcon,
  farmingIcon,
  firemakingIcon,
  fishingIcon,
  fletchingIcon,
  herbloreIcon,
  hitpointsIcon,
  hunterIcon,
  magicIcon,
  miningIcon,
  prayerIcon,
  questStartIcon,
  rangedIcon,
  runecraftIcon,
  skillsIcon,
  slayerIcon,
  smithingIcon,
  strengthIcon,
  thievingIcon,
  woodcuttingIcon,
} from '@dava96/osrs-icons'

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

export type SkillInfo = {
  name: string
  level: number
  icon: string
}

type QuestInfo = {
  name: string
  status: 'completed' | 'in-progress' | 'not-started'
}

const skills: SkillInfo[] = [
  { name: 'Attack', level: 99, icon: attackIcon },
  { name: 'Strength', level: 99, icon: strengthIcon },
  { name: 'Defence', level: 99, icon: defenceIcon },
  { name: 'Ranged', level: 99, icon: rangedIcon },
  { name: 'Prayer', level: 99, icon: prayerIcon },
  { name: 'Magic', level: 99, icon: magicIcon },
  { name: 'Runecraft', level: 99, icon: runecraftIcon },
  { name: 'Construction', level: 99, icon: constructionIcon },
  { name: 'Hitpoints', level: 99, icon: hitpointsIcon },
  { name: 'Agility', level: 99, icon: agilityIcon },
  { name: 'Herblore', level: 99, icon: herbloreIcon },
  { name: 'Thieving', level: 99, icon: thievingIcon },
  { name: 'Crafting', level: 99, icon: craftingIcon },
  { name: 'Fletching', level: 99, icon: fletchingIcon },
  { name: 'Slayer', level: 99, icon: slayerIcon },
  { name: 'Hunter', level: 99, icon: hunterIcon },
  { name: 'Mining', level: 99, icon: miningIcon },
  { name: 'Smithing', level: 99, icon: smithingIcon },
  { name: 'Fishing', level: 99, icon: fishingIcon },
  { name: 'Cooking', level: 99, icon: cookingIcon },
  { name: 'Firemaking', level: 99, icon: firemakingIcon },
  { name: 'Woodcutting', level: 99, icon: woodcuttingIcon },
  { name: 'Farming', level: 99, icon: farmingIcon },
]

const sageSuggestions = [
  { id: 'quest-points', label: 'What should I do next for quest points?' },
  { id: 'gear', label: 'Best in slot for my current combat level?' },
  { id: 'chat', label: 'Just here to chat.' },
]

const quests: QuestInfo[] = [
  { name: 'Dragon Slayer II', status: 'in-progress' },
  { name: 'Song of the Elves', status: 'not-started' },
  { name: 'Sins of the Father', status: 'completed' },
  { name: 'Monkey Madness II', status: 'completed' },
]

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
