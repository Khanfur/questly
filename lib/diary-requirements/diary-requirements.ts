/**
 * Groups a diary task's freeform requirement strings (scraped from the
 * wiki's per-task "Requirements" column — see `wiki-diary-parser.mjs`) into
 * display categories, so the task checklist can show "Skills" / "Quests" /
 * "Items" separately instead of one run-on comma list.
 *
 * There's no structured per-category data at the source (unlike quests,
 * which have distinct `requirements`/`itemsRequired` wiki template fields) —
 * diary task requirements are a single bullet list of plain text. This is a
 * best-effort text-pattern classification:
 *  - Strings prefixed "Quest " (e.g. "Quest Completion of Shilo Village",
 *    added by the scraper from the wiki's bolded "Quest" requirement label)
 *    or matching "N Quest Points" go under Quests, with the "Quest " prefix
 *    stripped for cleaner display.
 *  - Strings containing "level N" (e.g. "Agility level 10") go under Skills.
 *  - Everything else (items, coins, misc conditions) goes under Items.
 */

export type DiaryRequirementCategory = 'skills' | 'quests' | 'items'

export interface DiaryRequirementGroup {
  category: DiaryRequirementCategory
  label: string
  requirements: string[]
}

const CATEGORY_LABEL: Record<DiaryRequirementCategory, string> = {
  skills: 'Skills',
  quests: 'Quests',
  items: 'Items',
}

const QUEST_PREFIX_PATTERN = /^Quest\s+/i
const QUEST_POINTS_PATTERN = /^\d+\s+Quest Points$/i
const SKILL_LEVEL_PATTERN = /\blevel \d+\b/i

export function groupDiaryRequirements(requirements: string[]): DiaryRequirementGroup[] {
  const byCategory: Record<DiaryRequirementCategory, string[]> = {
    skills: [],
    quests: [],
    items: [],
  }

  for (const requirement of requirements) {
    if (QUEST_PREFIX_PATTERN.test(requirement)) {
      byCategory.quests.push(requirement.replace(QUEST_PREFIX_PATTERN, ''))
    } else if (QUEST_POINTS_PATTERN.test(requirement)) {
      byCategory.quests.push(requirement)
    } else if (SKILL_LEVEL_PATTERN.test(requirement)) {
      byCategory.skills.push(requirement)
    } else {
      byCategory.items.push(requirement)
    }
  }

  return (Object.keys(byCategory) as DiaryRequirementCategory[])
    .filter((category) => byCategory[category].length > 0)
    .map((category) => ({
      category,
      label: CATEGORY_LABEL[category],
      requirements: byCategory[category],
    }))
}
