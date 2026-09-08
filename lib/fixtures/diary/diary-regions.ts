import type { DiaryRegion } from '@/lib/types/diary'

// Static representative slice of the Achievement Diary tracker, matching the design mock.
export const diaryRegions: DiaryRegion[] = [
  {
    name: 'Ardougne',
    tiers: [
      { tier: 'easy', status: 'complete', completedTasks: 7, totalTasks: 7 },
      { tier: 'medium', status: 'complete', completedTasks: 16, totalTasks: 16 },
      { tier: 'hard', status: 'in-progress', completedTasks: 18, totalTasks: 24 },
      { tier: 'elite', status: 'locked', completedTasks: 0, totalTasks: 6 },
    ],
  },
  {
    name: 'Desert',
    tiers: [
      { tier: 'easy', status: 'complete', completedTasks: 8, totalTasks: 8 },
      { tier: 'medium', status: 'complete', completedTasks: 15, totalTasks: 15 },
      { tier: 'hard', status: 'complete', completedTasks: 15, totalTasks: 15 },
      { tier: 'elite', status: 'in-progress', completedTasks: 3, totalTasks: 8 },
    ],
  },
  {
    name: 'Falador',
    tiers: [
      { tier: 'easy', status: 'complete', completedTasks: 10, totalTasks: 10 },
      { tier: 'medium', status: 'complete', completedTasks: 12, totalTasks: 12 },
      { tier: 'hard', status: 'complete', completedTasks: 10, totalTasks: 10 },
      { tier: 'elite', status: 'complete', completedTasks: 6, totalTasks: 6 },
    ],
  },
  {
    name: 'Fremennik',
    tiers: [
      { tier: 'easy', status: 'complete', completedTasks: 7, totalTasks: 7 },
      { tier: 'medium', status: 'in-progress', completedTasks: 8, totalTasks: 12 },
      { tier: 'hard', status: 'locked', completedTasks: 0, totalTasks: 11 },
      { tier: 'elite', status: 'locked', completedTasks: 0, totalTasks: 6 },
    ],
  },
  {
    name: 'Kandarin',
    tiers: [
      { tier: 'easy', status: 'complete', completedTasks: 9, totalTasks: 9 },
      { tier: 'medium', status: 'complete', completedTasks: 12, totalTasks: 12 },
      { tier: 'hard', status: 'complete', completedTasks: 12, totalTasks: 12 },
      { tier: 'elite', status: 'complete', completedTasks: 8, totalTasks: 8 },
    ],
  },
  {
    name: 'Karamja',
    tiers: [
      { tier: 'easy', status: 'complete', completedTasks: 9, totalTasks: 9 },
      { tier: 'medium', status: 'complete', completedTasks: 12, totalTasks: 12 },
      { tier: 'hard', status: 'in-progress', completedTasks: 5, totalTasks: 8 },
      { tier: 'elite', status: 'locked', completedTasks: 0, totalTasks: 4 },
    ],
  },
  {
    name: 'Kourend & Kebos',
    tiers: [
      { tier: 'easy', status: 'complete', completedTasks: 9, totalTasks: 9 },
      { tier: 'medium', status: 'in-progress', completedTasks: 6, totalTasks: 10 },
      { tier: 'hard', status: 'locked', completedTasks: 0, totalTasks: 10 },
      { tier: 'elite', status: 'locked', completedTasks: 0, totalTasks: 6 },
    ],
  },
  {
    name: 'Lumbridge & Draynor',
    tiers: [
      { tier: 'easy', status: 'complete', completedTasks: 8, totalTasks: 8 },
      { tier: 'medium', status: 'complete', completedTasks: 12, totalTasks: 12 },
      { tier: 'hard', status: 'complete', completedTasks: 10, totalTasks: 10 },
      { tier: 'elite', status: 'complete', completedTasks: 6, totalTasks: 6 },
    ],
  },
  {
    name: 'Morytania',
    tiers: [
      { tier: 'easy', status: 'complete', completedTasks: 7, totalTasks: 7 },
      { tier: 'medium', status: 'complete', completedTasks: 14, totalTasks: 14 },
      { tier: 'hard', status: 'complete', completedTasks: 13, totalTasks: 13 },
      { tier: 'elite', status: 'not-started', completedTasks: 0, totalTasks: 6 },
    ],
  },
  {
    name: 'Varrock',
    tiers: [
      { tier: 'easy', status: 'complete', completedTasks: 9, totalTasks: 9 },
      { tier: 'medium', status: 'complete', completedTasks: 13, totalTasks: 13 },
      { tier: 'hard', status: 'complete', completedTasks: 13, totalTasks: 13 },
      { tier: 'elite', status: 'complete', completedTasks: 6, totalTasks: 6 },
    ],
  },
  {
    name: 'Western Provinces',
    tiers: [
      { tier: 'easy', status: 'complete', completedTasks: 10, totalTasks: 10 },
      { tier: 'medium', status: 'in-progress', completedTasks: 7, totalTasks: 12 },
      { tier: 'hard', status: 'locked', completedTasks: 0, totalTasks: 14 },
      { tier: 'elite', status: 'locked', completedTasks: 0, totalTasks: 6 },
    ],
  },
  {
    name: 'Wilderness',
    tiers: [
      { tier: 'easy', status: 'in-progress', completedTasks: 5, totalTasks: 8 },
      { tier: 'medium', status: 'locked', completedTasks: 0, totalTasks: 12 },
      { tier: 'hard', status: 'locked', completedTasks: 0, totalTasks: 10 },
      { tier: 'elite', status: 'locked', completedTasks: 0, totalTasks: 6 },
    ],
  },
]
