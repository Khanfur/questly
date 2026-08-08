import {Button} from "@/components/ui/button";


export default function ComponentLibrary() {
    return (
        <>
        <h1>Component Library</h1>
            <h2 className="mt-6">Buttons</h2>
            <div className="flex flex-wrap items-center gap-2">
                <Button>Default</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="link">Link</Button>
            </div>

            <h2 className="mt-6">Hero CTAs (size=&quot;lg&quot;)</h2>
            <div className="flex flex-wrap items-center gap-3">
                <Button size="lg">View my stats</Button>
                <Button size="lg" variant="outline">Ask the Sage</Button>
            </div>
        </>
    );
}
