import type { Miniquest } from '@/lib/types/quest/quest'

// Static representative slice of the OSRS Miniquests list (see
// https://oldschool.runescape.wiki/w/Miniquests). Miniquests award no quest
// points and aren't grouped into difficulty tiers, so unlike `questLog` this
// fixture is a flat list. Not an exhaustive list of every OSRS miniquest.
export const miniquestLog: Miniquest[] = [
  {
    name: 'Enter the Abyss',
    difficulty: null,
    status: 'completed',
    requires: 'Completion of Rune Mysteries',
    members: true,
  },
  {
    name: 'Mage Arena I',
    difficulty: 'experienced',
    status: 'in-progress',
    requires: 'Magic level 60',
    members: true,
  },
  {
    name: "Daddy's Home",
    difficulty: 'novice',
    status: 'not-started',
    requires: 'None',
    members: true,
  },
  {
    name: 'Curse of the Empty Lord',
    difficulty: null,
    status: 'not-started',
    requires: 'Completion of Mage Arena II',
    members: true,
  },
]
