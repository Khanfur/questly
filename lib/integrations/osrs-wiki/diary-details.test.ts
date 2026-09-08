import { fetchDiaryDetails, useDiaryDetails } from '@/lib/integrations/osrs-wiki/diary-details'
import { WikiError } from '@/lib/types/osrs-wiki'
import { act, renderHook, waitFor } from '@testing-library/react'

// A trimmed-down but realistic excerpt of the real wikitext returned by
// `action=parse&page=Ardougne_Diary&prop=wikitext&formatversion=2`.
const ARDOUGNE_DIARY_WIKITEXT = `{{Infobox Achievement Diary
|name = Ardougne Diary
|members = Yes
}}
'''The Ardougne Diary''' is an Achievement Diary.

==Easy==
{| class="wikitable lighttable qc-active diary-table" style=width:750px; data-diary-name="Ardougne" data-diary-tier="Easy"
! style="width:50%;" | Task
! style="width:50%;" | Requirements
|-
|1. Have [[Wizard Cromperty]] teleport you to the [[Rune Essence mine]].
|
*{{SCP|Quest}} Completion of [[Rune Mysteries]]
|-
|2. Use the altar in [[East Ardougne]]'s church.
|{{NA|None}}
|}

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

function mockFetchOnce(body: unknown, ok = true, status = 200) {
  global.fetch = jest.fn().mockResolvedValue({
    ok,
    status,
    json: async () => body,
  }) as jest.Mock
}

describe('fetchDiaryDetails', () => {
  afterEach(() => jest.restoreAllMocks())

  it('parses region name, members flag, and every tier from the wikitext', async () => {
    mockFetchOnce({
      parse: { title: 'Ardougne Diary', pageid: 45650, wikitext: ARDOUGNE_DIARY_WIKITEXT },
    })

    const details = await fetchDiaryDetails('Ardougne Diary')

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('mode=details'),
      expect.anything()
    )
    expect(details.pageId).toBe(45650)
    expect(details.title).toBe('Ardougne Diary')
    expect(details.name).toBe('Ardougne')
    expect(details.members).toBe(true)
    expect(details.wikiUrl).toBe('https://oldschool.runescape.wiki/w/Ardougne_Diary')

    expect(details.tiers).toHaveLength(4)
    expect(details.tiers.find((t) => t.tier === 'easy')?.tasks).toEqual([
      {
        description: 'Have Wizard Cromperty teleport you to the Rune Essence mine.',
        requirements: ['Quest Completion of Rune Mysteries'],
      },
      {
        description: "Use the altar in East Ardougne's church.",
        requirements: [],
      },
    ])
    expect(details.tiers.find((t) => t.tier === 'medium')?.tasks).toHaveLength(1)
    expect(details.tiers.find((t) => t.tier === 'hard')?.tasks).toEqual([])
    expect(details.tiers.find((t) => t.tier === 'elite')?.tasks).toEqual([])
  })

  it('throws WikiError when the page is missing', async () => {
    mockFetchOnce({ parse: undefined })
    await expect(fetchDiaryDetails('Nonexistent Diary')).rejects.toThrow(WikiError)
  })

  it('throws WikiError on a failed request', async () => {
    mockFetchOnce({}, false, 500)
    await expect(fetchDiaryDetails('Ardougne Diary')).rejects.toThrow(WikiError)
  })
})

describe('useDiaryDetails', () => {
  afterEach(() => jest.restoreAllMocks())

  it('does nothing when title is null', () => {
    const { result } = renderHook(() => useDiaryDetails(null))
    expect(result.current.loading).toBe(false)
    expect(result.current.data).toBeNull()
  })

  it('fetches diary details on mount', async () => {
    mockFetchOnce({
      parse: { title: 'Ardougne Diary', pageid: 45650, wikitext: ARDOUGNE_DIARY_WIKITEXT },
    })

    const { result } = renderHook(() => useDiaryDetails('Ardougne Diary'))
    expect(result.current.loading).toBe(true)

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.data?.name).toBe('Ardougne')
    expect(result.current.error).toBeNull()
  })

  it('sets error on a failed request', async () => {
    mockFetchOnce({}, false, 500)

    const { result } = renderHook(() => useDiaryDetails('Ardougne Diary'))
    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.data).toBeNull()
    expect(result.current.error).toBeInstanceOf(WikiError)
  })

  it('refetch triggers another request', async () => {
    mockFetchOnce({
      parse: { title: 'Ardougne Diary', pageid: 45650, wikitext: ARDOUGNE_DIARY_WIKITEXT },
    })

    const { result } = renderHook(() => useDiaryDetails('Ardougne Diary'))
    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(global.fetch).toHaveBeenCalledTimes(1)

    act(() => result.current.refetch())
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2))
  })
})
