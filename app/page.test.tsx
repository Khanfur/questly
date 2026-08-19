import Home from '@/app/page'
import { skills } from '@/lib/fixtures'
import type { OsrsHiscores, SkillEntry } from '@/lib/types/osrs-hiscores/osrs-hiscores'
import { render, screen } from '@testing-library/react'

import { SettingsDrawerProvider } from '@/components/layout/header/settings-drawer-context'

const HISCORES_STORAGE_KEY = 'questly:hiscores'

function renderHome() {
  return render(
    <SettingsDrawerProvider>
      <Home />
    </SettingsDrawerProvider>
  )
}

function buildHiscores(levels: Partial<Record<string, number>>): OsrsHiscores {
  const skillNames = ['Overall', ...skills.map((skill) => skill.name)]

  const hiscoreSkills: SkillEntry[] = skillNames.map((name) => ({
    name,
    rank: 1,
    level: levels[name] ?? 1,
    xp: 0,
  }))

  return {
    skills: hiscoreSkills,
    activities: [],
    overall: hiscoreSkills[0],
  }
}

describe('Home', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('renders the fixture skill levels and placeholder stats when no hiscores are stored', () => {
    renderHome()

    expect(screen.getAllByText('99')).toHaveLength(skills.length)
    expect(screen.getByText('126')).toBeInTheDocument() // Combat Level placeholder
    expect(screen.getByText('2277')).toBeInTheDocument() // Total Level placeholder
  })

  it('overlays real skill levels and a computed combat/total level from stored hiscores', () => {
    const hiscores = buildHiscores({
      Overall: 500,
      Attack: 60,
      Strength: 60,
      Defence: 60,
      Hitpoints: 60,
      Prayer: 43,
      Ranged: 1,
      Magic: 1,
    })
    window.localStorage.setItem(HISCORES_STORAGE_KEY, JSON.stringify(hiscores))

    renderHome()

    expect(screen.getByText('500')).toBeInTheDocument() // Total Level from hiscores.overall
    expect(screen.getByText('74')).toBeInTheDocument() // Combat level per the official formula
    expect(screen.getAllByText('60')).toHaveLength(4) // Attack, Strength, Defence, Hitpoints cards
    expect(screen.queryByText('99')).not.toBeInTheDocument() // fixture placeholder no longer shown
  })
})
