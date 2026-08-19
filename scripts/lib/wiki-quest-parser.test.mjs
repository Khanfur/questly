/**
 * @jest-environment node
 */
import {
  extractTemplateBlock,
  parseBulletList,
  parseQuestDetails,
  parseRequirements,
  parseTemplateFields,
  stripWikitext,
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

describe('parseTemplateFields', () => {
  it('does not swallow the next field when a field is empty', () => {
    const fields = parseTemplateFields(
      '{{Quest details\n|requirements = \n|items = *[[Air talisman]]\n}}'
    )
    expect(fields.requirements).toBe('')
    expect(fields.items).toBe('*[[Air talisman]]')
  })
})

describe('stripWikitext', () => {
  it('expands {{SCP|Skill|Level}} skill clickpics into readable text', () => {
    expect(stripWikitext('{{SCP|Agility|10|link=yes}}')).toBe('Agility level 10')
  })

  it('expands the quest skill clickpic into "N Quest Points"', () => {
    expect(stripWikitext('{{SCP|Quest|200|link=yes}}')).toBe('200 Quest Points')
  })

  it('drops other non-textual templates like {{Boostable}}', () => {
    expect(
      stripWikitext('{{SCP|Herblore|10|link=yes}} {{Boostable|yes}} {{Questreqstart|no}}')
    ).toBe('Herblore level 10')
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

describe('parseRequirements', () => {
  it('keeps flat skill/quest-point requirements as-is', () => {
    const value =
      '* {{SCP|Agility|10|link=yes}} {{Boostable|yes}} {{Questreqstart|no}}\n* {{SCP|Herblore|10|link=yes}} {{Boostable|yes}} {{Questreqstart|no}}'
    expect(parseRequirements(value)).toEqual(['Agility level 10', 'Herblore level 10'])
  })

  it('flattens direct quest prerequisites under a "Completion of the following quests:" header', () => {
    const value =
      '*Completion of the following quests:\n**[[Priest in Peril]]\n**[[The Restless Ghost]]'
    expect(parseRequirements(value)).toEqual([
      'Completion of Priest in Peril',
      'Completion of The Restless Ghost',
    ])
  })

  it('drops transitive prerequisite chains nested more than one level deep', () => {
    const value =
      "*Completion of the following quests:\n**[[Mourning's End Part II]]\n***[[Mourning's End Part I]]\n****[[Big Chompy Bird Hunting]]"
    expect(parseRequirements(value)).toEqual(["Completion of Mourning's End Part II"])
  })

  it('mixes skill requirements and quest completions in the same list', () => {
    const value =
      '*{{SCP|Quest|200|link=yes}}\n*{{SCP|Magic|75|link=yes}}\n*Completion of the following quests:\n**[[Desert Treasure I]]'
    expect(parseRequirements(value)).toEqual([
      '200 Quest Points',
      'Magic level 75',
      'Completion of Desert Treasure I',
    ])
  })

  it('returns null when every bullet is blank', () => {
    expect(parseRequirements('*\n*\n*')).toBeNull()
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
