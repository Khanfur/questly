import { calculateCombatLevel } from '@/lib/integrations/osrs-hiscores/combat-level'
import type { SkillEntry } from '@/lib/types/osrs-hiscores'

function skill(name: string, level: number): SkillEntry {
  return { name, rank: 1, level, xp: 0 }
}

function buildSkills(levels: Record<string, number>): SkillEntry[] {
  const defaults: Record<string, number> = {
    Attack: 1,
    Strength: 1,
    Defence: 1,
    Hitpoints: 10,
    Prayer: 1,
    Ranged: 1,
    Magic: 1,
  }
  return Object.entries({ ...defaults, ...levels }).map(([name, level]) => skill(name, level))
}

describe('calculateCombatLevel', () => {
  it('returns 3 for a brand new account (all 1s, 10 hitpoints)', () => {
    expect(calculateCombatLevel(buildSkills({}))).toBe(3)
  })

  it('returns 126 for a max melee account', () => {
    const skills = buildSkills({
      Attack: 99,
      Strength: 99,
      Defence: 99,
      Hitpoints: 99,
      Prayer: 99,
      Ranged: 99,
      Magic: 99,
    })
    expect(calculateCombatLevel(skills)).toBe(126)
  })

  it('is melee-based when attack/strength dominate', () => {
    const skills = buildSkills({
      Attack: 60,
      Strength: 60,
      Defence: 60,
      Hitpoints: 60,
      Prayer: 43,
      Ranged: 1,
      Magic: 1,
    })
    expect(calculateCombatLevel(skills)).toBe(74)
  })

  it('falls back to ranged/magic when they exceed melee', () => {
    const skills = buildSkills({
      Attack: 1,
      Strength: 1,
      Defence: 40,
      Hitpoints: 40,
      Prayer: 1,
      Ranged: 90,
      Magic: 1,
    })
    expect(calculateCombatLevel(skills)).toBe(63)
  })

  it('treats missing or unranked skills (-1) as level 1', () => {
    const skills: SkillEntry[] = [skill('Attack', -1), skill('Hitpoints', 10)]
    expect(calculateCombatLevel(skills)).toBe(3)
  })
})
