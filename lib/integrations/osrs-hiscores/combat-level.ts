/**
 * Combat level calculation, per the official formula:
 * https://oldschool.runescape.wiki/w/Combat_level
 *
 *   base   = 0.25 * (Defence + Hitpoints + floor(Prayer / 2))
 *   melee  = 0.325 * (Attack + Strength)
 *   ranged = 0.325 * floor(Ranged * 1.5)
 *   magic  = 0.325 * floor(Magic * 1.5)
 *   level  = floor(base + max(melee, ranged, magic))
 */
import type { SkillEntry } from '@/lib/types/osrs-hiscores/osrs-hiscores'

function levelFor(skills: SkillEntry[], name: string): number {
  const skill = skills.find((s) => s.name === name)
  return skill && skill.level >= 0 ? skill.level : 1
}

export function calculateCombatLevel(skills: SkillEntry[]): number {
  const attack = levelFor(skills, 'Attack')
  const strength = levelFor(skills, 'Strength')
  const defence = levelFor(skills, 'Defence')
  const hitpoints = levelFor(skills, 'Hitpoints')
  const prayer = levelFor(skills, 'Prayer')
  const ranged = levelFor(skills, 'Ranged')
  const magic = levelFor(skills, 'Magic')

  const base = 0.25 * (defence + hitpoints + Math.floor(prayer / 2))
  const melee = 0.325 * (attack + strength)
  const rangedCombat = 0.325 * Math.floor(ranged * 1.5)
  const mageCombat = 0.325 * Math.floor(magic * 1.5)

  return Math.floor(base + Math.max(melee, rangedCombat, mageCombat))
}
