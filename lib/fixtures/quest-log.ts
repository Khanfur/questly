import type { QuestTier } from '@/lib/types/quest'

// Static representative slice of the full Quest Log, grouped by difficulty tier.
// Mirrors the design mock — not an exhaustive list of every OSRS quest.
export const questLog: QuestTier[] = [
  {
    difficulty: 'novice',
    quests: [
      {
        name: "Cook's Assistant",
        difficulty: 'novice',
        status: 'completed',
        questPoints: 1,
        requires: 'None',
      },
      {
        name: 'Sheep Shearer',
        difficulty: 'novice',
        status: 'completed',
        questPoints: 1,
        requires: 'None',
      },
      {
        name: "Witch's Potion",
        difficulty: 'novice',
        status: 'completed',
        questPoints: 1,
        requires: 'None',
      },
      {
        name: 'X Marks the Spot',
        difficulty: 'novice',
        status: 'completed',
        questPoints: 1,
        requires: 'None',
      },
      {
        name: 'The Restless Ghost',
        difficulty: 'novice',
        status: 'not-started',
        questPoints: 1,
        requires: 'None',
        note: 'Ten minutes, tops. Stop putting it off.',
      },
    ],
  },
  {
    difficulty: 'intermediate',
    quests: [
      {
        name: 'Vampyre Slayer',
        difficulty: 'intermediate',
        status: 'completed',
        questPoints: 3,
        requires: 'None',
      },
      {
        name: 'Priest in Peril',
        difficulty: 'intermediate',
        status: 'completed',
        questPoints: 1,
        requires: 'None',
      },
      {
        name: 'Death Plateau',
        difficulty: 'intermediate',
        status: 'completed',
        questPoints: 1,
        requires: 'None',
      },
      {
        name: 'Troll Stronghold',
        difficulty: 'intermediate',
        status: 'not-started',
        questPoints: 1,
        requires: 'Death Plateau',
      },
      {
        name: 'Waterfall Quest',
        difficulty: 'intermediate',
        status: 'completed',
        questPoints: 1,
        requires: 'None',
      },
    ],
  },
  {
    difficulty: 'experienced',
    quests: [
      {
        name: 'Monkey Madness I',
        difficulty: 'experienced',
        status: 'completed',
        questPoints: 3,
        requires: 'Tree Gnome Village, The Grand Tree',
      },
      {
        name: 'Desert Treasure I',
        difficulty: 'experienced',
        status: 'completed',
        questPoints: 3,
        requires: 'Temple of Ikov, The Dig Site',
      },
      {
        name: "Legends' Quest",
        difficulty: 'experienced',
        status: 'completed',
        questPoints: 4,
        requires: '107 Quest Points, several skills 50+',
      },
      {
        name: 'Barbarian Training',
        difficulty: 'experienced',
        status: 'not-started',
        questPoints: 0,
        requires: "Alfred Grimhand's Barcrawl",
        note: 'No QP, but your Fishing level will thank you.',
      },
      {
        name: 'Recipe for Disaster',
        difficulty: 'experienced',
        status: 'not-started',
        questPoints: 2,
        requires: 'Nine sub-quests, varies',
        note: "The one you've been avoiding for two years.",
      },
    ],
  },
  {
    difficulty: 'master',
    quests: [
      {
        name: 'Dragon Slayer I',
        difficulty: 'master',
        status: 'completed',
        questPoints: 2,
        requires: 'None',
      },
      {
        name: "Heroes' Quest",
        difficulty: 'master',
        status: 'completed',
        questPoints: 1,
        requires: 'Level 55 combined skills',
      },
      {
        name: 'While Guthix Sleeps',
        difficulty: 'master',
        status: 'completed',
        questPoints: 4,
        requires: '107 Quest Points, several skills',
      },
      {
        name: 'Ratcatchers',
        difficulty: 'master',
        status: 'completed',
        questPoints: 2,
        requires: "Jungle Potion, Icthlarin's Little Helper",
      },
      {
        name: 'Below Ice Mountain',
        difficulty: 'master',
        status: 'not-started',
        questPoints: 1,
        requires: 'None',
      },
    ],
  },
  {
    difficulty: 'grandmaster',
    quests: [
      {
        name: 'Monkey Madness II',
        difficulty: 'grandmaster',
        status: 'completed',
        questPoints: 4,
        requires: 'Monkey Madness I, Client of Kourend',
      },
      {
        name: 'Sins of the Father',
        difficulty: 'grandmaster',
        status: 'completed',
        questPoints: 4,
        requires: 'A Taste of Hope, Vampyre Slayer',
      },
      {
        name: 'Dragon Slayer II',
        difficulty: 'grandmaster',
        status: 'in-progress',
        questPoints: 5,
        requires: 'Level 200 Quest Points, several skills 50-75',
      },
      {
        name: 'Song of the Elves',
        difficulty: 'grandmaster',
        status: 'not-started',
        questPoints: 4,
        requires: "Mourning's End Part II, 90+ combined skills",
        note: 'Last one on the list. No pressure.',
      },
    ],
  },
]
