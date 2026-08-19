/**
 * @jest-environment node
 */
import {
  extractTemplateBlock,
  parseBulletList,
  parseQuestDetails,
} from '../lib/wiki-quest-parser.mjs'

const COOKS_ASSISTANT_WIKITEXT = `{{Has quick guide|speedrun=1}}
{{Infobox Quest
|name = Cook's Assistant
|number = 1
|members = No
|series = None
}}
'''Cook's Assistant''' is the first quest.

==Details==
{{Quest details
|start = Talk to the [[Cook (Lumbridge)|Cook]] in the kitchen of [[Lumbridge Castle]].
|difficulty = Novice
|description = The Lumbridge Castle [[cook]] is in a mess.
|length = Very Short
|kills = *[[Chicken]]
|items = *[[Bucket]]
*[[Egg]]
}}

==Rewards==
{{Quest rewards
|name = Cook's Assistant
|qp = 1
}}
`

describe('extractTemplateBlock', () => {
  it('matches nested {{ }} pairs so the block is not cut short', () => {
    const block = extractTemplateBlock(COOKS_ASSISTANT_WIKITEXT, 'Quest details')
    expect(block).toContain('|difficulty = Novice')
    expect(block?.startsWith('{{Quest details')).toBe(true)
    expect(block?.endsWith('}}')).toBe(true)
  })

  it('returns null when the template is not present', () => {
    expect(extractTemplateBlock(COOKS_ASSISTANT_WIKITEXT, 'Nonexistent Template')).toBeNull()
  })
})

describe('parseBulletList', () => {
  it('extracts top-level bullets and strips wikitext markup', () => {
    const list = parseBulletList("*[[Vorkath]] ''(level 392)''\n*[[Spawn]] ''(level 100)''")
    expect(list).toEqual(['Vorkath (level 392)', 'Spawn (level 100)'])
  })

  it('ignores nested sub-bullets', () => {
    const list = parseBulletList("*Completion of the following quests:\n**[[Legends' Quest]]")
    expect(list).toEqual(['Completion of the following quests:'])
  })
})

describe('parseQuestDetails', () => {
  it('parses difficulty, length, members, series, quest points, description, enemies, and items', () => {
    const details = parseQuestDetails(2088, "Cook's Assistant", COOKS_ASSISTANT_WIKITEXT)

    expect(details).toEqual({
      pageId: 2088,
      title: "Cook's Assistant",
      difficulty: 'novice',
      length: 'Very Short',
      members: false,
      series: null,
      questPoints: 1,
      start: 'Talk to the Cook in the kitchen of Lumbridge Castle.',
      description: 'The Lumbridge Castle cook is in a mess.',
      requirements: null,
      enemies: ['Chicken'],
      itemsRequired: ['Bucket', 'Egg'],
      wikiUrl: "https://oldschool.runescape.wiki/w/Cook's_Assistant",
    })
  })

  it('returns null fields for a page missing all quest templates', () => {
    const details = parseQuestDetails(1, 'Not A Quest', 'Just some plain text.')

    expect(details).toEqual({
      pageId: 1,
      title: 'Not A Quest',
      difficulty: null,
      length: null,
      members: false,
      series: null,
      questPoints: null,
      start: null,
      description: null,
      requirements: null,
      enemies: null,
      itemsRequired: null,
      wikiUrl: 'https://oldschool.runescape.wiki/w/Not_A_Quest',
    })
  })
})
