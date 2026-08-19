import { fetchQuestDetails, useQuestDetails } from '@/lib/integrations/osrs-wiki/quest-details'
import { WikiError } from '@/lib/types/osrs-wiki/osrs-wiki'
import { act, renderHook, waitFor } from '@testing-library/react'

// A trimmed-down but realistic excerpt of the real wikitext returned by
// `action=parse&page=Cook%27s_Assistant&prop=wikitext&formatversion=2`.
const COOKS_ASSISTANT_WIKITEXT = `{{Has quick guide|speedrun=1}}
{{Infobox Quest
|name = Cook's Assistant
|number = 1
|release = [[4 January]] [[2001]]
|members = No
|series = None
|developer = [[Paul Gower]]
}}
'''Cook's Assistant''' is the first quest.

==Details==
{{Quest details
|start = Talk to the [[Cook (Lumbridge)|Cook]] in the kitchen of [[Lumbridge Castle]].
|difficulty = Novice
|description = The Lumbridge Castle [[cook]] is in a mess. It is the [[Duke Horacio|Duke]]'s birthday.
|length = Very Short
|items = * [[Egg]]
* [[Bucket of milk]]
}}

==Rewards==
{{Quest rewards
|name = Cook's Assistant
|qp = 1
|rewards =
* {{SCP|Cooking|300|link=yes}} experience
}}
`

// Trimmed excerpt of Dragon Slayer II's wikitext, which has a series and requirements.
const DRAGON_SLAYER_II_WIKITEXT = `{{Infobox Quest
|name = Dragon Slayer II
|number = 136
|release = [[4 January]] [[2018]]
|members = Yes
|series = [[Quests/Series#Dragonkin|Dragonkin]], #3
}}
'''Dragon Slayer II''' is a quest.

==Details==
{{Quest details
|start = Talk to [[Alec Kincade]] outside the [[Myths' Guild]].
|difficulty = Grandmaster
|length = Very Long
|requirements = *{{SCP|Quest|200|link=yes}} {{Questreqstart|yes}}
*Completion of the following quests:
**[[Legends' Quest]]
|kills = *[[Vorkath]] ''(level 392)''
*[[Spawn (Dragon Slayer II)|Spawn]] ''(level 100)''
|items = *A [[pickaxe]]
*An [[axe]]
}}

==Rewards==
{{Quest rewards
|name = Dragon Slayer II
|qp = 3
}}
`

function mockFetchOnce(body: unknown, ok = true, status = 200) {
  global.fetch = jest.fn().mockResolvedValue({
    ok,
    status,
    json: async () => body,
  }) as jest.Mock
}

describe('fetchQuestDetails', () => {
  afterEach(() => jest.restoreAllMocks())

  it('parses difficulty, length, members, quest points, start, description, requirements, and items', async () => {
    mockFetchOnce({
      parse: { title: "Cook's Assistant", pageid: 2088, wikitext: COOKS_ASSISTANT_WIKITEXT },
    })

    const details = await fetchQuestDetails("Cook's Assistant")

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("mode=details&title=Cook's%20Assistant"),
      expect.anything()
    )
    expect(details).toEqual({
      pageId: 2088,
      title: "Cook's Assistant",
      difficulty: 'novice',
      length: 'Very Short',
      members: false,
      series: null,
      questPoints: 1,
      releaseDate: '4 January 2001',
      released: true,
      start: 'Talk to the Cook in the kitchen of Lumbridge Castle.',
      description: "The Lumbridge Castle cook is in a mess. It is the Duke's birthday.",
      requirements: null,
      enemies: null,
      itemsRequired: ['Egg', 'Bucket of milk'],
      wikiUrl: "https://oldschool.runescape.wiki/w/Cook's_Assistant",
    })
  })

  it('parses a members quest with a series, requirements, and enemies', async () => {
    mockFetchOnce({
      parse: { title: 'Dragon Slayer II', pageid: 104940, wikitext: DRAGON_SLAYER_II_WIKITEXT },
    })

    const details = await fetchQuestDetails('Dragon Slayer II')

    expect(details.difficulty).toBe('grandmaster')
    expect(details.length).toBe('Very Long')
    expect(details.members).toBe(true)
    expect(details.series).toBe('Dragonkin, #3')
    expect(details.questPoints).toBe(3)
    expect(details.releaseDate).toBe('4 January 2018')
    expect(details.released).toBe(true)
    expect(details.start).toBe("Talk to Alec Kincade outside the Myths' Guild.")
    expect(details.requirements).toContain("Completion of Legends' Quest")
    expect(details.requirements).toContain('200 Quest Points')
    expect(details.enemies).toEqual(['Vorkath (level 392)', 'Spawn (level 100)'])
    expect(details.itemsRequired).toEqual(['A pickaxe', 'An axe'])
    expect(details.wikiUrl).toBe('https://oldschool.runescape.wiki/w/Dragon_Slayer_II')
  })

  it('throws WikiError when the page is missing', async () => {
    mockFetchOnce({ parse: undefined })
    await expect(fetchQuestDetails('Nonexistent Quest')).rejects.toThrow(WikiError)
  })

  it('throws WikiError on a failed request', async () => {
    mockFetchOnce({}, false, 500)
    await expect(fetchQuestDetails("Cook's Assistant")).rejects.toThrow(WikiError)
  })
})

