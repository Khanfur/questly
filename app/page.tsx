import { SectionDivider } from '@/components/ui/section-divider/section-divider'
import { Button } from '@/components/ui/shadcn/button'

export default function Home() {
  return (
    <>
      <div className={'flex flex-col items-center'}>
        <span className="eyebrow">Companion for Gielinor</span>
        <h1>Track the grind.</h1>
        <h1>Trust the Sage.</h1>
        <p className={'max-w-md text-center mb-4'}>
          Questly keeps every skill, quest and diary in one parchment — and a Sage on call whenever
          you're stuck between a slayer task and a life choice.
        </p>

        <div className="flex gap-3">
          <Button size="lg">View my stats</Button>
          <Button size="lg" variant="outline">
            Ask the Sage
          </Button>
        </div>
      </div>

      <SectionDivider className={'my-8'} />
    </>
  )
}
