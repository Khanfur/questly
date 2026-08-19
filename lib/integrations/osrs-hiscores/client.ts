'use client'

/**
 * OSRS Hiscores (Lite) API integration
 * ------------------------------------------------------------------
 * Endpoint:
 *   https://secure.runescape.com/m=hiscore_oldschool/index_lite.ws?player=NAME
 *
 * The endpoint returns plain CSV text (not JSON). Each line is:
 *   rank,level,experience (for skills)
 *   rank,score (for activities/bosses, no "level")
 *
 * IMPORTANT — CORS:
 * This endpoint does not send CORS headers, so calling it directly from
 * a browser will usually be blocked. In production, proxy the request
 * through your own backend (or a serverless function) and have the
 * frontend hit that instead. `fetchHiscores` below accepts a `baseUrl`
 * override so you can point it at your own proxy, e.g.:
 *   fetchHiscores('Zezima', { baseUrl: '/api/osrs-hiscores' })
 */
import { ACTIVITY_NAMES, SKILL_NAMES } from '@/lib/fixtures'
import type {
  ActivityEntry,
  FetchHiscoresOptions,
  OsrsHiscores,
  SkillEntry,
} from '@/lib/types/osrs-hiscores/osrs-hiscores'
import { HiscoresError } from '@/lib/types/osrs-hiscores/osrs-hiscores'

export function parseHiscoresCsv(csv: string): OsrsHiscores {
  const lines = csv
    .trim()
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)

  const skills: SkillEntry[] = SKILL_NAMES.map((name, i) => {
    const [rank, level, xp] = (lines[i] ?? '').split(',').map(Number)
    return {
      name,
      rank: rank ?? -1,
      level: level ?? -1,
      xp: xp ?? -1,
    }
  })

  const activities: ActivityEntry[] = ACTIVITY_NAMES.map((name, i) => {
    const line = lines[SKILL_NAMES.length + i] ?? ''
    const [rank, score] = line.split(',').map(Number)
    return {
      name,
      rank: rank ?? -1,
      score: score ?? -1,
    }
  })

  const overall = skills[0]

  return { skills, activities, overall }
}

const DEFAULT_BASE_URL = 'https://secure.runescape.com/m=hiscore_oldschool/index_lite.ws'

export async function fetchHiscores(
  playerName: string,
  options: FetchHiscoresOptions = {}
): Promise<OsrsHiscores> {
  const baseUrl = options.baseUrl ?? DEFAULT_BASE_URL
  const url = `${baseUrl}?player=${encodeURIComponent(playerName)}`

  let res: Response
  try {
    res = await fetch(url, { signal: options.signal })
  } catch (err) {
    throw new HiscoresError(
      `Network error while fetching hiscores for "${playerName}": ${(err as Error).message}`
    )
  }

  if (res.status === 404) {
    throw new HiscoresError(`Player "${playerName}" not found.`, 404)
  }
  if (!res.ok) {
    throw new HiscoresError(`Hiscores request failed with status ${res.status}.`, res.status)
  }

  const text = await res.text()
  return parseHiscoresCsv(text)
}
