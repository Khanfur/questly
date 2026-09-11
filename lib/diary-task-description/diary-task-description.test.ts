import { splitDiaryTaskNote } from '@/lib/diary-task-description/diary-task-description'

describe('splitDiaryTaskNote', () => {
  it('returns the description unchanged with no note when there is no "Note:"', () => {
    expect(splitDiaryTaskNote('Steal a cake.')).toEqual({
      description: 'Steal a cake.',
      note: null,
    })
  })

  it('splits the description at "Note:", trimming both parts', () => {
    expect(
      splitDiaryTaskNote('Buy a newspaper. Note: Can be bought from Benny in Varrock Square.')
    ).toEqual({
      description: 'Buy a newspaper.',
      note: 'Can be bought from Benny in Varrock Square.',
    })
  })

  it('treats a second "Note:" as part of the note text', () => {
    expect(splitDiaryTaskNote('Do the thing. Note: First. Note: Second.')).toEqual({
      description: 'Do the thing.',
      note: 'First. Note: Second.',
    })
  })

  it('returns no note when "Note:" is present but has no trailing text', () => {
    expect(splitDiaryTaskNote('Do the thing. Note:')).toEqual({
      description: 'Do the thing.',
      note: null,
    })
  })
})