// Excerpt mirroring quests whose {{Quest rewards}} (and often
// {{Infobox Quest}}) fields are all packed onto a single line
// (e.g. Dragon Slayer I, Romeo & Juliet) rather than one per line — a
// regression check for a parser bug where such single-line templates lost
// every field after the first because field boundaries were only detected
// at newlines.
const SINGLE_LINE_FIELDS_WIKITEXT = `{{Infobox Quest
|name = Some Quest
|release = [[4 January]] [[2001]]
|members = No
}}
==Details==
{{Quest details
|start = Talk to someone.
|difficulty = Novice
}}
==Rewards==
{{Quest rewards
|image=[[File:Reward scroll.png|centre]]|name=Some Quest|qp=5|rewards=
}}
`

describe('single-line template fields (regression)', () => {
  it('parses fields correctly when packed onto one line, without swallowing subsequent fields', async () => {
    mockFetchOnce({
      parse: { title: 'Some Quest', pageid: 1, wikitext: SINGLE_LINE_FIELDS_WIKITEXT },
    })

    const details = await fetchQuestDetails('Some Quest')

    expect(details.questPoints).toBe(5)
    expect(details.releaseDate).toBe('4 January 2001')
    expect(details.members).toBe(false)
  })
})

// Excerpt mirroring an upcoming/proposed quest the wiki documents ahead of
// release (e.g. "A Ruff Situation") — its `release` field is blank.
const UPCOMING_QUEST_WIKITEXT = `{{Infobox Quest
|name = An Upcoming Quest
|release =
|members = Yes
}}
==Details==
{{Quest details
|difficulty = Novice
}}
==Rewards==
{{Quest rewards
|qp =
}}
`

describe('released', () => {
  it('is false for an upcoming quest with a blank release date', async () => {
    mockFetchOnce({
      parse: { title: 'An Upcoming Quest', pageid: 1, wikitext: UPCOMING_QUEST_WIKITEXT },
    })

    const details = await fetchQuestDetails('An Upcoming Quest')
    expect(details.releaseDate).toBeNull()
    expect(details.released).toBe(false)
  })

  it('is false for a quest scheduled for a future month this year', async () => {
    const futureWikitext = UPCOMING_QUEST_WIKITEXT.replace(
      '|release =',
      `|release = [[December]] [[${new Date().getFullYear() + 1}]]`
    )
    mockFetchOnce({
      parse: { title: 'An Upcoming Quest', pageid: 1, wikitext: futureWikitext },
    })

    const details = await fetchQuestDetails('An Upcoming Quest')
    expect(details.released).toBe(false)
  })
})

describe('useQuestDetails', () => {
  afterEach(() => jest.restoreAllMocks())

  it('fetches details when a title is provided', async () => {
    mockFetchOnce({
      parse: { title: "Cook's Assistant", pageid: 2088, wikitext: COOKS_ASSISTANT_WIKITEXT },
    })

    const { result } = renderHook(() => useQuestDetails("Cook's Assistant"))

    expect(result.current.loading).toBe(true)
    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.data?.difficulty).toBe('novice')
    expect(result.current.error).toBeNull()
  })

  it('resets to null data when title is null', () => {
    const { result } = renderHook(() => useQuestDetails(null))
    expect(result.current.data).toBeNull()
    expect(result.current.loading).toBe(false)
  })

  it('refetch triggers another request', async () => {
    mockFetchOnce({
      parse: { title: "Cook's Assistant", pageid: 2088, wikitext: COOKS_ASSISTANT_WIKITEXT },
    })

    const { result } = renderHook(() => useQuestDetails("Cook's Assistant"))
    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(global.fetch).toHaveBeenCalledTimes(1)

    act(() => result.current.refetch())
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2))
  })
})
