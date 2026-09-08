/**
 * Full Achievement Diary metadata (region name, members flag, and every
 * difficulty tier's tasks with per-task requirements) for every OSRS diary
 * region, scraped from each page's `{{Infobox Achievement Diary}}` and
 * per-tier task tables via the wiki's `action=parse` endpoint.
 *
 * GENERATED FILE — do not hand-edit.
 * Regenerate all: npm run fetch:diary-details
 * Update one: npm run fetch:diary-details -- --title "Region Diary"
 * Last generated: 2026-09-08T07:59:32.513Z
 * Count: 12 diaries
 */
import type { WikiDiaryDetails } from '@/lib/types/osrs-wiki'

export const diaryDetails: WikiDiaryDetails[] = [
  {
    pageId: 14158,
    title: 'Karamja Diary',
    name: 'Karamja',
    members: true,
    tiers: [
      {
        tier: 'easy',
        tasks: [
          {
            description: 'Pick 5 bananas from the plantation located east of the volcano.',
            requirements: [],
          },
          {
            description:
              'Use the rope swing to travel to the Moss Giant Island north-west of Karamja.',
            requirements: ['Agility level 10'],
          },
          {
            description: 'Mine some gold from the rocks on the north-west peninsula of Karamja.',
            requirements: ['Mining level 40', 'Any pickaxe'],
          },
          {
            description: 'Travel to Port Sarim via the dock, east of Musa Point.',
            requirements: ['30 coins or a Ring of Charos(a)'],
          },
          {
            description: 'Travel to Ardougne via the port near Brimhaven.',
            requirements: ['30 coins or a Ring of Charos(a)'],
          },
          {
            description: 'Explore Cairn Island to the west of Karamja.',
            requirements: ['Agility level 15'],
          },
          {
            description:
              'Use the Fishing spots north of the banana plantation. Note: Fishing at any of the fishing spots there will count for this task.',
            requirements: [
              'Harpoon (or bare-handed fishing), lobster pot, small fishing net, or a fishing rod with bait, depending on the spot you fish at',
            ],
          },
          {
            description:
              'Collect 5 seaweed from anywhere on Karamja. Note: You can just drop and pick up the same seaweed five times.',
            requirements: ["Seaweed (can be found near Jiminua's Jungle Store)"],
          },
          {
            description:
              'Attempt the TzHaar Fight Pits or Fight Cave. Note: You can simply enter and leave after the first wave begins. No actual attempt is necessary, but the Fight Pits will not allow entrance without at least one other player.',
            requirements: [],
          },
          {
            description: 'Kill a jogre in the Pothole dungeon.',
            requirements: ['Weaponry'],
          },
        ],
      },
      {
        tier: 'medium',
        tasks: [
          {
            description: 'Claim a ticket from the Agility Arena in Brimhaven.',
            requirements: ['200 coins', 'Agility level 40 recommended'],
          },
          {
            description: 'Discover hidden wall in the dungeon below the volcano.',
            requirements: ['Quest Started Dragon Slayer I'],
          },
          {
            description:
              'Visit the Isle of Crandor via the dungeon below the volcano. Note: You must go through the hidden wall, past the lesser demons, and then climb the rope to the surface of Crandor to complete this task.',
            requirements: ['Quest Started Dragon Slayer I'],
          },
          {
            description: "Use Vigroy and Hajedy's cart service.",
            requirements: ['Quest Completion of Shilo Village', '200 coins'],
          },
          {
            description: 'Earn 100% favour in the village of Tai Bwo Wannai.',
            requirements: [
              'Quest Completion of Jungle Potion',
              'Woodcutting level 10',
              'See the recommendations',
            ],
          },
          {
            description:
              'Cook a spider on a stick. Note: Cooking a spider on a shaft also counts for this task. This does not have to be done on Karamja.',
            requirements: [
              'Cooking level 16',
              'Spider carcass, and a skewer stick or an arrow shaft',
            ],
          },
          {
            description: 'Charter the Lady of the Waves from Cairn Isle to Port Khazard.',
            requirements: [
              'Quest Completion of Shilo Village',
              'Ship ticket or 20-50 coins (the price is random)',
            ],
          },
          {
            description:
              'Cut a log from a teak tree. Note: Teak trees can be found in the Hardwood Grove or within the harder-to-access Kharazi Jungle.',
            requirements: [
              'Quest Completion of Jungle Potion',
              'Woodcutting level 35',
              'Any axe',
              '100 trading sticks and having helped in Tai Bwo Wannai Cleanup (if using the Hardwood Grove)',
              "Machete or Agility level 79, and having started Quest Legends' Quest (if using the Kharazi Jungle)",
            ],
          },
          {
            description:
              'Cut a log from a mahogany tree. Note: Mahogany trees can be found in the Hardwood Grove or within the harder-to-access Kharazi Jungle.',
            requirements: [
              'Quest Completion of Jungle Potion',
              'Woodcutting level 50',
              'Any axe',
              '100 trading sticks and having helped in Tai Bwo Wannai Cleanup (if using the Hardwood Grove)',
              "Machete or Agility level 79, and having started Quest Legends' Quest (if using the Kharazi Jungle)",
            ],
          },
          {
            description: 'Catch a karambwan.',
            requirements: [
              'Quest Partial completion of Tai Bwo Wannai Trio',
              'Fishing level 65',
              'Karambwan vessel, some raw karambwanji, and a small fishing net',
            ],
          },
          {
            description:
              'Exchange gems for a machete. Note: This is done by talking to Safta Doc with the required items.',
            requirements: [
              'Quest Completion of Jungle Potion',
              'Gout tuber, as well one of the following:',
              'You need to speak to Sharimika and go through the dialogue options and you must have picked up some trading sticks from a villager as reward before the dialogue options will show up for this diary step.',
            ],
          },
          {
            description: 'Use the gnome glider to travel to Karamja.',
            requirements: ['Quest Completion of The Grand Tree'],
          },
          {
            description: 'Grow a healthy fruit tree in the patch near Brimhaven.',
            requirements: ['Farming level 27', 'Any fruit tree sapling, a spade, and a rake'],
          },
          {
            description: 'Trap a horned graahk.',
            requirements: [
              'Hunter level 41',
              "Teasing stick or Hunter's spear, knife, and any logs.",
            ],
          },
          {
            description:
              'Chop the vines to gain deeper access to Brimhaven Dungeon. Note: These are the vines found immediately within the main entrance.',
            requirements: ['Woodcutting level 10', 'Any axe and 875 coins'],
          },
          {
            description:
              'Cross the lava using the stepping stones within Brimhaven Dungeon. Note: Not to be confused with the stepping stones towards the red dragons.',
            requirements: ['Woodcutting level 10 and Agility level 12', 'Any axe and 875 coins'],
          },
          {
            description:
              'Climb the stairs within Brimhaven Dungeon. Note: You have to climb the stairs south of the stepping stones of the previous task, next to the moss giants.',
            requirements: ['Woodcutting level 10', 'Any axe and 875 coins'],
          },
          {
            description:
              'Charter a ship from the shipyard in the far east of Karamja. Note: The destination does not matter for this task.',
            requirements: [
              'Quest Partial completion of The Grand Tree',
              'Enough coins to pay the fare for a charter ship.',
            ],
          },
          {
            description:
              'Mine a red topaz from a gem rock. Note: Gem rocks are found Shilo Village and rarely appear within the Tai Bwo Wannai Cleanup minigame.',
            requirements: [
              'Quest Completion of Jungle Potion, and either completion of Shilo Village or items for Tai Bwo Wannai Cleanup',
              'Mining level 40',
              'Any pickaxe',
            ],
          },
        ],
      },
      {
        tier: 'hard',
        tasks: [
          {
            description:
              'Become the Champion of the Fight Pits. Note: In Deadman Mode, this task is instead "Speak to TzHaar-Mej-Kah at the Fight Pits."',
            requirements: ['At least one other player', 'Weaponry, optionally'],
          },
          {
            description:
              'Kill a Ket-Zek in the Fight Caves. Note: Ket-Zeks start to appear on the 31st wave. You can leave the arena safely after killing it. This wave can be reached with relatively little effort, as long as the Yt-MejKots are kept out of melee range and Protect from Missiles is used against the Tok-Xils. Though, you may as well try to complete the entire Fight Caves when going for this task.',
            requirements: ['See the strategy guide'],
          },
          {
            description: 'Eat an oomlie wrap.',
            requirements: [
              'Cooked oomlie wrap, or the requirements to make it (Cooking level 50 , a palm leaf, and a raw oomlie)',
            ],
          },
          {
            description: 'Craft some nature runes from Essence.',
            requirements: [
              'Runecraft level 44',
              'Pure or daeyalt essence',
              'Access to the Nature Altar (nature talisman/tiara, catalytic talisman/tiara, or the Abyss)',
            ],
          },
          {
            description: 'Cook a karambwan thoroughly.',
            requirements: [
              'Quest Completion of Tai Bwo Wannai Trio (speak to Tinsay after the quest)',
              'Cooking level 30',
              'Raw karambwan, multiple recommended in case of burning one',
            ],
          },
          {
            description: 'Kill a deathwing in the dungeon under the Kharazi Jungle.',
            requirements: [
              "Quest Partial completion of Legends' Quest",
              'Any axe, any machete, any pickaxe, and a lockpick',
            ],
          },
          {
            description: 'Use the crossbow shortcut south of the volcano.',
            requirements: [
              'Agility level 53, Ranged level 42 and Strength level 21',
              'Mith grapple and any crossbow',
            ],
          },
          {
            description:
              'Collect 5 palm leaves. Note: You can just drop and pick up the same palm leaf five times.',
            requirements: [
              "Quest Partial completion of Legends' Quest",
              'Any axe and machete, or Agility level 79 for the vine shortcut',
            ],
          },
          {
            description: 'Be assigned a Slayer task by the Slayer Master in Shilo Village.',
            requirements: [
              'Quest Completion of Shilo Village',
              'Combat level 100 and Slayer level 50, or a Slayer cape',
            ],
          },
          {
            description: 'Kill a metal dragon in Brimhaven Dungeon.',
            requirements: [
              'Woodcutting level 10',
              'Any axe, protection from dragonfire, and weaponry',
              '875 coins (unless you have unlocked permanently free access via either Saniboch or Banisoch)',
            ],
          },
        ],
      },
      {
        tier: 'elite',
        tasks: [
          {
            description:
              'Craft 56 Nature runes simultaneously from Essence without the use of Extracts.',
            requirements: [
              'Runecraft level 91',
              '28 pure or daeyalt essence (less may suffice with Raiments of the Eye pieces)',
              'Access to the Nature Altar (nature talisman/tiara, catalytic talisman/tiara, or the Abyss)',
            ],
          },
          {
            description: 'Equip a Fire Cape or Infernal Cape in Mor Ul Rek.',
            requirements: [
              'See the strategy guide for the TzHaar Fight Cave',
              'Fire cape or infernal cape',
            ],
          },
          {
            description: 'Check the health of a palm tree in Brimhaven.',
            requirements: [
              'Farming level 68',
              'Palm sapling, spade and rake',
              '15 papaya fruit recommended to pay the gardener',
            ],
          },
          {
            description: 'Create an antivenom potion whilst standing in the horse shoe mine.',
            requirements: ['Herblore level 87', "Antidote++ and 5-20 Zulrah's scales (5 per dose)"],
          },
          {
            description:
              'Check the health of your Calquat tree patch. Note: This is the farming patch next to Imiago.',
            requirements: [
              'Farming level 72',
              'Calquat sapling, spade and rake',
              '8 poison ivy berries recommended to pay the gardener',
            ],
          },
        ],
      },
    ],
    wikiUrl: 'https://oldschool.runescape.wiki/w/Karamja_Diary',
  },
  {
    pageId: 44473,
    title: 'Varrock Diary',
    name: 'Varrock',
    members: true,
    tiers: [
      {
        tier: 'easy',
        tasks: [
          {
            description: "Browse Thessalia's store.",
            requirements: [],
          },
          {
            description:
              'Have Aubury teleport you to the Essence mine. Note: You can right-click him to teleport.',
            requirements: ['Quest Completion of Rune Mysteries'],
          },
          {
            description: 'Mine some Iron in the south-east mining patch near Varrock.',
            requirements: ['Mining level 15', 'Any pickaxe'],
          },
          {
            description: 'Make a normal plank at the Sawmill.',
            requirements: [
              '100 coins',
              'Logs, obtainable from a dying tree here with any axe for another easy task',
            ],
          },
          {
            description: 'Enter the second level of the Stronghold of Security.',
            requirements: ['Food recommended at low combat levels'],
          },
          {
            description: 'Jump over the fence south of Varrock.',
            requirements: ['Agility level 13'],
          },
          {
            description: 'Chop down a dying tree in the Lumber Yard.',
            requirements: [
              'Any axe',
              '100 coins recommended, to have the Sawmill operator turn the logs from the tree into a plank for another easy task',
            ],
          },
          {
            description: 'Buy a newspaper. Note: Can be bought from Benny in Varrock Square.',
            requirements: ['50 coins'],
          },
          {
            description:
              'Give a dog a bone! Note: This does not count when done during the investigation segment of Children of the Sun.',
            requirements: ['Bones'],
          },
          {
            description:
              'Spin a bowl on the pottery wheel and fire it in the oven in Barb Village.',
            requirements: ['Crafting level 8', 'Soft clay'],
          },
          {
            description: 'Speak to Haig Halen after obtaining at least 50 Kudos.',
            requirements: ['See Kudos for all activities that grant them'],
          },
          {
            description: 'Craft some Earth runes from Essence.',
            requirements: [
              'Runecraft level 9',
              'Pure, daeyalt, or rune essence',
              'Access to the Earth Altar (earth talisman/tiara, elemental talisman/tiara, or the Abyss)',
            ],
          },
          {
            description: 'Catch some trout in the River Lum at Barbarian Village.',
            requirements: ['Fishing level 20', 'Fly fishing rod and some feathers'],
          },
          {
            description: 'Steal from the Tea stall in Varrock.',
            requirements: ['Thieving level 5'],
          },
        ],
      },
      {
        tier: 'medium',
        tasks: [
          {
            description: 'Have the Apothecary in Varrock make you a strength potion.',
            requirements: ["Limpwurt root, red spiders' eggs, and 5 coins"],
          },
          {
            description: "Enter the Champions' Guild.",
            requirements: ['32 Quest Points'],
          },
          {
            description:
              "Select a colour for your kitten. Note: You can only have one kitten (or cat) following you at a time. If you already have one, you'll have to shoo it away, store it in a menagerie, or sell it for death runes to West Ardougne civilians. Storing it in your inventory or bank does not allow you to purchase a new one.",
            requirements: [
              "Quest Completion of Gertrude's Cat and partial completion of Garden of Tranquillity",
              '100 coins',
              'Wear a Ring of Charos(a)',
            ],
          },
          {
            description:
              'Use the spirit tree north of Varrock. Note: This tree is located in the north-eastern corner of the Grand Exchange.',
            requirements: ['Quest Completion of Tree Gnome Village'],
          },
          {
            description: 'Perform the 4 emotes from the Stronghold of Security.',
            requirements: [
              'Jagex Account or the older RuneScape Authenticator',
              'Food, protection prayers, and/or enough hitpoints to run through all four floors of the stronghold',
            ],
          },
          {
            description: "Enter the Tolna dungeon after completing A Soul's Bane.",
            requirements: ["Quest Completion of A Soul's Bane"],
          },
          {
            description: 'Teleport to the digsite using a Digsite pendant.',
            requirements: [
              'Quest Completion of The Dig Site',
              'Digsite pendant, or a mounted digsite pendant inside any player-owned house (see the House party worlds)',
            ],
          },
          {
            description: 'Cast the teleport to Varrock spell.',
            requirements: ['Magic level 25', 'Means to cast Varrock Teleport ()'],
          },
          {
            description: 'Get a Slayer task from Vannaka.',
            requirements: ['Combat level 40'],
          },
          {
            description:
              "Make 20 Mahogany Planks in one go. Note: You can right-click the Sawmill operator to turn your logs into planks. You'll always need 20 mahogany logs, regardless of whether you're using sawmill vouchers.",
            requirements: ['20 mahogany logs and 30,000 coins'],
          },
          {
            description: 'Pick a White tree fruit.',
            requirements: ['Quest Completion of Garden of Tranquillity', 'Farming level 25'],
          },
          {
            description:
              'Use the balloon to travel from Varrock. Note: The destination does not matter for this task. You can even pick a locked destination and not take the trip.',
            requirements: [
              'Quest Completion of Enlightened Journey',
              'Farming level 30',
              'Firemaking level 40',
              'One set of normal logs, oak logs, yew logs, or magic logs, depending on the chosen destination',
              'If the starting point in Varrock has not been unlocked yet, an additional 10 willow logs are needed to first fly towards it from Entrana',
            ],
          },
          {
            description: 'Complete a lap of the Varrock Agility course.',
            requirements: ['Agility level 30'],
          },
        ],
      },
      {
        tier: 'hard',
        tasks: [
          {
            description: 'Trade furs with the Fancy Dress Seller for a spottier cape and equip it.',
            requirements: [
              'Hunter level 66',
              '800 coins',
              '2 dashing kebbit fur (requires Hunter level 69  if playing as Ironman)',
            ],
          },
          {
            description: 'Speak to Orlando Smith when you have achieved 153 Kudos.',
            requirements: ['See Kudos for all activities that grant them'],
          },
          {
            description: 'Make a Waka canoe near Edgeville.',
            requirements: ['Woodcutting level 57', 'Any axe'],
          },
          {
            description: 'Teleport to Paddewwa.',
            requirements: [
              'Quest Completion of Desert Treasure I',
              'Magic level 54',
              'Ancient Magicks selected',
              'Means to cast Paddewwa Teleport ()',
            ],
          },
          {
            description: 'Teleport to Barbarian Village with a skull sceptre.',
            requirements: ['Skull sceptre, or the required items to create it'],
          },
          {
            description:
              'Chop some yew logs in Varrock and burn them at the top of the Varrock church. Note: There is a yew tree next to the church. Completing or updating any other task in-between these steps will reset the progress for this task. In Deadman Mode, the task is instead "Burn some Yew logs at the top of the Varrock church with 60 Woodcutting."',
            requirements: ['Woodcutting level 60 and Firemaking level 60', 'Any axe and tinderbox'],
          },
          {
            description:
              'Have the Varrock estate agent decorate your house with Fancy Stone. Note: You must finish the dialogue or the task will not count as completed.',
            requirements: [
              'Construction level 50',
              '25,000 coins',
              'Additional 5,000 coins if already using Fancy Stone, to change to something else and back',
            ],
          },
          {
            description:
              "Collect at least 2 yew roots from the Tree patch in Varrock Palace. Note: While 60 Farming is required to grow the yew tree, you'll need 68 Farming to dig up more than a single root.",
            requirements: [
              'Farming level 68 and Woodcutting level 60',
              'Yew sapling, any axe, and a spade',
              '10 cactus spines recommended to pay the gardener',
            ],
          },
          {
            description:
              'Pray at the altar in Varrock palace with Smite active. Note: The altar is found on the  of the palace.',
            requirements: ['Prayer level 52'],
          },
          {
            description: 'Squeeze through the obstacle pipe in Edgeville dungeon.',
            requirements: ['Agility level 51'],
          },
        ],
      },
      {
        tier: 'elite',
        tasks: [
          {
            description: 'Create a super combat potion in Varrock west bank.',
            requirements: [
              'Quest Completion of Druidic Ritual',
              'Herblore level 90',
              'Super attack (4), super strength (4), super defence (4), and a torstol',
            ],
          },
          {
            description:
              'Use Lunar magic to make 20 mahogany planks at the Lumberyard. Note: You must stand within the Lumber Yard, past the fence.',
            requirements: [
              'Quest Completion of Dream Mentor',
              'Magic level 86',
              'Lunar spellbook selected',
              '21,000 coins and 20 mahogany logs',
              'Means to cast Plank Make twenty times ()',
            ],
          },
          {
            description:
              'Bake a summer pie in the Cooking Guild. Note: Instead of using a range, you can use the Bake Pie spell to prevent burning the pie.',
            requirements: [
              'Cooking level 95',
              'Raw summer pie',
              "Chef's hat, golden chef's hat, Varrock armour 3, or Cooking cape",
            ],
          },
          {
            description: 'Smith and fletch ten rune darts within Varrock.',
            requirements: [
              'Quest Completion of The Tourist Trap',
              'Smithing level 89 and Fletching level 81',
              'Runite bar, 10 feathers and a hammer',
            ],
          },
          {
            description:
              'Craft 100 or more earth runes simultaneously from Essence without the use of Extracts.',
            requirements: [
              'Runecraft level 78',
              'Runecraft level 52 with 2+ Raiments of the Eye (1 piece with Abyssal lantern lit with magic logs)',
              '28 pure, daeyalt, or rune essence (fewer may suffice with more Raiments of the Eye pieces)',
              'Access to the Earth Altar (earth talisman/tiara, elemental talisman/tiara, or the Abyss)',
            ],
          },
        ],
      },
    ],
    wikiUrl: 'https://oldschool.runescape.wiki/w/Varrock_Diary',
  },
  {
    pageId: 44487,
    title: 'Fremennik Diary',
    name: 'Fremennik',
    members: true,
    tiers: [
      {
        tier: 'easy',
        tasks: [
          {
            description:
              "Catch a Cerulean twitch. Note: These birds are found in the Rellekka Hunter area. While you're here, with a high enough Hunter level you can also complete a medium and a hard task by catching a Snowy knight and Sabre-toothed kyatt, respectively.",
            requirements: ['Hunter level 11', 'Bird snare'],
          },
          {
            description:
              "Change your boots at Yrsa's Shoe Store. Note: Her shoe store has been removed in an update. You'll now have to talk to her for a makeover for 500 coins. Alternatively, you can freely browse her regular clothing store for the task to count as completed.",
            requirements: ['Quest Completion of The Fremennik Trials', '500 coins (optional)'],
          },
          {
            description:
              'Kill 5 Rock crabs. Note: The giant rock crabs and rock lobsters on Waterbirth Island do not count.',
            requirements: ['Weaponry'],
          },
          {
            description:
              "Craft a tiara from scratch in Rellekka. Note: You have to mine silver ore from the Rellekka mine, then use it on the furnace in the city's westernmost building. Completing or updating any other task in-between these steps will reset the progress for this task.",
            requirements: [
              'Quest Completion of The Fremennik Trials',
              'Crafting level 23, Mining level 20 and Smithing level 20',
              'Any pickaxe (can be found north of the Rellekka mine) and a tiara mould',
            ],
          },
          {
            description:
              'Browse the Stonemasons shop. Note: He is located in western Keldagrim. Right-click him to trade.',
            requirements: [
              'Quest Started The Giant Dwarf',
              'Dramen or Lunar staff recommended to travel to Fairy ring code  for quick access to the city',
            ],
          },
          {
            description:
              'Collect 5 Snape grass on Waterbirth Island. Note: You can drop and pick up the same snape grass five times.',
            requirements: [
              'Waterbirth teleport tablet to directly access the island, or either 1000 coins or quest completion of The Fremennik Trials to travel via Jarvald',
            ],
          },
          {
            description:
              "Steal from the Keldagrim crafting or baker's stall. Note: These are located on the eastern side of the Keldagrim Palace.",
            requirements: ['Quest Started The Giant Dwarf', 'Thieving level 5'],
          },
          {
            description:
              "Fill a bucket with water at the Rellekka well. Note: There's a bucket of milk north of the well that can be emptied and filled with water.",
            requirements: ['Bucket'],
          },
          {
            description: 'Enter the Troll Stronghold.',
            requirements: [
              "Quest Partial completion of the Troll Stronghold, or completion of the Easy Combat Achievements for Ghommal's hilt 1",
            ],
          },
          {
            description:
              'Chop and burn some oak logs in the Fremennik Province. Note: Oak trees can be found near the Rellekka house portal.',
            requirements: [
              'Woodcutting level 15 and Firemaking level 15',
              'Any axe (can be found north of the Rellekka mine) and a tinderbox',
            ],
          },
        ],
      },
      {
        tier: 'medium',
        tasks: [
          {
            description: 'Slay a Brine rat.',
            requirements: [
              "Quest Partial completion of Olaf's Quest",
              'Slayer level 47',
              'Weaponry, and a spade to enter the Brine Rat Cavern',
            ],
          },
          {
            description:
              "Travel to the Snowy Hunter Area via Eagle. Note: You'll unlock travel from the Eagles' Peak Dungeon after the required quest.",
            requirements: ["Quest Completion of Eagles' Peak", 'Rope'],
          },
          {
            description: 'Mine some coal in Rellekka.',
            requirements: [
              'Quest Completion of The Fremennik Trials',
              'Mining level 30',
              'Any pickaxe (can be found north of the Rellekka mine)',
            ],
          },
          {
            description: 'Steal from the Rellekka Fish stalls.',
            requirements: ['Quest Completion of The Fremennik Trials', 'Thieving level 42'],
          },
          {
            description: 'Travel to Miscellania by Fairy ring.',
            requirements: [
              'Quest Completion of The Fremennik Trials and having started Fairytale II - Cure a Queen',
              'Dramen or Lunar staff to travel to Fairy ring code',
            ],
          },
          {
            description: 'Catch a Snowy knight.',
            requirements: ['Hunter level 45', 'Hunter level 35 with a butterfly net and jar'],
          },
          {
            description:
              'Pick up your Pet Rock from your POH Menagerie. Note: You need to use your pet rock on a pet house, then retrieve it off the ground. You cannot be in building mode.',
            requirements: [
              'Quest Partial completion of The Fremennik Trials',
              'Construction level 37',
              "30,000 coins, 4 oak planks, saw, and hammer to construct a menagerie with a pet house, if you haven't already",
              'Pet rock',
            ],
          },
          {
            description:
              'Visit the Lighthouse from Waterbirth island. Note: You must exit the Waterbirth Island Dungeon on the 5th sublevel.',
            requirements: [
              'Quest Completion of Horror from the Deep',
              'Food and Prayer level 43 for protection prayers recommended',
              'Way of getting past the two-man doors at the dungeon entrance (help from another player, pet rock and rune thrownaxes, or Agility level 85  for the rock shortcut)',
            ],
          },
          {
            description:
              'Mine some gold at the Arzinian mine. Note: This task is automatically completed during Between a Rock....',
            requirements: [
              'Quest Partial completion of Between a Rock...',
              'Mining level 40',
              'Defence level 30',
              'Any pickaxe and the gold helmet',
            ],
          },
        ],
      },
      {
        tier: 'hard',
        tasks: [
          {
            description: 'Teleport to Trollheim.',
            requirements: [
              "Quest Completion of Eadgar's Ruse",
              'Magic level 61',
              'Means to cast Trollheim Teleport ()',
            ],
          },
          {
            description: 'Catch a Sabre-toothed Kyatt.',
            requirements: ['Hunter level 55', 'Teasing stick, logs, and a knife'],
          },
          {
            description:
              'Mix a super defence potion in the Fremennik Province. Note: This has to be done in or near Rellekka.',
            requirements: ['Herblore level 66', 'Cadantine potion (unf) and white berries'],
          },
          {
            description: 'Steal from the Keldagrim Gem Stall.',
            requirements: ['Quest Started The Giant Dwarf', 'Thieving level 75'],
          },
          {
            description: 'Craft a Neitiznot shield on Neitiznot.',
            requirements: [
              'Quest Partial completion of The Fremennik Isles',
              'Woodcutting level 56',
              'Hammer, rope, a set of bronze nails, and 2 arctic pine logs.',
            ],
          },
          {
            description: 'Mine 5 Adamantite ores on Jatizso.',
            requirements: ['Quest Started The Fremennik Isles', 'Mining level 70', 'Any pickaxe'],
          },
          {
            description: 'Obtain 100% support from your kingdom subjects.',
            requirements: [
              'Quest Partial completion of Throne of Miscellania',
              'Rake, pickaxe, axe, harpoon and/or lobster pot, depending on how you plan to gain support',
            ],
          },
          {
            description: 'Teleport to Waterbirth Island.',
            requirements: [
              'Quest Completion of Lunar Diplomacy',
              'Magic level 72',
              'Lunar spellbook selected',
              'Means to cast Waterbirth Teleport ()',
            ],
          },
          {
            description:
              'Obtain the Blast Furnace Foremans permission to use the Blast Furnace for free.<br/> Note: With the requirements, talk to him and use the following dialogue options . Selecting the wrong choices may require you to pay him, in which case you can hop to another world to try again.',
            requirements: ['Quest Started The Giant Dwarf', 'Smithing level 60'],
          },
        ],
      },
      {
        tier: 'elite',
        tasks: [
          {
            description:
              'Kill each of the Dagannoth Kings. Note: Completing or updating any other task in-between these steps will reset the progress for this task.',
            requirements: [
              'Way of getting past the two-player doors at the dungeon entrance (help from another player, pet rock and rune thrownaxes, or Agility level 85  for the rock shortcut)',
              'See the strategy guide',
            ],
          },
          {
            description:
              'Craft 56 astral runes simultaneously from Essence without the use of Extracts.',
            requirements: [
              'Quest Completion of Lunar Diplomacy',
              'Runecraft level 82',
              '28 pure or daeyalt essence (this task is not bypass-able with Raiments of the Eye)',
            ],
          },
          {
            description:
              "Create a dragonstone amulet in the Neitiznot furnace. Note: Crafting a dragonstone amulet (u) is sufficient, you don't need a ball of wool for this task.",
            requirements: [
              'Quest Started The Fremennik Isles',
              'Crafting level 80',
              'Dragonstone, gold bar, and an amulet mould',
            ],
          },
          {
            description: 'Complete a lap of the Rellekka agility course.',
            requirements: ['Agility level 80'],
          },
          {
            description:
              "Kill the generals of Armadyl, Bandos, Saradomin and Zamorak in the God Wars Dungeon. Note: Having started the The Frozen Door miniquest is recommended to simultaneously unlock the key to Nex. You do not have to kill the generals' bodyguards for this task. Unlike most tasks that involve multiple steps, your progress towards this task will not reset when doing other tasks.",
            requirements: [
              "Quest Partial completion of the Troll Stronghold, or completion of the combatachievement Easy Combat Achievements for Ghommal's hilt 1",
              'Agility level 70, Strength level 70, Hitpoints level 70, and Ranged level 70 (only Hitpoints is boostable)',
              "See the boss overview (or see the individual strategy guides for Kree'arra, General Graardor, Commander Zilyana, and K'ril Tsutsaroth)",
            ],
          },
          {
            description: 'Slay a Spiritual mage within the Godwars Dungeon.',
            requirements: [
              "Quest Partial completion of the Troll Stronghold, or completion of the Easy Combat Achievements for Ghommal's hilt 1",
              'Slayer level 83',
              'Weaponry',
            ],
          },
        ],
      },
    ],
    wikiUrl: 'https://oldschool.runescape.wiki/w/Fremennik_Diary',
  },
  {
    pageId: 44523,
    title: 'Wilderness Diary',
    name: 'Wilderness',
    members: true,
    tiers: [
      {
        tier: 'easy',
        tasks: [
          {
            description: 'Cast Low Alchemy at the Fountain of Rune.',
            requirements: ['Magic level 21', 'Item that can be alchemised (nearly any item)'],
          },
          {
            description: 'Enter the Wilderness from the Ardougne or Edgeville lever.',
            requirements: [],
          },
          {
            description: 'Pray at the Chaos Altar in the Western Wilderness.',
            requirements: [],
          },
          {
            description:
              'Enter the Chaos Runecrafting temple. Note: Entering it through the Tunnel of Chaos or Guardians of the Rift will not count for this task.',
            requirements: [
              'Access to the Chaos Altar (chaos talisman/tiara, catalytic talisman/tiara, or the Abyss)',
            ],
          },
          {
            description:
              'Kill a Mammoth in the Wilderness. Note: Mammoths are found south-east of Ferox Enclave.',
            requirements: ['Weaponry'],
          },
          {
            description: 'Kill an Earth Warrior in the Wilderness beneath Edgeville.',
            requirements: ['Agility level 15', 'Weaponry'],
          },
          {
            description: 'Restore some prayer points at the demonic ruins.',
            requirements: [],
          },
          {
            description:
              "Enter the King Black Dragon's lair. Note: This lair is located beneath the Lava Maze.",
            requirements: [],
          },
          {
            description:
              "Collect 5 Red spiders' eggs from the Wilderness Note: These can be found in the northern part of the Edgeville Dungeon. You can also bring eggs into the wilderness, fulfilling the diary by dropping and picking them up five times.",
            requirements: [],
          },
          {
            description: 'Mine some Iron ore in the Wilderness.',
            requirements: ['Mining level 15', 'Any pickaxe'],
          },
          {
            description:
              'Have the Mage of Zamorak teleport you to the Abyss. Note: The one-time teleport to the Abyss from Varrock during Temple of the Eye does not count for this task.',
            requirements: ['Quest Completion of Enter the Abyss'],
          },
          {
            description:
              'Equip any team cape in the Wilderness. Note: Entering the Wilderness with one already equipped does not count for this task.',
            requirements: ['Any team cape'],
          },
        ],
      },
      {
        tier: 'medium',
        tasks: [
          {
            description: 'Mine some Mithril ore in the wilderness.',
            requirements: ['Mining level 55', 'Any pickaxe'],
          },
          {
            description:
              'Chop some yew logs from a fallen Ent. Note: This must be done within the Wilderness. You can find ents north and east of the chaos temple with the elder chaos druids.',
            requirements: ['Woodcutting level 61', 'Any axe and weaponry'],
          },
          {
            description:
              "Enter the Wilderness Godwars Dungeon. Note: While you're here, with a high enough Slayer level you can also complete another medium task and a hard task by killing a bloodveld and spiritual warrior, respectively.",
            requirements: [
              'Agility level 60 or Strength level 60',
              'God equipment recommended if going further inside',
            ],
          },
          {
            description: 'Complete a lap of the Wilderness Agility course.',
            requirements: ['Agility level 52'],
          },
          {
            description: 'Kill a Green Dragon. Note: This must be done within the Wilderness.',
            requirements: [
              'Protection from dragonfire recommended if not safe spotting and weaponry to slay it',
            ],
          },
          {
            description: 'Kill an Ankou in the Wilderness.',
            requirements: [
              'Weaponry, or sufficient combat stats to defeat a level 86 or level 98 Ankou while unarmed',
            ],
          },
          {
            description: 'Charge an Earth Orb.',
            requirements: ['Magic level 60', 'Unpowered orb and means to cast Charge Earth Orb ()'],
          },
          {
            description:
              'Kill a Bloodveld in the Wilderness Godwars Dungeon. Note: Can be safespotted in the south-west corner while having a Saradomin and Zamorak item equipped.',
            requirements: [
              'Agility level 60 or Strength level 60, and Slayer level 50',
              'Weaponry and god equipment',
            ],
          },
          {
            description:
              "Talk to the Emblem Trader in Edgeville about emblems. (He's just north of the bank)",
            requirements: [],
          },
          {
            description:
              'Smith a Golden helmet in the Resource Area. Note: You cannot do this while you already have a gold helmet in your inventory or bank, this must be dropped first. With 75 Smithing, you can bring 2 adamantite bars here as well to smith an adamant scimitar for a hard task.',
            requirements: [
              'Quest Partial completion of Between a Rock...',
              'Smithing level 50',
              '7500 coins, 3 gold bars, and a hammer',
            ],
          },
          {
            description:
              'Open the Muddy Chest in the lava maze. Note: With 53 Fishing, you can bring an oily fishing rod and fishing bait to catch a raw lava eel for a hard task.',
            requirements: [
              'Muddy key',
              'Knife, Wilderness sword 1, or a slashing weapon (Or with Agility level 82 using the Stepping Stone shortcut North of the Lava Maze)',
            ],
          },
        ],
      },
      {
        tier: 'hard',
        tasks: [
          {
            description:
              'Cast any of the 3 God spells against another player in the Wilderness. Note: You have to successfully hit the player, so multiple casts are recommended. God spells must first be cast 100 times inside the Mage Arena before they can be cast elsewhere, but this task is just as completable inside the arena.',
            requirements: [
              'Quest Completion of Mage Arena I',
              'Magic level 60',
              'Any god staff and means to cast its related god spell ( per cast)',
            ],
          },
          {
            description: 'Charge an Air Orb.',
            requirements: ['Magic level 66', 'Unpowered orb and means to cast Charge Air Orb ()'],
          },
          {
            description: 'Catch a Black Salamander in the Wilderness.',
            requirements: ['Hunter level 67', 'Small fishing net and a rope'],
          },
          {
            description:
              'Smith an Adamant scimitar in the Resource Area. Note: With 75 Woodcutting and 75 Firemaking, you can bring any axe and a tinderbox to cut and burn some magic logs for an elite task.',
            requirements: [
              'Smithing level 75',
              'Hammer and 2 adamantite bars',
              '6,000-7,500 coins',
            ],
          },
          {
            description: 'Kill a Lava Dragon. Note: Lava dragons are found on Lava Dragon Isle.',
            requirements: [
              'Protection from dragonfire recommended if not safe spotting and weaponry to slay it',
            ],
          },
          {
            description: 'Kill the Chaos Elemental.',
            requirements: ['See the strategy guide'],
          },
          {
            description:
              'Kill the Crazy Arc.<!--do not change is verbatim from in-game-->, Chaos Fanatic & Scorpia. Note: While these bosses can be killed in any order, completing or updating any other task in-between will reset the progress for this task.',
            requirements: [
              'See the individual strategy guides for the Crazy archaeologist, Chaos Fanatic, and Scorpia',
            ],
          },
          {
            description:
              'Take the agility shortcut from Trollheim into the Wilderness. Note: Not to be confused with the rocky shortcut further north. The shortcut for this task goes in one direction, and cannot be used to leave the Wilderness again.',
            requirements: [
              'Agility level 64',
              "Quest Partial completion of Troll Stronghold, or completion of the combatachievement Easy Combat Achievements for Ghommal's hilt 1",
            ],
          },
          {
            description:
              'Kill a Spiritual warrior in the Wilderness Godwars Dungeon. Note: With 83 Slayer, you can also kill a spiritual mage here to complete an elite task',
            requirements: [
              'Agility level 60 or Strength level 60, and Slayer level 68',
              'Weaponry and god equipment',
            ],
          },
          {
            description: 'Fish some Raw Lava Eel in the Wilderness.',
            requirements: [
              'Fishing level 53 and Herblore level 25',
              'Oily fishing rod, fishing bait',
              'Knife, Wilderness sword 1 or 2, or a slashing weapon',
            ],
          },
        ],
      },
      {
        tier: 'elite',
        tasks: [
          {
            description:
              "Kill Callisto, Venenatis & Vet'ion. Note: The lesser versions of these bosses (Artio, Spindel, and Calvar'ion) also count towards this task. You must have claimed the rewards from the hard diary tasks before you can access these lesser bosses. While these bosses can be killed in any order, completing or updating any other task in-between will reset the progress for this task.",
            requirements: [
              'Completion of the Medium Wilderness diary is required to kill the greater versions, and completion of the Hard Wilderness diary is required to kill the lesser versions',
              "See the individual strategy guides for Callisto, Venenatis, and Vet'ion, or those for the weaker bosses Artio, Spindel, and Calvar'ion",
            ],
          },
          {
            description: 'Teleport to Ghorrock.',
            requirements: [
              'Quest Completion of Desert Treasure I',
              'Magic level 96',
              'Ancient Magicks selected',
              'Means to cast Ghorrock Teleport ()',
            ],
          },
          {
            description: 'Fish and Cook a Dark Crab in the Resource Area.',
            requirements: [
              'Fishing level 85 and Cooking level 90',
              'Lobster pot and dark fishing bait',
              '3,750-7,500 coins',
            ],
          },
          {
            description:
              'Smith a rune scimitar from scratch in the Resource Area. Note: You must kill two separate Runite Golems and mine them each for runite ores, smelt two runite bars in the nearby furnace (Superheat Item does not work), then smith the rune scimitar on the anvil. The steps for mining the ores are still completed if the ores are destroyed by an infernal pickaxe. Completing or updating any other task in-between these steps will reset the progress for this task.',
            requirements: [
              'Mining level 85 and Smithing level 90',
              'Weaponry, any pickaxe, hammer, and 16 coal',
              '3,750-7,500 coins',
            ],
          },
          {
            description:
              "Steal from the Rogues' chest. Note: You must right-click the chest to search for traps. You'll then be attacked by all nearby rogues.",
            requirements: ['Thieving level 84'],
          },
          {
            description:
              'Slay a spiritual mage inside the wilderness Godwars Dungeon<!--Do not change, is verbatim from in-game.-->.',
            requirements: [
              'Agility level 60 or Strength level 60, and Slayer level 83',
              'Weaponry and god equipment',
            ],
          },
          {
            description:
              "Cut and burn some magic logs in the Resource Area. Note: Logs burnt by an infernal axe do not count towards this task. Logs may also be burnt on the Forester's Campfire. Completing or updating any other task in-between these steps will reset the progress for this task.",
            requirements: [
              'Woodcutting level 75 and Firemaking level 75',
              'Any axe and tinderbox',
              '3,750-7,500 coins',
            ],
          },
        ],
      },
    ],
    wikiUrl: 'https://oldschool.runescape.wiki/w/Wilderness_Diary',
  },
  {
    pageId: 44761,
    title: 'Morytania Diary',
    name: 'Morytania',
    members: true,
    tiers: [
      {
        tier: 'easy',
        tasks: [
          {
            description:
              'Craft any Snelm from scratch in Morytania. Note: Must be done outside of Mort Myre Swamp.',
            requirements: ['Crafting level 15', 'Chisel', 'Any blamish shell'],
          },
          {
            description: 'Cook a thin Snail on the Port Phasmatys range.',
            requirements: [
              'Cooking level 12',
              'Thin snail',
              '2 Ecto-tokens or quest completion of Ghosts Ahoy to walk into Port Phasmatys, or enough coins for a charter ship.',
            ],
          },
          {
            description: 'Get a slayer task from the Slayer Master in Canifis.',
            requirements: ['Combat level 20'],
          },
          {
            description: 'Kill a Banshee in the Slayer Tower.',
            requirements: ['Slayer level 15', 'Earmuffs or Slayer helmet recommended'],
          },
          {
            description: 'Have Sbott in Canifis tan something for you.',
            requirements: ['Any tannable hide and 2-45 coins depending on the type of hide'],
          },
          {
            description: 'Enter Mort Myre Swamp.',
            requirements: [],
          },
          {
            description: 'Kill a Ghoul.',
            requirements: ['Weaponry'],
          },
          {
            description: 'Place a Scarecrow in the Morytania flower patch.',
            requirements: [
              'Farming level 23 (Ironman accounts require Farming level 47 or the ability to kill gryphons)',
              'Bronze spear, watermelon, and a hay sack',
            ],
          },
          {
            description: 'Offer some bonemeal at the Ectofuntus.',
            requirements: ['Pot, bucket, and any bones'],
          },
          {
            description: 'Kill a werewolf in its human form using the Wolfbane Dagger.',
            requirements: ['Wolfbane'],
          },
          {
            description:
              'Restore your prayer points at the nature altar. Note: Requires you to have less than full Prayer points. If able, activate Piety while praying here to complete a hard task.',
            requirements: [
              'Quest Completion of Nature Spirit',
              'Dramen or Lunar staff recommended to travel to Fairy ring code',
            ],
          },
        ],
      },
      {
        tier: 'medium',
        tasks: [
          {
            description: 'Catch a swamp lizard.',
            requirements: ['Hunter level 29', 'Rope and small fishing net'],
          },
          {
            description: 'Complete a lap of the Canifis agility course.',
            requirements: ['Agility level 40'],
          },
          {
            description: 'Obtain some Bark from a Hollow tree.',
            requirements: ['Woodcutting level 45', 'Any axe'],
          },
          {
            description:
              'Travel to Dragontooth Isle. Note: This task is automatically completed during Ghost Ahoy.',
            requirements: [
              'Ghostspeak amulet and 25 ecto-tokens (or 10 with the Ring of Charos(a))',
            ],
          },
          {
            description: 'Kill a Terror Dog.',
            requirements: [
              'Quest Completion of Lair of Tarn Razorlor',
              'Slayer level 40',
              'Weaponry',
              "Slayer ring recommended for quick access to Tarn's Lair",
            ],
          },
          {
            description:
              'Complete a game of trouble brewing. Note: You only have to complete the minigame once, winning it is optional. In Deadman Mode, the task is instead "Speak to Honest Jimmy about Trouble Brewing."',
            requirements: [
              'Completion of Cabin Fever',
              'Cooking level 40',
              'Empty inventory and head slot',
              'At least one opposing player to start the game',
            ],
          },
          {
            description: 'Board the Swampy boat at the Hollows.',
            requirements: [
              'Quest Quest start of Nature Spirit',
              'Dramen or Lunar staff recommended to travel to Fairy ring code',
            ],
          },
          {
            description: 'Make a batch of cannonballs at the Port Phasmatys furnace.',
            requirements: [
              'Quest Completion of Dwarf Cannon',
              'Smithing level 35',
              'Steel bar and ammo mould (or 2 steel bars and double ammo mould)',
            ],
          },
          {
            description:
              'Kill a Fever Spider on Braindeath Island. Note: This task is automatically completed during Rum Deal.',
            requirements: [
              'Quest Started Rum Deal',
              'Slayer level 42',
              'Weaponry to fight at range, or means to negate disease (such as Slayer gloves), recommended',
            ],
          },
          {
            description: 'Use an ectophial to return to Port Phasmatys.',
            requirements: ['Quest Completion of Ghosts Ahoy', 'Ectophial'],
          },
          {
            description: 'Mix a Guthix Balance potion while in Morytania.',
            requirements: [
              'Quest Partial completion of In Aid of the Myreque',
              'Herblore level 22',
              'Restore potion, garlic, and silver dust (made by using a silver bar on the Ectofuntus bone grinder)',
            ],
          },
        ],
      },
      {
        tier: 'hard',
        tasks: [
          {
            description:
              'Enter the Kharyrll Portal in your POH. Note: Teleporting to Kharyrll from a more expensive portal nexus also counts for this task. Higher-tier materials can optionally be used for the portal and centrepiece.',
            requirements: [
              'Quest Completion of Desert Treasure I',
              'Magic level 66 and Construction level 50',
              "100,000 coins, 2 limestone bricks, 3 teak planks, hammer, and saw to construct a portal chamber with an activatable teak portal and teleport focus, if you haven't already",
              '200 law runes and 100 blood runes to direct a portal to Kharyrll, or 2000 law runes and 1000 blood runes if adding the portal to a portal nexus instead',
            ],
          },
          {
            description:
              'Climb up the advanced spike chain within Slayer Tower. Note: This chain is located on the  near the Infernal Mages, leading to the  to near the Nechryael.',
            requirements: [
              'Agility level 71',
              'Slayer helmet or nose peg recommended against the aberrant spectres, when climbing the spikey chain on the  as a shortcut to the advanced spikey chain',
              'Only a successful climb (not taking damage) will count as task completed.',
            ],
          },
          {
            description: 'Harvest some Watermelon from the Allotment patch on Harmony Island.',
            requirements: [
              'Quest Started The Great Brain Robbery',
              'Farming level 47',
              '3 watermelon seeds, spade, seed dibber (or Barbarian Farming), and a rake',
              'Ultracompost recommended',
            ],
          },
          {
            description: "Chop and burn some mahogany logs on Mos Le'Harmless.",
            requirements: [
              'Quest Completion of Cabin Fever',
              'Woodcutting level 50 and Firemaking level 50',
              'Any axe and a tinderbox',
              'Witchwood icon and a light source (if Fire of Eternal Light has not been built) recommended',
            ],
          },
          {
            description:
              'Complete a temple trek with a hard companion. Note: Completion of Darkness of Hallowvale unlocks the reverse route. It\'s not necessary to complete any events for this task. In Deadman Mode, the task is instead "Speak to a hard companion about completing a Temple Trek."',
            requirements: ['Quest Completion of In Aid of the Myreque', 'See the recommendations'],
          },
          {
            description: 'Kill a Cave Horror.',
            requirements: [
              'Quest Completion of Cabin Fever',
              'Slayer level 58',
              'Witchwood icon and a light source',
            ],
          },
          {
            description: 'Harvest some Bittercap Mushrooms from the patch in Canifis.',
            requirements: [
              'Farming level 53',
              'Mushroom spore, seed dibber (or Barbarian Farming), and a rake',
              'Ultracompost recommended',
            ],
          },
          {
            description: 'Pray at the Altar of Nature with Piety activated.',
            requirements: [
              "Quest Completion of Nature Spirit and the Knight Waves Training Grounds (which requires completion of King's Ransom)",
              'Prayer level 70 and Defence level 70 (neither boostable)',
              'Dramen or Lunar staff recommended to travel to Fairy ring code',
            ],
          },
          {
            description:
              'Use the shortcut to get to the bridge over the Salve. Note: You have to use the shortcut to go downwards for this task, not upwards.',
            requirements: ['Agility level 65'],
          },
          {
            description: 'Mine some Mithril ore in the Abandoned Mine.',
            requirements: [
              'Quest Completion of Haunted Mine',
              'Mining level 55',
              'Any pickaxe',
              'Crystal-mine key recommended (allows use of veins on Level 2, right next to the secret entrance)',
            ],
          },
        ],
      },
      {
        tier: 'elite',
        tasks: [
          {
            description: 'Catch a shark in Burgh de Rott with your bare hands.',
            requirements: [
              'Quest Completion of In Aid of the Myreque',
              'Access to Barbarian Fishing',
              'Fishing level 96 and Strength level 76 (both are boostable)',
              'Shark lure recommended',
              'If you are boosting with the Dragon harpoon special attack, you need to bank the harpoon before catching the shark. Having it in the inventory will use it by default and it will not count as bare handed.',
            ],
          },
          {
            description: 'Cremate any Shade remains on a Magic or Redwood pyre.',
            requirements: [
              "Quest Completion of Shades of Mort'ton",
              'Firemaking level 80',
              'Magic or Redwood pyre logs, any shade remains, and a tinderbox',
            ],
          },
          {
            description:
              'Fertilize the Morytania herb patch using Lunar Magic. Note: This herb patch is located west of Port Phasmatys.',
            requirements: [
              'Quest Completion of Lunar Diplomacy',
              'Magic level 83',
              'Lunar spellbook selected',
              'Means to cast Fertile Soil ()',
            ],
          },
          {
            description: 'Craft a Black dragonhide body in Canifis bank.',
            requirements: [
              'Crafting level 84',
              '3 black dragon leather, and a needle and thread or the costume needle',
            ],
          },
          {
            description:
              'Kill an Abyssal demon in the Slayer Tower. Note: Abyssal demons on the  do not require a Slayer task to kill like those in the basement.',
            requirements: ['Slayer level 85', 'Weaponry'],
          },
          {
            description:
              'Loot the Barrows chest while wearing any complete barrows set. Note: This includes the weapon that is part of the equipped set.',
            requirements: [
              'Defence level 70',
              'Various other skill requirements depending on the set used, none of which can be boosted:',
            ],
          },
        ],
      },
    ],
    wikiUrl: 'https://oldschool.runescape.wiki/w/Morytania_Diary',
  },
  {
    pageId: 45003,
    title: 'Desert Diary',
    name: 'Desert',
    members: true,
    tiers: [
      {
        tier: 'easy',
        tasks: [
          {
            description: 'Catch a Golden Warbler.',
            requirements: [
              'Hunter level 5',
              'Bird snare',
              "Necklace of passage recommended for quick access to Eagle's Eyrie, near the Uzer Hunter area",
            ],
          },
          {
            description: 'Mine 5 clay in the north-eastern desert.',
            requirements: [
              'Any pickaxe',
              "Necklace of passage recommended for quick access to Eagle's Eyrie, near the Uzer mine",
            ],
          },
          {
            description: 'Enter the Kalphite Hive.',
            requirements: ['Rope'],
          },
          {
            description:
              "Enter the Desert with a set of Desert robes equipped. Note: Not to be confused with the desert outfit, which doesn't count for this task. You also cannot use the black desert shirt or black desert robe.",
            requirements: ['Desert shirt, desert robe, and desert boots'],
          },
          {
            description: 'Kill a Vulture Note: These are found north of Menaphos or Sophanem.',
            requirements: ['Weaponry, preferably Ranged or Magic'],
          },
          {
            description:
              'Have the Nardah Herbalist clean a Herb for you. Note: You have to talk to Zahur to complete this task. Do not use the grimy herb on her to clean it.',
            requirements: ['Any grimy herb and 200 coins'],
          },
          {
            description:
              'Collect 5 Potato Cactus from the Kalphite Hive. Note: You can bring a single potato cactus to the lair, then drop and pick it up five times.',
            requirements: [
              'Rope',
              'Antipoison and food recommended if not bringing your own potato cactus',
            ],
          },
          {
            description:
              'Sell some artefacts to Simon Templeton. Note: The pyramid top from the nearby Agility Pyramid does not count.',
            requirements: [
              "Players must have started Icthlarin's Little Helper for access to Sophanem.",
              'Any artefact from Pyramid Plunder.',
            ],
          },
          {
            description: 'Open the Sarcophagus in the first room of Pyramid Plunder',
            requirements: ["Quest Started Icthlarin's Little Helper", 'Thieving level 21'],
          },
          {
            description: 'Cut a desert cactus open to fill a waterskin.',
            requirements: ['Knife or a slash weapon, and an empty waterskin'],
          },
          {
            description: 'Travel from the Shantay Pass to Pollnivneach by Magic Carpet.',
            requirements: ['200 coins and a Shantay Pass or another 5 coins.'],
          },
        ],
      },
      {
        tier: 'medium',
        tasks: [
          {
            description: 'Climb to the summit of the Agility Pyramid.',
            requirements: ['Agility level 30', 'Protection against desert heat recommended'],
          },
          {
            description: 'Slay a desert lizard.',
            requirements: ['Slayer level 22', 'Ice cooler'],
          },
          {
            description: 'Catch an Orange Salamander.',
            requirements: ['Hunter level 47', 'Rope and a small fishing net'],
          },
          {
            description: 'Steal a feather from the Desert Phoenix.',
            requirements: ['Thieving level 25'],
          },
          {
            description: 'Travel to Uzer via Magic Carpet.',
            requirements: [
              'Quest Completion of The Golem',
              '200 coins (or 205 coins if using the Shantay Pass)',
            ],
          },
          {
            description:
              "Travel to the Desert via Eagle. Note: You'll unlock travel from the Eagles' Peak Dungeon after the required quest.",
            requirements: ["Quest Completion of Eagles' Peak", 'Rope'],
          },
          {
            description:
              'Pray at the Elidinis statuette in Nardah Note: Requires you to have less than full Prayer points.',
            requirements: ['Quest Completion of Spirits of the Elid'],
          },
          {
            description: 'Create a combat potion in the desert.',
            requirements: ['Herblore level 36', 'Harralander potion (unf) and goat horn dust'],
          },
          {
            description: "Teleport to Enakhra's Temple with the Camulet.",
            requirements: ["Quest Completion of Enakhra's Lament", 'Camulet'],
          },
          {
            description:
              'Visit the Genie. Note: This task is automatically completed during Spirits of the Elid.',
            requirements: ['Quest Started Spirits of the Elid', 'Rope and light source'],
          },
          {
            description:
              'Teleport to Pollnivneach with a redirected teleport to house tablet. Note: Ironmen must instead enter their house via the Pollnivneach house portal.',
            requirements: ['Construction level 20', 'Scroll of redirection and a house tablet'],
          },
          {
            description:
              'Chop some Teak Logs near Uzer. Note: Teak trees are found north-east of the oasis.',
            requirements: ['Woodcutting level 35', 'Any axe'],
          },
        ],
      },
      {
        tier: 'hard',
        tasks: [
          {
            description: 'Knock out and pickpocket a Menaphite Thug.',
            requirements: [
              'Quest Partial completion of The Feud',
              'Thieving level 65',
              'Any blackjack',
            ],
          },
          {
            description:
              'Mine some Granite.<ref group="d">Mining granite at the Cape Conch mine in The Great Conch will also complete this task.</ref>',
            requirements: ['Mining level 45', 'Any pickaxe'],
          },
          {
            description:
              'Refill your waterskins in the Desert using Lunar magic. Note: The spell must be cast outside of a desert settlement.',
            requirements: [
              'Quest Completion of Dream Mentor',
              'Magic level 68',
              'Lunar spellbook selected',
              "Waterskin that isn't full and means to cast Humidify ()",
            ],
          },
          {
            description: 'Kill the Kalphite Queen.',
            requirements: ['See the strategy guide'],
          },
          {
            description: 'Complete a lap of the Pollnivneach agility course.',
            requirements: ['Agility level 70'],
          },
          {
            description: 'Slay a Dust Devil in the desert cave with a Slayer helmet equipped.',
            requirements: [
              'Quest Started Desert Treasure I',
              'Slayer level 65  and Defence level 10',
              'Slayer helmet (requires Crafting level 55 ) (and Quest completion of Cabin Fever for Ironman accounts)',
            ],
          },
          {
            description: 'Activate Ancient Magicks at the altar in the Jaldraocht Pyramid.',
            requirements: ['Quest Completion of Desert Treasure I'],
          },
          {
            description:
              'Defeat a Locust Rider with Keris. Note: This weapon only has to be equipped as it dies, allowing you to deal damage with other weapons. Keris partisan and its variants also work for completing this task.',
            requirements: [
              'Quest Partial completion of Contact!',
              'Attack level 50',
              'Keris or Keris partisan, and any light source',
            ],
          },
          {
            description:
              "Burn some yew logs on the Nardah Mayor's balcony. Note: He lives directly east of the central fountain.",
            requirements: ['Firemaking level 60', 'Yew log and a tinderbox'],
          },
          {
            description:
              'Create a Mithril Platebody in Nardah. Note: The anvil is found in the westernmost building.',
            requirements: ['Smithing level 68', '5 mithril bars and a hammer'],
          },
        ],
      },
      {
        tier: 'elite',
        tasks: [
          {
            description: 'Bake a wild pie at the Nardah Clay Oven.',
            requirements: ['Cooking level 85', 'Raw wild pie'],
          },
          {
            description:
              'Cast Ice Barrage against a foe in the Desert Note: The spell must be cast outside of a desert settlement, and must successfully hit.',
            requirements: [
              'Quest Completion of Desert Treasure I',
              'Magic level 94',
              'Means to cast Ice Barrage ()',
            ],
          },
          {
            description: 'Fletch some Dragon darts at the Bedabin Camp.',
            requirements: ['Fletching level 95', 'Dragon dart tip and feather'],
          },
          {
            description:
              'Speak to the KQ head in your POH. Note: The Kalphite Queen has a 1/128 chance of dropping her head on death, and is guaranteed to drop a tattered head on the 256th kill, both of which can be used to create the KQ head.',
            requirements: [
              'Quest Completion of Priest in Peril',
              'Construction level 78',
              '2 mahogany planks, 2 gold leaves, saw, and hammer',
              'Kq head or Kq head (tattered), and 50,000 coins to have the taxidermist stuff it',
              "Additional 15,000 coins to construct a Skill Hall if you haven't already",
            ],
          },
          {
            description: 'Steal from the Grand Gold Chest in the final room of Pyramid Plunder.',
            requirements: ["Quest Started Icthlarin's Little Helper", 'Thieving level 91'],
          },
          {
            description: 'Restore at least 85 Prayer points when praying at the Altar in Sophanem.',
            requirements: ["Quest Started Icthlarin's Little Helper", 'Prayer level 85'],
          },
        ],
      },
    ],
    wikiUrl: 'https://oldschool.runescape.wiki/w/Desert_Diary',
  },
  {
    pageId: 45004,
    title: 'Western Provinces Diary',
    name: 'Western Provinces',
    members: true,
    tiers: [
      {
        tier: 'easy',
        tasks: [
          {
            description: 'Catch a Copper Longtail.',
            requirements: ['Hunter level 9', 'Bird snare'],
          },
          {
            description:
              'Complete a novice game of Pest Control. Note: You must\'ve earnt commendation points for this task to count as completed. In Deadman Mode, the task is instead "Attempt to board the novice Pest Control lander with at least 40 combat."',
            requirements: ['Combat level 40'],
          },
          {
            description:
              'Mine some Iron Ore near Piscatoris. Note: This must be done at the Piscatoris mine.',
            requirements: ['Mining level 15', 'Any pickaxe'],
          },
          {
            description: 'Complete a lap of the Gnome agility course.',
            requirements: [],
          },
          {
            description: 'Score a goal in a Gnomeball match.',
            requirements: [],
          },
          {
            description:
              'Claim any Chompy bird hat from Rantz. Note: You need to have a (comp) ogre bow in your inventory to claim hats.',
            requirements: [
              'Quest Completion of Big Chompy Bird Hunting',
              'Ogre bellows, (comp) ogre bow, and ogre or brutal arrows',
              '30 chompy or jubbly bird kills',
            ],
          },
          {
            description:
              'Teleport to Pest Control using the Minigame Teleport. Note: In Deadman Mode, the task is instead "Travel to the Void Knight Outpost from Port Sarim."',
            requirements: ['Combat level 40'],
          },
          {
            description:
              'Collect a swamp toad at the Gnome Stronghold. Note: Only a swamp toad collected from the swamp pen north-west of Grand Tree counts for this task.',
            requirements: [],
          },
          {
            description:
              'Have Brimstail teleport you to the Essence Mine. Note: You can right-click him to teleport.',
            requirements: ['Quest Completion of Rune Mysteries'],
          },
          {
            description: 'Fletch an Oak Shortbow in the Gnome Stronghold.',
            requirements: ['Fletching level 20', 'Oak shortbow (u) and bow string'],
          },
          {
            description:
              'Kill a Terrorbird in the Terrorbird enclosure. Note: This enclosure is found in the south-west of the Tree Gnome Stronghold, across the river.',
            requirements: ['Weaponry'],
          },
        ],
      },
      {
        tier: 'medium',
        tasks: [
          {
            description: "Take the agility shortcut from the Grand Tree to Otto's Grotto.",
            requirements: [
              'Quest Completion of Tree Gnome Village and The Grand Tree',
              'Agility level 37',
            ],
          },
          {
            description: 'Travel to the Gnome Stronghold by Spirit Tree.',
            requirements: ['Quest Completion of Tree Gnome Village'],
          },
          {
            description:
              'Trap a Spined Larupia. Note: This creature is found in the Feldip Hunter area.',
            requirements: ['Hunter level 31', 'Teasing stick, logs, and a knife'],
          },
          {
            description: 'Fish some Bass on Ape Atoll.',
            requirements: [
              'Quest Partial completion of Monkey Madness I',
              'Fishing level 46',
              'Big fishing net',
            ],
          },
          {
            description:
              'Chop and burn some teak logs on Ape Atoll. Note: With 50 Woodcutting and 50 Firemaking, you can also chop and burn some mahogany logs here for a hard task. Completing or updating any other task in-between these steps will reset the progress for this task.',
            requirements: [
              'Quest Partial completion of Monkey Madness I',
              'Woodcutting level 35 and Firemaking level 35',
              'Any axe and tinderbox',
            ],
          },
          {
            description:
              'Complete an intermediate game of Pest Control. Note: You must\'ve earnt commendation points for this task to count as completed. In Deadman Mode, the task is instead "Attempt to board the intermediate Pest Control lander with at least 70 combat."',
            requirements: ['Combat level 70'],
          },
          {
            description: 'Travel to the Feldip Hills by Gnome Glider.',
            requirements: [
              'Quest Completion of The Grand Tree and partial completion of One Small Favour',
            ],
          },
          {
            description:
              'Claim a Chompy bird hat from Rantz after registering at least 125 kills. Note: You need to have a (comp) ogre bow in your inventory to claim hats.',
            requirements: [
              'Quest Completion of Big Chompy Bird Hunting',
              'Ogre bellows, (comp) ogre bow, and ogre or brutal arrows',
              '125 chompy or jubbly bird kills',
            ],
          },
          {
            description:
              "Travel from Eagles' Peak to the Feldip Hills by Eagle. Note: You'll unlock travel from the Eagles' Peak Dungeon after the required quest.",
            requirements: ["Quest Completion of Eagles' Peak", 'Rope'],
          },
          {
            description: 'Make a Chocolate Bomb at the Grand Tree.',
            requirements: [
              'Cooking level 42',
              'Gnomebowl mould, Gianne dough, 4 chocolate bars, an equa leaf, 2 pots of cream, and chocolate dust (can all be purchased at Grand Tree Groceries)',
            ],
          },
          {
            description: 'Complete a delivery for the Gnome Restaurant.',
            requirements: [
              'Completion of the Gnome Restaurant tutorial',
              'Cooking (varies per food)',
            ],
          },
          {
            description:
              "Turn your small crystal seed into a Crystal saw. Note: You have to enchant it with the singing bowl in Brimstail's cave.",
            requirements: ['Quest Completion of The Eyes of Glouphrie', 'Crystal saw seed'],
          },
          {
            description: 'Mine some Gold ore underneath the Grand Tree.',
            requirements: ['Quest Completion of The Grand Tree', 'Mining level 40', 'Any pickaxe'],
          },
        ],
      },
      {
        tier: 'hard',
        tasks: [
          {
            description:
              'Kill an Elf with a Crystal bow. Note: an inactive bow can be used if equipped whilst the elf dies to poison.',
            requirements: [
              'Quest Completion of Roving Elves',
              'Ranged level 70',
              'Crystal bow or Bow of Faerdhinen',
            ],
          },
          {
            description:
              'Catch and cook a Monkfish in Piscatoris. Note: Monkfish is caught in the Piscatoris Fishing Colony.',
            requirements: [
              'Quest Completion of Swan Song',
              'Fishing level 62 and Cooking level 62',
              'Small fishing net',
            ],
          },
          {
            description:
              'Complete a Veteran game of Pest Control. Note: You must\'ve earnt commendation points for this task to count as completed. In Deadman Mode, the task is instead "Attempt to board the veteran Pest Control lander with at least 100 combat."',
            requirements: ['Combat level 100'],
          },
          {
            description:
              'Catch a Dashing Kebbit. Note: This kebbit is found in the Piscatoris falconry area.',
            requirements: ['Hunter level 69', '500 coins'],
          },
          {
            description: 'Complete a lap of the Ape Atoll agility course.',
            requirements: [
              'Quest Partial completion of Monkey Madness I',
              'Agility level 48',
              'Ninja monkey greegree or Kruk monkey greegree (other greegrees will cause you to fail the course)',
            ],
          },
          {
            description:
              'Chop and burn some Mahogany logs on Ape Atoll. Note: Logs burnt by the Infernal axe do not count towards this task.',
            requirements: [
              'Quest Partial completion of Monkey Madness I',
              'Woodcutting level 50 and Firemaking level 50',
              'Any axe (excluding felling axes) and a tinderbox',
            ],
          },
          {
            description:
              'Mine some Adamantite ore in Tirannwn. Note: This can be done in the Isafdar mine outside of Lletya, or the Trahaearn mine in Prifddinas (with completion of Song of the Elves).',
            requirements: ['Quest Started Regicide', 'Mining level 70', 'Any pickaxe'],
          },
          {
            description: 'Check the health of your Palm tree in Lletya.',
            requirements: [
              "Quest Started Mourning's End Part I",
              'Farming level 68',
              'Palm sapling, rake, and spade',
              '15 papayas recommended to pay the gardener',
            ],
          },
          {
            description:
              'Claim a Chompy bird hat from Rantz after registering at least 300 kills. Note: You need to have a (comp) ogre bow in your inventory to claim hats.',
            requirements: [
              'Quest Completion of Big Chompy Bird Hunting',
              'Ogre bellows, (comp) ogre bow, and ogre or brutal arrows',
              '300 chompy or jubbly bird kills',
            ],
          },
          {
            description: 'Build an Isafdar painting in your POH Quest hall.',
            requirements: [
              'Quest Completion of Roving Elves',
              'Construction level 65',
              '3 mahogany planks, saw, and hammer',
              'Isafdar painting (bought from Sir Renitee for 2,000 coins)',
              "25,000 coins to construct a Quest Hall if you haven't already",
            ],
          },
          {
            description:
              'Kill Zulrah. Note: In Deadman Mode, the task is listed as "Attempt to visit Zulrah.", but doing so will not complete the task, and you must kill Zulrah like normal to complete it.',
            requirements: ['Quest Started Regicide', 'See the strategy guide'],
          },
          {
            description: 'Teleport to Ape Atoll.',
            requirements: [
              'Quest Completion of the Awowogei subquest of Recipe for Disaster',
              'Magic level 64',
              'Means to cast Ape Atoll Teleport ()',
            ],
          },
          {
            description: 'Pickpocket a Gnome.',
            requirements: ['Thieving level 75'],
          },
        ],
      },
      {
        tier: 'elite',
        tasks: [
          {
            description: 'Fletch a Magic Longbow in Tirannwn.',
            requirements: [
              'Quest Started Regicide',
              'Fletching level 85',
              'Magic longbow (u) and a bow string',
            ],
          },
          {
            description:
              'Kill the Thermonuclear Smoke Devil. Note: While this boss normally requires a Slayer task, this is not needed for the first kill. You do not have to contact a Slayer master for this task. You must be in the room when its death animation ends, or the task will not be completed. Be mindful of this if you are attempting the Combat Achievements. If this occurs, you will still be able to kill it again without a slayer task.',
            requirements: ['Slayer level 93', 'See the strategy guide'],
          },
          {
            description: 'Have Prissy Scilla protect your Magic tree.',
            requirements: ['Farming level 75', 'Magic sapling, 25 coconuts, rake, and a spade'],
          },
          {
            description: 'Use the Elven overpass advanced cliffside shortcut.',
            requirements: ['Quest Completion of Underground Pass', 'Agility level 85'],
          },
          {
            description:
              'Equip any complete void set. Note: In Deadman Mode, the task is instead "Speak to the Elite Void Knight after claiming the Western hard diary reward."',
            requirements: [
              'Combat level 40, Prayer level 22, Attack level 42, Strength level 42, Defence level 42, Hitpoints level 42, Ranged level 42, and Magic level 42',
              'Any void helm (melee, ranger, or mage helm)',
              'Void knight top, robe, and gloves',
            ],
          },
          {
            description:
              'Claim a Chompy bird hat from Rantz after registering at least 1,000 kills. Note: You need to have a (comp) ogre bow in your inventory to claim hats.',
            requirements: [
              'Quest Completion of Big Chompy Bird Hunting',
              'Ogre bellows, (comp) ogre bow, and ogre or brutal arrows',
              '1,000 chompy or jubbly bird kills',
            ],
          },
          {
            description: 'Pickpocket an Elf.',
            requirements: ["Quest Started Mourning's End Part I", 'Thieving level 85'],
          },
        ],
      },
    ],
    wikiUrl: 'https://oldschool.runescape.wiki/w/Western_Provinces_Diary',
  },
  {
    pageId: 45006,
    title: 'Falador Diary',
    name: 'Falador',
    members: true,
    tiers: [
      {
        tier: 'easy',
        tasks: [
          {
            description:
              'Find out what your family crest is from Sir Renitee Note: You must finish the dialogue.',
            requirements: ['Construction level 16'],
          },
          {
            description: 'Climb over the western Falador wall.',
            requirements: ['Agility level 5'],
          },
          {
            description: "Browse Sarah's farm shop.",
            requirements: [],
          },
          {
            description: 'Get a Haircut or a Shave from the Falador Hairdresser.',
            requirements: [],
          },
          {
            description: 'Fill a bucket from the pump north of Falador west bank.',
            requirements: ['Bucket'],
          },
          {
            description: 'Kill a duck in Falador Park.',
            requirements: ['None, though using Magic or a Ranged weapon is recommended'],
          },
          {
            description: 'Make a mind tiara.',
            requirements: ['Tiara and a mind talisman'],
          },
          {
            description: 'Take the boat to Entrana.',
            requirements: ['Have no weapons or armour equipped or in your inventory'],
          },
          {
            description: 'Repair a broken strut in the Motherlode Mine.',
            requirements: ['Hammer and any pickaxe'],
          },
          {
            description:
              'Claim a security book from the Security guard at Port Sarim jail. Note: The guard is found upstairs. Ask him about security and finish the dialogue.',
            requirements: [],
          },
          {
            description: "Smith some Blurite Limbs on Doric's anvil.",
            requirements: [
              "Quest Completion of The Knight's Sword and Doric's Quest",
              'Mining level 10 and Smithing level 13',
              'Hammer and a Blurite bar',
            ],
          },
        ],
      },
      {
        tier: 'medium',
        tasks: [
          {
            description: "Light a Bullseye lantern at the Chemist's in Rimmington.",
            requirements: ['Firemaking level 49', 'Tinderbox and a regular bullseye lantern'],
          },
          {
            description:
              'Telegrab some Wine of Zamorak at the Chaos Temple by the Wilderness. Note: This altar is located north-west of the Goblin Village. You have to be inside the building until the jug appears in your inventory for the task to register as completed.',
            requirements: ['Magic level 33', 'Means to cast Telegrab ()'],
          },
          {
            description: 'Unlock the Crystal chest in Taverley.',
            requirements: ['Crystal key'],
          },
          {
            description: 'Place a Scarecrow in the Falador farm flower patch.',
            requirements: [
              'Farming level 23 (Ironman accounts require Farming level 47 or the ability to kill gryphons)',
              'Bronze spear, watermelon, and a hay sack (you can fill an empty sack with hay at the hay bale in the chicken coop nearby.)',
            ],
          },
          {
            description: 'Kill a Mogre at Mudskipper Point.',
            requirements: [
              'Quest Completion of Skippy and the Mogres',
              'Slayer level 32',
              'Fishing explosive.',
              'It is not possible to skip having to complete Skippy and the Mogres, or needing a fishing explosive, by killing them through a boat cannon through the Sailing skill.',
            ],
          },
          {
            description: 'Visit the Port Sarim Rat Pits.',
            requirements: ['Quest Partial completion of Ratcatchers'],
          },
          {
            description: 'Grapple up and then jump off the north Falador wall.',
            requirements: [
              'Agility level 11, Strength level 37, and Ranged level 19',
              'Mith grapple and any crossbow',
            ],
          },
          {
            description: 'Pickpocket a Falador guard.',
            requirements: ['Thieving level 40'],
          },
          {
            description: 'Pray at the Altar of Guthix in Taverley whilst wearing full Initiate.',
            requirements: [
              'Quest Completion of Recruitment Drive',
              'Prayer level 10 and Defence level 20',
              'Initiate armour',
            ],
          },
          {
            description: 'Mine some Gold ore at the Crafting Guild.',
            requirements: [
              'Crafting level 40 and Mining level 40',
              'Any pickaxe and a brown apron, golden apron, or Crafting cape',
            ],
          },
          {
            description: 'Squeeze through the crevice in the Dwarven mines.',
            requirements: ['Agility level 42'],
          },
          {
            description:
              'Chop and burn some Willow logs in Taverley. Note: Willow trees can be found to the south-east along the lake. Player-grown willow trees do not count towards completing the task.',
            requirements: [
              'Woodcutting level 30 and Firemaking level 30',
              'Any axe and a tinderbox',
            ],
          },
          {
            description: 'Craft a fruit basket on the Falador Farm loom.',
            requirements: [
              'Crafting level 36 (and Farming level 30 for Ironman accounts)',
              '6 Willow branches',
            ],
          },
          {
            description: 'Teleport to Falador.',
            requirements: ['Magic level 37', 'Means to cast Falador Teleport ()'],
          },
        ],
      },
      {
        tier: 'hard',
        tasks: [
          {
            description:
              'Craft 140 Mind runes simultaneously from Essence without the use of Extracts. Note: Mind cores do not count.',
            requirements: [
              'Runecraft level 56',
              'Runecraft level 42 with 3+ Raiments of the Eye pieces',
              '28 pure, daeyalt, or rune essence (less may suffice at higher Runecraft levels)',
              'Access to the Mind Altar (mind talisman/tiara, catalytic talisman/tiara, or the Abyss)',
            ],
          },
          {
            description:
              'Change your family crest to the Saradomin symbol. Note: This is done by talking to Sir Renitee.',
            requirements: [
              'Prayer level 70',
              'Construction level 16',
              '5,000 coins (an additional 5,000 coins if your randomised family crest already is Saradomin, to change to another and back)',
            ],
          },
          {
            description: 'Kill the Giant Mole beneath Falador Park.',
            requirements: ['Spade and light source', 'See the strategy guide'],
          },
          {
            description: 'Kill a Skeletal Wyvern in the Asgarnia Ice Dungeon.',
            requirements: [
              'Slayer level 72',
              "Protection from the wyvern's icy breath and weaponry to slay it",
            ],
          },
          {
            description: 'Complete a lap of the Falador rooftop agility course.',
            requirements: ['Agility level 50'],
          },
          {
            description:
              'Enter the mining guild while wearing a Prospector helmet. Note: This helmet can be obtained from the Motherlode Mine or the Volcanic Mine.',
            requirements: ['Mining level 60', 'Prospector helmet or golden prospector helmet'],
          },
          {
            description: "Kill the Blue Dragon under the Heroes' Guild.",
            requirements: [
              "Quest Completion of the Heroes' Quest",
              'Protection from dragonfire and weaponry to slay it',
            ],
          },
          {
            description:
              "Crack a wall safe within Rogues' Den. Note: Wall safes in the maze do not count towards completing this task.",
            requirements: ['Thieving level 50'],
          },
          {
            description:
              'Recharge your prayer in the Port Sarim church while wearing full Proselyte.',
            requirements: [
              'Quest Completion of The Slug Menace',
              'Defence level 30',
              'Prayer level 20',
              'Full Proselyte armour',
            ],
          },
          {
            description: "Enter the Warriors' Guild.",
            requirements: ['130 combined levels in Attack and Strength, or level 99 in either'],
          },
          {
            description: 'Equip a dwarven helmet within the dwarven mines.',
            requirements: ['Quest Completion of Grim Tales', 'Defence level 50', 'Dwarven helmet'],
          },
        ],
      },
      {
        tier: 'elite',
        tasks: [
          {
            description:
              'Craft 252 Air Runes simultaneously from Essence without the use of Extracts.',
            requirements: [
              'Runecraft level 88',
              'Runecraft level 77 with 2 Raiments of the Eye pieces or 1 Raiments of the Eye piece and abyssal lantern (with willow or redwood logs)',
              'Runecraft level 66 with 3 Raiments of the Eye pieces',
              'Runecraft level 55 with 4 Raiments of the Eye pieces',
              '28 pure, daeyalt, or rune essence (less may suffice at higher Runecraft levels)',
              'Access to the Air Altar (air talisman/tiara, elemental talisman/tiara, or the Abyss)',
            ],
          },
          {
            description:
              'Purchase a White 2h Sword from Sir Vyvin. Note: Selling this sword to him and then buying it back without having the proper rank does not count for this achievement.',
            requirements: [
              'Quest Completion of Wanted!',
              '1,920 coins',
              'Rank of White Knight Master (requires a Black Knight kill score of 1300 - this rank automatically starts at White Knight Novice, with a kill score of 100)',
            ],
          },
          {
            description:
              'Find at least 3 magic roots at once when digging up your magic tree in Falador. Note: You need to cut the tree down yourself.',
            requirements: [
              'Farming level 91 and Woodcutting level 75',
              'Magic sapling, spade and any axe',
            ],
          },
          {
            description: 'Perform a skillcape or quest cape emote at the top of Falador Castle.',
            requirements: [
              'Completion of all quests or level 99 in any skill',
              'Any Cape of Accomplishment (except for joke skillcapes or the Max cape)',
            ],
          },
          {
            description:
              'Jump over the strange floor in Taverley dungeon. Note: Might take several tries. You must take no damage from the jump.',
            requirements: ['Agility level 80'],
          },
          {
            description: 'Mix a Saradomin brew in Falador east bank.',
            requirements: ['Herblore level 81', 'Toadflax potion (unf), crushed nest'],
          },
        ],
      },
    ],
    wikiUrl: 'https://oldschool.runescape.wiki/w/Falador_Diary',
  },
  {
    pageId: 45007,
    title: 'Kandarin Diary',
    name: 'Kandarin',
    members: true,
    tiers: [
      {
        tier: 'easy',
        tasks: [
          {
            description: 'Catch a Mackerel at Catherby.',
            requirements: ['Fishing level 16', 'Big fishing net'],
          },
          {
            description: 'Buy a candle from the Chandler in Catherby.',
            requirements: ['3 coins'],
          },
          {
            description: "Collect five Flax from the Seers' flax fields.",
            requirements: [],
          },
          {
            description: "Play the Organ in Seers' church.",
            requirements: [],
          },
          {
            description:
              "Plant some Jute seeds in the patch north of McGrubor's Wood. Note: This is the farming patch next to Rhonen.",
            requirements: ['Farming level 13', '3 jute seeds, rake, and a seed dibber'],
          },
          {
            description: 'Have Galahad make you a cup of tea.',
            requirements: [],
          },
          {
            description:
              'Defeat one of each elemental in the workshop. Note: These are the earth, water, air, and fire elemental found on the  of the workshop. Only the roaming earth elementals count.',
            requirements: ['Quest Started Elemental Workshop I', 'Battered key and weaponry'],
          },
          {
            description:
              'Get a pet fish from Harry in Catherby. Note: You have to talk to Harry with all required items in your inventory.',
            requirements: ['Fishbowl with water, seaweed, and 10 coins'],
          },
          {
            description: "Buy a Stew from the Seers' pub.",
            requirements: ['20 coins'],
          },
          {
            description: 'Speak to Sherlock.',
            requirements: [],
          },
          {
            description:
              'Cross the Coal truck log shortcut. Note: You can take a pickaxe to mine coal here to complete a medium task.',
            requirements: ['Agility level 20'],
          },
        ],
      },
      {
        tier: 'medium',
        tasks: [
          {
            description: 'Complete a lap of the Barbarian agility course.',
            requirements: ["Quest Completion of Alfred Grimhand's Barcrawl", 'Agility level 35'],
          },
          {
            description:
              'Create a Super Antipoison potion from scratch in the Seers/Catherby Area. Note: Completing or updating any other task in-between adding ingredients will reset the progress for this task.',
            requirements: ['Herblore level 48', 'Vial of water, irit leaf, unicorn horn dust'],
          },
          {
            description: 'Enter the Ranging guild.',
            requirements: ['Ranged level 40'],
          },
          {
            description:
              'Use the grapple shortcut to get from the water obelisk to Catherby shore. Note: With 56 Magic, you can bring an unpowered orb and runes for Charge Water Orb to complete a hard task.',
            requirements: [
              'Agility level 36, Strength level 22, and Ranged level 39',
              'Mith grapple and any crossbow',
              'Dusty key or Agility level 70',
              'Protection from dragonfire recommended',
            ],
          },
          {
            description:
              'Catch and cook a Bass in Catherby. Note: Completing or updating any other task in-between these steps will reset the progress for this task.',
            requirements: ['Fishing level 46 and Cooking level 43', 'Big fishing net'],
          },
          {
            description: 'Teleport to Camelot.',
            requirements: ['Magic level 45', 'Means to cast Camelot Teleport ()'],
          },
          {
            description: "String a Maple shortbow in Seers' Village bank.",
            requirements: ['Fletching level 50', 'Maple shortbow (u) and bow string'],
          },
          {
            description:
              'Pick some Limpwurt root from the farming patch in Catherby. Note: This is the flower patch next to Dantaera.',
            requirements: [
              'Farming level 26',
              'Limpwurt seed, seed dibber (or Barbarian Farming), and a rake',
              'Ultracompost recommended',
            ],
          },
          {
            description:
              'Create a Mind helmet. Note: This task is automatically completed during Elemental Workshop II.',
            requirements: ['Quest Partial completion of Elemental Workshop II'],
          },
          {
            description: 'Kill a Fire Giant inside Baxtorian Waterfall.',
            requirements: [
              'Quest Started Waterfall Quest',
              'Weaponry',
              'Rope',
              "Glarial's amulet only if Waterfall Quest isn't yet completed",
            ],
          },
          {
            description: 'Complete a wave of Barbarian Assault.',
            requirements: [
              'Completion of the Barbarian Assault tutorial to be able to play the minigame',
            ],
          },
          {
            description:
              'Steal from the chest in Hemenster. Note: This chest is located in the building between the buildings with the range and anvil.',
            requirements: [
              'Thieving level 47',
              'Lockpick',
              'Combat bracelet recommended for quick access from the nearby Ranging Guild',
            ],
          },
          {
            description: "Travel to McGrubor's Wood by Fairy Ring.",
            requirements: [
              'Quest Started Fairytale II - Cure a Queen',
              'Dramen or Lunar staff to travel to Fairy ring code',
            ],
          },
          {
            description: 'Mine some coal near the coal trucks.',
            requirements: ['Mining level 30', 'Any pickaxe'],
          },
        ],
      },
      {
        tier: 'hard',
        tasks: [
          {
            description:
              "Catch a Leaping Sturgeon. Note: Must be caught at Otto's Grotto for this task.",
            requirements: [
              'Access to Barbarian Fishing',
              'Fishing level 70, Agility level 45, and Strength level 45',
              'Barbarian rod and suitable bait (fishing bait, feathers, fish offcuts, roe, or caviar)',
            ],
          },
          {
            description: "Complete a lap of the Seers' Village agility course.",
            requirements: ['Agility level 60'],
          },
          {
            description:
              "Create a Yew Longbow from scratch around Seers' Village. Note: This requires chopping a yew tree in the village, cutting the yew logs into a yew longbow (u), then finishing it with a bow string. Completing or updating any other task in-between these steps will reset the progress for this task.",
            requirements: [
              'Fletching level 70 and Woodcutting level 60',
              'Any axe, bow string (can be spun from flax), and a knife',
            ],
          },
          {
            description: "Enter the Seers' Village courthouse with piety turned on.",
            requirements: [
              "Quest Completion of King's Ransom and the Knight Waves Training Grounds",
              'Prayer level 70 and Defence level 70 (neither boostable)',
            ],
          },
          {
            description: 'Charge a Water Orb.',
            requirements: [
              'Magic level 56',
              'Dusty key or Agility level 70',
              'Unpowered orb and means to cast Charge Water Orb ()',
              'Protection from dragonfire recommended',
            ],
          },
          {
            description: "Burn some Maple logs with a bow in Seers' Village.",
            requirements: [
              'Access to Barbarian Firemaking',
              'Firemaking level 65',
              'Maple logs, and any bow (except the twisted, cursed, dark, crystal, ogre, rain, starter or signed oak bow)',
            ],
          },
          {
            description: 'Kill a Shadow Hound in the Shadow dungeon.',
            requirements: [
              'Quest Started Desert Treasure I',
              'Thieving level 53',
              'Ring of visibility (or a ring of shadows) and weaponry',
            ],
          },
          {
            description:
              'Kill a Mithril Dragon. Note: The mithril dragon fought during Dragon Slayer II does not count for this task.',
            requirements: [
              'Access to Barbarian Firemaking',
              'Weaponry and protection from dragonfire',
            ],
          },
          {
            description:
              'Purchase and equip a granite body from Barbarian Assault. Note: This requires having defeated the Penance Queen at the end of Barbarian Assault. Buying and equipping the granite body counts as two separate steps, and completing or updating any other task in-between these steps will reset the progress for this task.',
            requirements: [
              'Strength level 50 and Defence level 50',
              'See the gameplay overview and the strategy guide',
              '95,000 coins to purchase the granite body',
            ],
          },
          {
            description:
              "Have the Seers' estate agent decorate your house with Fancy Stone. Note: You must finish the dialogue or the task will not count as completed.",
            requirements: [
              'Construction level 50',
              '25,000 coins',
              'Additional 5,000 coins if already using Fancy Stone, to change to something else and back',
            ],
          },
          {
            description: "Smith an Adamant spear at Otto's Grotto.",
            requirements: [
              'Access to Barbarian Smithing',
              'Smithing level 75',
              'Yew logs, adamantite bar, and a hammer',
            ],
          },
        ],
      },
      {
        tier: 'elite',
        tasks: [
          {
            description:
              'Read the Blackboard at Barbarian Assault after reaching level 5 in every role. Note: These levels are bought with honour points. Assuming no points are spent on armour or gambles, you\'ll need a total of 5,600 points (1,400 per role). In Deadman Mode, the task is instead "Read the Blackboard at Barbarian Assault after finishing your training."',
            requirements: ['See the gameplay overview and the strategy guide'],
          },
          {
            description:
              'Pick some Dwarf weed from the herb patch at Catherby. Note: This is the herb patch next to Dantaera.',
            requirements: [
              'Farming level 79',
              'Dwarf weed seed, spade, seed dibber (or Barbarian Farming), and a rake',
              'Ultracompost recommended',
            ],
          },
          {
            description:
              "Fish and Cook 5 Sharks in Catherby using the Cooking gauntlets. Note: You specifically have to use the range in the building between the Catherby bank and the archery shop, the one in the building immediately north of that doesn't count. Extra sharks provided by Rada's blessing don't add up to the required number. Completing or updating any other task in-between these steps will reset the progress for this task.",
            requirements: [
              'Quest Completion of Family Crest',
              'Fishing level 76 and Cooking level 80',
              'Harpoon (or Barbarian Fishing) and cooking gauntlets',
            ],
          },
          {
            description:
              "Mix a Stamina Mix on top of the Seers' Village bank. Note: You have to start the Seers' Village Agility Course to climb on top of the bank.",
            requirements: [
              'Access to Barbarian Herblore',
              'Herblore level 86 and Agility level 60',
              'Stamina potion (2) and caviar',
            ],
          },
          {
            description: "Smith a Rune Hasta at Otto's Grotto.",
            requirements: [
              'Access to Barbarian Smithing',
              'Smithing level 90',
              'Runite bar, magic logs, and a hammer',
            ],
          },
          {
            description:
              'Construct a Pyre ship from Magic Logs. Note: You must use chewed bones for the ship, not mangled bones.',
            requirements: [
              'Access to Barbarian Firemaking',
              'Firemaking level 85  and Crafting level 85',
              'Magic logs, chewed bones, tinderbox, and any woodcutting axe',
            ],
          },
          {
            description: 'Teleport to Catherby. Note: Tele Group Catherby will also work here.',
            requirements: [
              'Quest Completion of Lunar Diplomacy',
              'Magic level 87',
              'Lunar spellbook selected',
              'Means to cast Catherby Teleport ()',
            ],
          },
        ],
      },
    ],
    wikiUrl: 'https://oldschool.runescape.wiki/w/Kandarin_Diary',
  },
  {
    pageId: 45650,
    title: 'Ardougne Diary',
    name: 'Ardougne',
    members: true,
    tiers: [
      {
        tier: 'easy',
        tasks: [
          {
            description:
              'Have Wizard Cromperty teleport you to the Rune Essence mine. Note: You can right-click him to teleport.',
            requirements: ['Quest Completion of Rune Mysteries'],
          },
          {
            description: 'Steal a cake from the Ardougne market stalls.',
            requirements: ['Thieving level 5'],
          },
          {
            description:
              "Sell Silk to Silk trader in Ardougne for 60 coins each. Note: You must first offer to sell your silk for 120 coins, then counter his bid with 60 coins. He'll refuse to speak to you if you've just stolen from his silk stall, and his behaviour only resets after you've spent at least ten consecutive minutes outside of Ardougne without logging off.",
            requirements: ['Silk'],
          },
          {
            description:
              "Use the altar in East Ardougne's church. Note: Requires you to have less than full Prayer points.",
            requirements: [],
          },
          {
            description:
              'Go out fishing on the Fishing Trawler Note: You only have to start this minigame, completing it is optional.',
            requirements: [],
          },
          {
            description: 'Enter the Combat Training Camp north of W. Ardougne.',
            requirements: ['Quest Completion of Biohazard'],
          },
          {
            description:
              "Have Tindel Marchant identify a Rusted Sword for you. Note: There is a 1/100 chance the sword turns out to be nothing, in which case you'll have to bring a new one.",
            requirements: ['Rusty sword and 100 coins'],
          },
          {
            description:
              'Use the Ardougne Lever to teleport to the Wilderness. Note: You can pull the lever there to return.',
            requirements: [],
          },
          {
            description: "View Aleck's Hunter Emporium in Yanille.",
            requirements: [],
          },
          {
            description:
              'Check what pets you have Insured with Probita in Ardougne. Note: You can right-click her to check.',
            requirements: [],
          },
        ],
      },
      {
        tier: 'medium',
        tasks: [
          {
            description: 'Enter the Unicorn pen in Ardougne zoo using Fairy rings.',
            requirements: [
              'Quest Started Fairytale II - Cure a Queen',
              'Dramen or Lunar staff to travel to Fairy ring code .',
            ],
          },
          {
            description: "Grapple over Yanille's south wall.",
            requirements: [
              'Agility level 39, Strength level 38 and Ranged level 21',
              'Mith grapple and any crossbow',
            ],
          },
          {
            description: 'Harvest some strawberries from the Ardougne farming patch.',
            requirements: [
              'Farming level 31',
              '3 strawberry seeds, spade, seed dibber (or Barbarian Farming), and a rake',
              'Basket of apples recommended to pay the nearby farmer to protect the crop',
            ],
          },
          {
            description: 'Cast the Ardougne Teleport spell.',
            requirements: [
              'Quest Completion of Plague City',
              'Magic level 51',
              'Means to cast Ardougne Teleport ()',
            ],
          },
          {
            description: 'Travel to Castlewars by Hot Air Balloon.',
            requirements: [
              'Quest Completion of Enlightened Journey',
              'Firemaking level 50',
              'Yew log',
              'If the route has not been unlocked yet, 11 total yew logs are required to unlock it before flying again to Castle Wars to complete this task. Upon unlocking the route, you may use 1 normal log to depart to Taverley before returning to Castle Wars for the task completion.',
            ],
          },
          {
            description:
              "Claim buckets of sand from Bert in Yanille. Note: Ultimate Ironmen must instead fill a bucket with sand from Bert's sand pit.",
            requirements: [
              'Quest Completion of The Hand in the Sand (unless playing as Ultimate Ironman)',
              'Bucket',
            ],
          },
          {
            description: 'Catch any fish on the Fishing Platform.',
            requirements: ['Quest Started Sea Slug', 'A small fishing net'],
          },
          {
            description: 'Pickpocket the master farmer north of Ardougne.',
            requirements: ['Thieving level 38'],
          },
          {
            description:
              'Collect some Nightshade from the Skavid Caves. Note: It can be found in the northernmost cave.',
            requirements: [
              'Quest Partial completion of Watchtower',
              'Any light source and the Skavid map',
            ],
          },
          {
            description: 'Kill a swordchick in the Tower of Life.',
            requirements: [
              'Quest Completion of Tower of Life',
              'Raw chicken and raw swordfish',
              'Weaponry',
            ],
          },
          {
            description:
              "Equip Iban's upgraded staff or upgrade an Iban staff. Note: You can upgrade the staff without equipping it.",
            requirements: [
              'Quest Completion of Underground Pass',
              "Iban's upgraded staff, or 200,000 coins and Iban's staff to have the Dark Mage in West Ardougne upgrade it",
            ],
          },
          {
            description: "Visit the Island East of the Necromancer's tower.",
            requirements: [
              'Quest Started Fairytale II - Cure a Queen',
              'Dramen or Lunar staff to travel to Fairy ring code',
            ],
          },
        ],
      },
      {
        tier: 'hard',
        tasks: [
          {
            description: 'Recharge some Jewellery at the Totem in the Legends Guild.',
            requirements: [
              "Quest Completion of Legends' Quest",
              'Less than fully charged skills necklace or combat bracelet',
            ],
          },
          {
            description: 'Enter the Magic Guild.',
            requirements: ['Magic level 66'],
          },
          {
            description: 'Steal from a chest in Ardougne Castle.',
            requirements: ['Thieving level 72', 'Lockpick recommended'],
          },
          {
            description: "Have a zookeeper put you in Ardougne Zoo's monkey cage.",
            requirements: [
              'Quest Partial completion of the Monkey Madness I quest',
              'Karamjan monkey greegree',
            ],
          },
          {
            description: 'Teleport to the Watchtower.',
            requirements: [
              'Quest Completion of Watchtower',
              'Magic level 58',
              'Means to cast the Watchtower teleport ()',
            ],
          },
          {
            description: 'Catch a Red Salamander.',
            requirements: ['Hunter level 59', 'Rope and small fishing net'],
          },
          {
            description:
              'Check the health of a Palm tree near tree gnome village. Note: This is the farming patch next to Gileth.',
            requirements: [
              'Farming level 68',
              'Palm sapling, spade and a rake',
              '15 Papaya fruit recommended to pay the gardener',
            ],
          },
          {
            description:
              'Pick some Poison Ivy berries from the patch south of Ardougne. Note: This patch is located next to the Ardougne Monastery.',
            requirements: [
              'Farming level 70',
              'Poison ivy seed, seed dibber (or Barbarian Farming), and a rake',
            ],
          },
          {
            description:
              "Smith a Mithril platebody near Ardougne. Note: You'll have to use the Port Khazard, Yanille, or West Ardougne anvil for this.",
            requirements: ['Smithing level 68', '5 mithril bars and a hammer'],
          },
          {
            description: 'Enter your POH from Yanille.',
            requirements: [
              'Construction level 50',
              '25,000 coins for an estate agent to move your house to Yanille',
            ],
          },
          {
            description: 'Smith a Dragon sq shield in West Ardougne.',
            requirements: [
              'Quest Partial completion of Plague City',
              'Smithing level 60',
              'Shield left half, shield right half and a hammer',
            ],
          },
          {
            description:
              "Craft some Death runes from Essence. Note: Entering the Death Altar from the Mourner Headquarters is not recommended after the quest. It follows a lengthy route that requires the crystal trinket and a death talisman/tiara or catalytic talisman/tiara, and (if Song of the Elves has not been completed) mourner gear and the new key. It's even possible to lock yourself out of this entrance with the light puzzle, which may require you to enter it via the Abyss or through the Underground Pass anyway to change the rotation of the mirrors again.",
            requirements: [
              "Quest Completion of Mourning's End Part II",
              'Runecraft level 65',
              'Pure or daeyalt essence',
              'Access to the Death Altar via the Abyss',
            ],
          },
        ],
      },
      {
        tier: 'elite',
        tasks: [
          {
            description:
              'Catch a Manta ray in the Fishing Trawler and cook it in Port Khazard. Note: Completing or updating any other task in-between these steps will reset the progress for this task.',
            requirements: [
              'Fishing level 81 and Cooking level 91',
              'Raw manta ray, multiple recommended in case of burning one',
            ],
          },
          {
            description: 'Picklock the door to the basement of Yanille Agility Dungeon.',
            requirements: ['Thieving level 82', 'Lockpick'],
          },
          {
            description: 'Pickpocket a Hero.',
            requirements: ['Thieving level 80'],
          },
          {
            description:
              'Make a rune crossbow yourself from scratch within Witchaven or Yanille. Note: You must use the spinning wheel in Witchaven to make the crossbow string and the anvil in Yanille to make the runite limbs. Fletching the yew stock and completing the rune crossbow can be done in either settlement. Completing or updating any other task in-between these steps will reset the progress for this task.',
            requirements: [
              'Crafting level 10, Smithing level 91 and Fletching level 69',
              'Yew logs, runite bar, hammer, knife, and sinew or a tree root',
            ],
          },
          {
            description:
              'Imbue a Salve amulet at Nightmare Zone, or equip a Salve amulet that was imbued there. Note: You cannot use a Scroll of imbuing from Emir\'s Arena or use Zeal Tokens from Soul Wars. In Deadman Mode, the task is "Attempt to equip an imbued Salve amulet at the Nightmare Zone plinth." NOTE: Whilst the text reads imbued, you must wear a Salve (ei) not Salve (i)',
            requirements: [
              'Quest Completion of the Haunted Mine',
              'Access to the Nightmare Zone',
              'Salve amulet(i) or Salve amulet(ei), or 800,000 Nightmare Zone points points to imbue the normal one (reduced to 400,000 points with the hard tier of the combatachievement Combat Achievements completed)',
            ],
          },
          {
            description: 'Pick some Torstol from the patch north of Ardougne.',
            requirements: [
              'Farming level 85',
              'Torstol seed, seed dibber (or Barbarian Farming), and a rake',
              'Ultracompost recommended',
            ],
          },
          {
            description: "Complete a lap of Ardougne's rooftop agility course.",
            requirements: ['Agility level 90'],
          },
          {
            description:
              'Cast Ice Barrage on another player within Castle Wars. Note: You have to successfully hit the player, so multiple casts are recommended. In Deadman Mode, the task is "Visit the Castle Wars lobby with at least 94 Magic after completing Desert Treasure I."',
            requirements: [
              'Quest Completion of Desert Treasure I',
              'Magic level 94',
              'Means to cast Ice Barrage ( or a Blighted ancient ice sack for every cast)',
            ],
          },
        ],
      },
    ],
    wikiUrl: 'https://oldschool.runescape.wiki/w/Ardougne_Diary',
  },
  {
    pageId: 45651,
    title: 'Lumbridge & Draynor Diary',
    name: 'Lumbridge & Draynor',
    members: true,
    tiers: [
      {
        tier: 'easy',
        tasks: [
          {
            description: 'Complete a lap of the Draynor Village agility course.',
            requirements: [],
          },
          {
            description: 'Slay a Cave bug beneath Lumbridge Swamp.',
            requirements: [
              'Slayer level 7',
              'Light source',
              "Rope if the caves haven't been entered yet",
            ],
          },
          {
            description: 'Have Sedridor teleport you to the Rune essence mine.',
            requirements: ['Quest Completion of Rune Mysteries'],
          },
          {
            description: 'Craft some water runes from Essence.',
            requirements: [
              'Runecraft level 5',
              'Pure, daeyalt, or rune essence',
              'Access to the Water Altar (water talisman/tiara, elemental talisman/tiara, or the Abyss)',
            ],
          },
          {
            description: 'Learn your age from Hans in Lumbridge.',
            requirements: [],
          },
          {
            description: 'Pickpocket a man or woman in Lumbridge.',
            requirements: [],
          },
          {
            description: 'Chop and burn some oak logs in Lumbridge.',
            requirements: ['Woodcutting level 15 and Firemaking level 15', 'Any axe and tinderbox'],
          },
          {
            description: 'Kill a Zombie in Draynor Sewers.',
            requirements: [],
          },
          {
            description: 'Catch some Anchovies in Al Kharid.',
            requirements: ['Fishing level 15', 'Small fishing net'],
          },
          {
            description: 'Bake some Bread on the Lumbridge kitchen range.',
            requirements: [
              "Quest Completion of Cook's Assistant",
              'Bread dough, multiple recommended in case of burning one (always successful at Cooking level 34)',
            ],
          },
          {
            description: 'Mine some Iron ore at the Al Kharid mine.',
            requirements: ['Mining level 15', 'Any pickaxe'],
          },
          {
            description: 'Enter the H.A.M. Hideout.',
            requirements: ['None, though a lockpick is recommended'],
          },
        ],
      },
      {
        tier: 'medium',
        tasks: [
          {
            description: 'Complete a lap of the Al Kharid agility course.',
            requirements: ['Agility level 20'],
          },
          {
            description: 'Grapple across the River Lum.',
            requirements: [
              'Agility level 8, Strength level 19 and Ranged level 37',
              'Mith grapple and any crossbow',
            ],
          },
          {
            description: 'Purchase an upgraded device from Ava.',
            requirements: [
              'Quest Completion of Animal Magnetism',
              'Ranged level 50',
              "75 steel arrows with Ava's attractor, or 75 steel arrows with 999 coins",
            ],
          },
          {
            description: "Travel to the Wizards' Tower by Fairy ring.",
            requirements: [
              'Quest Started Fairytale II - Cure a Queen',
              'Dramen or Lunar staff to travel to Fairy ring code',
            ],
          },
          {
            description: 'Cast the Teleport to Lumbridge spell.',
            requirements: ['Magic level 31', 'Means to cast Lumbridge Teleport ()'],
          },
          {
            description: 'Catch some Salmon in Lumbridge.',
            requirements: ['Fishing level 30', 'Fly fishing rod and some feathers'],
          },
          {
            description:
              'Craft a coif in the Lumbridge cow pen. Note: Not to be confused with a cowl.',
            requirements: [
              'Crafting level 38',
              'Leather, and a needle and thread or the costume needle',
            ],
          },
          {
            description: 'Chop some willow logs in Draynor Village.',
            requirements: ['Woodcutting level 30', 'Any axe'],
          },
          {
            description: 'Pickpocket Martin the Master Gardener.',
            requirements: ['Thieving level 38'],
          },
          {
            description: 'Get a slayer task from Chaeldar.',
            requirements: [
              'Quest Completion of Lost City',
              'Combat level 70',
              'Dramen or Lunar staff to enter Zanaris',
            ],
          },
          {
            description: 'Catch an Essence or Eclectic impling in Puro-Puro.',
            requirements: [
              'Hunter level 42',
              'Dramen or Lunar staff to enter Zanaris',
              'Butterfly net and impling jar',
            ],
          },
          {
            description:
              'Craft some Lava runes at the fire altar in Al Kharid. Note: Use the earth runes you brought on the altar, do not use the essence.',
            requirements: [
              'Runecraft level 23',
              'Earth talisman, earth runes, and pure or daeyalt essence',
              'Access to the Fire Altar (fire talisman/tiara, elemental talisman/tiara, or the Abyss)',
              'Binding necklace recommended to guarantee the runes are successfully crafted',
            ],
          },
        ],
      },
      {
        tier: 'hard',
        tasks: [
          {
            description:
              'Cast Bones to Peaches in Al Kharid palace. Note: Using the Bones to Peaches tablet does not count.',
            requirements: [
              'Magic level 60',
              'Access to Bones to Peaches via the Mage Training Arena',
              'Bones and means to cast Bones to Peaches ()',
            ],
          },
          {
            description: 'Squeeze past the jutting wall on your way to the cosmic altar.',
            requirements: [
              'Quest Completion of Lost City',
              'Agility level 46',
              'Dramen or Lunar staff to enter Zanaris, or access to the Abyss',
            ],
          },
          {
            description:
              'Craft 56 Cosmic runes simultaneously from Essence without the use of Extracts.',
            requirements: [
              'Quest Completion of Lost City',
              'Runecraft level 59',
              '28 pure or daeyalt essence (less may suffice with Raiments of the Eye pieces)',
              'Access to the Cosmic Altar (cosmic talisman/tiara, catalytic talisman/tiara, or the Abyss)',
            ],
          },
          {
            description: 'Travel from Lumbridge to Edgeville on a Waka Canoe.',
            requirements: ['Woodcutting level 57', 'Any axe'],
          },
          {
            description:
              "Collect at least 100 Tears of Guthix in one visit. Note: This minigame can only be tried once a week, so be aware. Each quest point increases the time you can spend collecting tears by one game tick. It's recommended to have at least 150 quest points before trying this task. See the Tears of Guthix (minigame) page for other strategies you can use to maximize points.",
            requirements: [
              'Quest Completion of Tears of Guthix',
              'Games necklace recommended for quick access',
            ],
          },
          {
            description: 'Take the train from Dorgesh-Kaan to Keldagrim.',
            requirements: ['Quest Completion of Another Slice of H.A.M.'],
          },
          {
            description: 'Purchase some Barrows gloves from the Lumbridge bank chest.',
            requirements: ['Quest Full completion of Recipe for Disaster', '130,000 coins'],
          },
          {
            description: 'Pick some Belladonna from the farming patch at Draynor Manor.',
            requirements: [
              'Farming level 63',
              'Belladonna seed, seed dibber, spade, rake and any gloves',
            ],
          },
          {
            description: 'Light your mining helmet in the Lumbridge castle basement.',
            requirements: ['Firemaking level 65', 'Tinderbox and mining helmet'],
          },
          {
            description: "Recharge your prayer at Emir's Arena with Smite activated.",
            requirements: ['Prayer level 52'],
          },
          {
            description:
              'Craft, string and enchant an Amulet of Power in Lumbridge. Note: Doing this upstairs in Lumbridge Castle does not count.',
            requirements: [
              'Crafting level 70 and Magic level 57',
              'Gold bar, cut diamond, amulet mould, ball of wool',
              'Means to cast Lvl-4 Enchant ()',
            ],
          },
        ],
      },
      {
        tier: 'elite',
        tasks: [
          {
            description: 'Steal from a Dorgesh-Kaan rich chest.',
            requirements: [
              'Quest Completion of Death to the Dorgeshuun',
              'Thieving level 78',
              'Lockpick',
            ],
          },
          {
            description: 'Grapple across a pylon on the Dorgesh-Kaan Agility Course.',
            requirements: [
              'Quest Completion of Death to the Dorgeshuun',
              'Agility level 70, Ranged level 70 and Strength level 70',
              'Mith grapple, any crossbow, and a light source',
            ],
          },
          {
            description: 'Chop some magic logs at the Mage Training Arena.',
            requirements: ['Woodcutting level 75', 'Any axe'],
          },
          {
            description: 'Smith an Adamant platebody down Draynor sewer.',
            requirements: ['Smithing level 88', '5 adamantite bars and a hammer'],
          },
          {
            description:
              'Craft 140 or more Water runes simultaneously from Essence without the use of Extracts.',
            requirements: [
              'Runecraft level 76',
              'Runecraft level 57 with 3 Raiments of the Eye pieces, (2 pieces with Abyssal lantern lit with magic logs)',
              'Runecraft level 38 with 4 Raiments of the Eye pieces (random chance, not guaranteed)',
              '28 pure, daeyalt, or rune essence (less may suffice at higher Runecraft levels)',
              'Access to the Water Altar (water talisman/tiara, elemental talisman/tiara, or the Abyss)',
            ],
          },
          {
            description: "Perform the Quest cape emote in the Wise Old Man's house.",
            requirements: ['Quest Completion of all quests', 'Quest point cape'],
          },
        ],
      },
    ],
    wikiUrl: 'https://oldschool.runescape.wiki/w/Lumbridge_%26_Draynor_Diary',
  },
  {
    pageId: 199354,
    title: 'Kourend & Kebos Diary',
    name: 'Kourend & Kebos',
    members: true,
    tiers: [
      {
        tier: 'easy',
        tasks: [
          {
            description: 'Mine some Iron at the Mount Karuulm mine.',
            requirements: ['Mining level 15', 'Any pickaxe'],
          },
          {
            description: 'Kill a Sandcrab.',
            requirements: [],
          },
          {
            description: 'Hand in a book at the Arceuus Library.',
            requirements: [],
          },
          {
            description: 'Steal from a Hosidius Food Stall.',
            requirements: ['Thieving level 25'],
          },
          {
            description: 'Browse the Warrens General Store.',
            requirements: [],
          },
          {
            description:
              "Take a boat to Land's End. Note: You have to travel with Veos or Cabin Boy Herbert from Port Sarim or Port Piscarilius.",
            requirements: [],
          },
          {
            description:
              'Pray at the Altar in Kourend Castle Note: This altar is found on the top floor of the castle.',
            requirements: [],
          },
          {
            description: 'Dig up some Saltpetre.',
            requirements: ['Spade'],
          },
          {
            description: 'Enter your Player Owned House from Hosidius.',
            requirements: [
              'Construction level 25',
              "8,750 coins for an estate agent to move your house to Hosidius (can only be done after you've visited Great Kourend)",
            ],
          },
          {
            description: 'Do a lap of either tier of the Shayzien Agility Course.',
            requirements: [],
          },
          {
            description: 'Create a Strength potion in the Lovakengj Pub.',
            requirements: [
              'Quest Completion of Druidic Ritual',
              'Herblore level 12',
              'Tarromin potion (unf) and limpwurt root',
            ],
          },
          {
            description:
              'Fish a Trout from the River Molch. Note: The fishing spot is found south-east of the Farming Guild.',
            requirements: [
              'Fishing level 20',
              'Fly fishing rod and some feathers (bring enough feathers to account for fishing raw salmon multiple times before you get a raw trout)',
            ],
          },
        ],
      },
      {
        tier: 'medium',
        tasks: [
          {
            description: 'Travel to the Fairy Ring south of Mount Karuulm.',
            requirements: [
              'Quest Started Fairytale II - Cure a Queen',
              'Dramen or Lunar staff to travel to Fairy ring code',
            ],
          },
          {
            description: 'Kill a Lizardman.',
            requirements: ['Combat gear', 'Antipoison recommended'],
          },
          {
            description: "Use Kharedst's memoirs to teleport to all five cities in Great Kourend.",
            requirements: [
              'Quest Completion of The Depths of Despair, The Queen of Thieves, Tale of the Righteous, The Forsaken Tower and The Ascent of Arceuus',
              "Kharedst's memoirs or the Book of the Dead",
            ],
          },
          {
            description: 'Mine some Volcanic Sulphur.',
            requirements: [
              'Mining level 42',
              'Any pickaxe',
              'Face mask, gas mask, or slayer helmet',
            ],
          },
          {
            description:
              "Enter the Farming Guild. Note: You have to walk through the guild's main entrance.",
            requirements: ['Farming level 45'],
          },
          {
            description: 'Switch to the Necromancy Spellbook at Tyss.',
            requirements: [],
          },
          {
            description: 'Repair a Piscarilius crane.',
            requirements: [
              'Crafting level 30 and Construction level 30',
              'Hammer, 3 regular planks, and about 50 nails of any variant',
            ],
          },
          {
            description: 'Deliver some intelligence to Captain Ginea.',
            requirements: ['Combat gear'],
          },
          {
            description: 'Catch a Bluegill on Molch Island.',
            requirements: [
              'Fishing level 43 and Hunter level 35',
              'King worms (found on the island) or fish offcuts',
            ],
          },
          {
            description: 'Use the boulder leap shortcut in the Arceuus essence mine.',
            requirements: ['Agility level 49'],
          },
          {
            description: 'Subdue the Wintertodt Note: You must earn at least 500 points.',
            requirements: [
              'Firemaking level 50',
              'Any axe, tinderbox, and warm clothing',
              'Knife and a hammer or Imcando hammer recommended to score more points',
              "Rejuvenation potions recommended for learners (these are made in the minigame's lobby)",
            ],
          },
          {
            description: 'Catch a Chinchompa in the Kourend Woodland.',
            requirements: [
              "Quest Partial completion of Eagles' Peak",
              'Hunter level 53',
              'Box trap',
            ],
          },
          {
            description: 'Chop some Mahogany logs north of the Farming Guild.',
            requirements: ['Woodcutting level 50', 'Any axe'],
          },
        ],
      },
      {
        tier: 'hard',
        tasks: [
          {
            description: 'Enter the Woodcutting Guild.',
            requirements: ['Woodcutting level 60'],
          },
          {
            description:
              'Smelt an Adamantite bar in The Forsaken Tower. Note: Using the Superheat Item spell does not count.',
            requirements: [
              'Quest Completion of The Forsaken Tower',
              'Smithing level 70',
              'Adamantite ore and 6 coal',
            ],
          },
          {
            description: 'Kill a Lizardman Shaman in the Lizardman Temple.',
            requirements: ['See the strategy guide'],
          },
          {
            description: 'Mine some Lovakite.',
            requirements: ['Mining level 65', 'Any pickaxe'],
          },
          {
            description: 'Plant some Logavano seeds at the Tithe Farm.',
            requirements: ['Farming level 74', 'Seed dibber'],
          },
          {
            description: 'Kill a Zombie in the Shayzien Crypts.',
            requirements: ['Combat gear and a light source'],
          },
          {
            description: "Teleport to Xeric's Heart using Xeric's Talisman.",
            requirements: [
              "Xeric's talisman charged with a lizardman fang, or a mounted xeric's talisman inside any player-owned house (see the House party worlds)",
            ],
          },
          {
            description: 'Deliver an artefact to Captain Khaled.',
            requirements: ['Thieving level 49', 'Lockpick'],
          },
          {
            description: 'Kill a Wyrm in the Karuulm Slayer Dungeon.',
            requirements: [
              'Slayer level 62',
              'Combat gear',
              'Boots of stone, brimstone, or granite',
            ],
          },
          {
            description: 'Cast Monster Examine on a Troll south of Mount Quidamortem.',
            requirements: [
              'Quest Completion of Dream Mentor',
              'Magic level 66',
              'Lunar spellbook selected',
              'Means to cast Monster Examine ()',
            ],
          },
        ],
      },
      {
        tier: 'elite',
        tasks: [
          {
            description:
              'Craft one or more Blood runes from Dark essence. Note: This requires mining a dark essence block and breaking it down into fragments, then using those fragments on the Kourend Blood Altar.',
            requirements: [
              'Runecraft level 77, Mining level 38, and Crafting level 38',
              'Any pickaxe and chisel',
            ],
          },
          {
            description: 'Chop some Redwood logs.',
            requirements: ['Woodcutting level 90', 'Any axe'],
          },
          {
            description: 'Defeat Skotizo in the Catacombs of Kourend.',
            requirements: ['Dark totem', 'See the strategy guide'],
          },
          {
            description: 'Catch an Anglerfish and cook it whilst in Great Kourend.',
            requirements: [
              'Fishing level 82 and Cooking level 84',
              'Fishing rod and some sandworms',
            ],
          },
          {
            description:
              'Kill a Hydra in the Karuulm Slayer Dungeon. Note: Either variant may be killed to fulfill this requirement. Only the Alchemical Hydra requires a slayer task to kill.',
            requirements: ['Slayer level 95', 'Weaponry', 'Antipoison recommended'],
          },
          {
            description: 'Create an Ape Atoll teleport tablet.',
            requirements: [
              'Magic level 90',
              'Arceuus spellbook selected',
              'Dark essence block and the required runes ()',
            ],
          },
          {
            description: 'Complete a Raid in the Chambers of Xeric.',
            requirements: ['See the strategy guide'],
          },
          {
            description: 'Create your own Battlestaff from scratch within the Farming Guild.',
            requirements: [
              'Farming level 85 and Fletching level 40',
              'Celastrus sapling, knife, spade, rake, and any axe',
              '8 potato cacti recommended to protect your sapling',
            ],
          },
        ],
      },
    ],
    wikiUrl: 'https://oldschool.runescape.wiki/w/Kourend_%26_Kebos_Diary',
  },
]
