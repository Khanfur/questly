import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {Progress} from "@/components/ui/progress";
import {Separator} from "@/components/ui/separator";
import {SectionDivider} from "@/components/ui/section-divider";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";


export default function ComponentLibrary() {
    return (
        <>
        <h1>Component Library</h1>

            <h2 className="mt-6">Typography</h2>
            <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-6">
                <div className="flex flex-col gap-1">
                    <span className="eyebrow">Companion for Gielinor</span>
                    <span className="text-xs text-muted-foreground">.eyebrow</span>
                </div>
                <div className="flex flex-col gap-1">
                    <h1>Track the grind. Trust the Sage.</h1>
                    <span className="text-xs text-muted-foreground">h1</span>
                </div>
                <div className="flex flex-col gap-1">
                    <h2>Song of the Elves</h2>
                    <span className="text-xs text-muted-foreground">h2</span>
                </div>
                <div className="flex flex-col gap-1">
                    <h3>Dragon Slayer II</h3>
                    <span className="text-xs text-muted-foreground">h3</span>
                </div>
                <div className="flex flex-col gap-1">
                    <h4>Combat Level</h4>
                    <span className="text-xs text-muted-foreground">h4</span>
                </div>
                <div className="flex flex-col gap-1">
                    <p>
                        Questly keeps every skill, quest and diary in one parchment — and a
                        Sage on call whenever you&apos;re stuck between a slayer task and a
                        life choice.
                    </p>
                    <span className="text-xs text-muted-foreground">p</span>
                </div>
                <div className="flex flex-wrap items-end gap-6">
                    <div className="flex flex-col gap-1">
                        <span className="section-heading">Skills</span>
                        <span className="text-xs text-muted-foreground">.section-heading</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="label">Stats</span>
                        <span className="text-xs text-muted-foreground">.label</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="stat-value">1,543</span>
                        <span className="text-xs text-muted-foreground">.stat-value</span>
                    </div>
                </div>
            </div>

            <h2 className="mt-6">Buttons</h2>
            <div className="flex flex-wrap items-center gap-2">
                <Button>Default</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="link">Link</Button>
            </div>

            <h2 className="mt-6">Hero CTAs</h2>
            <div className="flex flex-wrap items-center gap-3">
                <Button size="lg">View my stats</Button>
                <Button size="lg" variant="outline">Ask the Sage</Button>
            </div>

            <h2 className="mt-6">Badges</h2>
            <div className="flex flex-wrap items-center gap-2">
                <Badge>In Progress</Badge>
                <Badge variant="secondary">Completed</Badge>
                <Badge variant="muted">Not Started</Badge>
                <Badge variant="destructive">Failed</Badge>
                <Badge variant="outline">Outline</Badge>
            </div>

            <h2 className="mt-6">Progress</h2>
            <div className="flex flex-col gap-4 max-w-md">
                <div className="flex flex-col gap-1">
                    <span className="label">Dragon Slayer II — in progress</span>
                    <Progress value={65} />
                </div>
                <div className="flex flex-col gap-1">
                    <span className="label">Sins of the Father — completed</span>
                    <Progress value={100} variant="secondary" />
                </div>
                <div className="flex flex-col gap-1">
                    <span className="label">Song of the Elves — not started</span>
                    <Progress value={0} variant="muted" />
                </div>
            </div>

            <h2 className="mt-6">Separator &amp; Section Divider</h2>
            <div className="flex flex-col gap-6 max-w-md">
                <Separator />
                <SectionDivider />
            </div>

            <h2 className="mt-6">Avatar</h2>
            <div className="flex flex-wrap items-center gap-3">
                <Avatar>
                    <AvatarFallback>🧙</AvatarFallback>
                </Avatar>
            </div>
        </>
    );
}
