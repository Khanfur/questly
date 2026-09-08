// Canned Sage replies for the static /ask-the-sage chat page. There's no real
// AI backend wired up yet, so a suggestion click always returns the same
// reply, and free-typed messages cycle through sageFallbackReplies below.
export const sageReplies: Record<string, string> = {
  'quest-points':
    "Legends' Quest is calling your name — high requirements, sure, but you're a stone's throw away. Knock out Waterfall Quest and Heroes' Quest first to clear the path.",
  gear: 'At your combat level, a Rune crossbow with Broad bolts and a Fire cape go a long way. Save up for a Trident once your Magic catches up.',
  chat: "Fine by me. Slow day in Gielinor — even the Wise Old Man's run out of gossip.",
}

// Generic filler used when the player types something the Sage has no
// canned answer for. Cycled in order rather than chosen at random so the
// page renders deterministically in tests and Storybook.
export const sageFallbackReplies: string[] = [
  "Hm. That one's above my pay grade — try asking the Wise Old Man.",
  "I'll be honest, I was mostly built to talk about quests and gear. But go on.",
  "Bold question. I like it. Unfortunately, I still don't have an answer.",
]
