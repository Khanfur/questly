/**
 * @jest-environment node
 */
import {
  extractDiaryTierTable,
  parseDiaryDetails,
  parseDiaryTasks,
} from '../lib/wiki-diary-parser.mjs'

const ARDOUGNE_DIARY_WIKITEXT = `{{Infobox Achievement Diary
|name = Ardougne Diary
|members = Yes
}}
'''The Ardougne Diary''' is an [[Achievement Diary]].

==Easy==
{| class="wikitable lighttable qc-active diary-table" style=width:750px; data-diary-name="Ardougne" data-diary-tier="Easy"
! style="width:50%;" | Task
! style="width:50%;" | Requirements
|-
|1. Have [[Wizard Cromperty]] teleport you to the [[Rune Essence mine]].
|
*{{SCP|Quest}} Completion of [[Rune Mysteries]]
|-
|2. Steal a [[cake]] from the [[Ardougne Baker's Stall.|Ardougne market stalls]].
|
*{{SCP|Thieving|5|link=y}}
|-
|3. Use the altar in [[East Ardougne]]'s church.
|{{NA|None}}
|}

===Rewards===
*[[Ardougne cloak 1]]

==Medium==
{| class="wikitable lighttable qc-active diary-table" style=width:750px; data-diary-name="Ardougne" data-diary-tier="Medium"
! style="width:50%;" | Task
! style="width:50%;" | Requirements
|-
|1. Enter the [[Unicorn]] pen.
|
*{{SCP|Quest}} Started [[Fairytale II - Cure a Queen]]
|}
`

describe('extractDiaryTierTable', () => {
  it('extracts the wikitable for the given tier', () => {
    const block = extractDiaryTierTable(ARDOUGNE_DIARY_WIKITEXT, 'Easy')
    expect(block).toContain('data-diary-tier="Easy"')
    expect(block).toContain('Rune Essence mine')
    expect(block).not.toContain('Unicorn')
  })

  it('returns null when the tier is not present', () => {
    expect(extractDiaryTierTable(ARDOUGNE_DIARY_WIKITEXT, 'Elite')).toBeNull()
  })
})

describe('parseDiaryTasks', () => {
  it('parses each row into a plain-text description and requirements list', () => {
    const block = extractDiaryTierTable(ARDOUGNE_DIARY_WIKITEXT, 'Easy')
    const tasks = parseDiaryTasks(block)

    expect(tasks).toEqual([
      {
        description: 'Have Wizard Cromperty teleport you to the Rune Essence mine.',
        requirements: ['Quest Completion of Rune Mysteries'],
      },
      {
        description: "Steal a cake from the Ardougne market stalls.",
        requirements: ['Thieving level 5'],
      },
      {
        description: "Use the altar in East Ardougne's church.",
        requirements: [],
      },
    ])
  })

  it('returns an empty array for a missing table', () => {
    expect(parseDiaryTasks(null)).toEqual([])
  })
})

describe('parseDiaryDetails', () => {
  it('parses region name, members flag and every tier', () => {
    const details = parseDiaryDetails(45650, 'Ardougne Diary', ARDOUGNE_DIARY_WIKITEXT)

    expect(details.pageId).toBe(45650)
    expect(details.title).toBe('Ardougne Diary')
    expect(details.name).toBe('Ardougne')
    expect(details.members).toBe(true)
    expect(details.wikiUrl).toBe('https://oldschool.runescape.wiki/w/Ardougne_Diary')

    expect(details.tiers).toHaveLength(4)
    expect(details.tiers[0]).toEqual({
      tier: 'easy',
      tasks: expect.arrayContaining([
        expect.objectContaining({ description: expect.stringContaining('Wizard Cromperty') }),
      ]),
    })
    expect(details.tiers[1].tasks).toHaveLength(1)
    expect(details.tiers[2].tasks).toEqual([]) // Hard
    expect(details.tiers[3].tasks).toEqual([]) // Elite
  })
})
