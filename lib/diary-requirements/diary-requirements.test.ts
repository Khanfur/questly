import { groupDiaryRequirements } from '@/lib/diary-requirements/diary-requirements'

describe('groupDiaryRequirements', () => {
  it('returns an empty array for no requirements', () => {
    expect(groupDiaryRequirements([])).toEqual([])
  })

  it('groups skill level requirements under Skills', () => {
    const groups = groupDiaryRequirements(['Agility level 10', 'Mining level 40'])
    expect(groups).toEqual([
      {
        category: 'skills',
        label: 'Skills',
        requirements: ['Agility level 10', 'Mining level 40'],
      },
    ])
  })

  it('groups "Quest " prefixed requirements under Quests, stripping the prefix', () => {
    const groups = groupDiaryRequirements([
      'Quest Completion of Shilo Village',
      'Quest Started The Giant Dwarf',
    ])
    expect(groups).toEqual([
      {
        category: 'quests',
        label: 'Quests',
        requirements: ['Completion of Shilo Village', 'Started The Giant Dwarf'],
      },
    ])
  })

  it('groups "N Quest Points" requirements under Quests', () => {
    const groups = groupDiaryRequirements(['32 Quest Points'])
    expect(groups).toEqual([
      { category: 'quests', label: 'Quests', requirements: ['32 Quest Points'] },
    ])
  })

  it('falls back to Items for everything else', () => {
    const groups = groupDiaryRequirements(['Any pickaxe', '30 coins or a Ring of Charos(a)'])
    expect(groups).toEqual([
      {
        category: 'items',
        label: 'Items',
        requirements: ['Any pickaxe', '30 coins or a Ring of Charos(a)'],
      },
    ])
  })

  it('orders groups as Skills, Quests, then Items and omits empty categories', () => {
    const groups = groupDiaryRequirements([
      'Any pickaxe',
      'Quest Completion of Rune Mysteries',
      'Mining level 40',
    ])
    expect(groups.map((g) => g.category)).toEqual(['skills', 'quests', 'items'])
  })
})
