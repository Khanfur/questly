"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Settings } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Stats" },
  { href: "/quests", label: "Quests" },
  { href: "/ask-the-sage", label: "Ask the Sage" },
] as const;

export function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b border-border bg-card">
      <Container className="flex h-[70px] items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <BookOpen className="size-4" />
          </span>
          <span className="font-heading text-lg font-bold uppercase tracking-wide text-foreground">
            Questly
          </span>
        </Link>

        <nav className="hidden items-center gap-1 sm:flex">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "label rounded-md px-3 py-1.5 text-muted-foreground transition-colors hover:text-foreground",
                  isActive && "bg-muted text-foreground"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <Button
          size="icon"
          variant="outline"
          className="bg-sidebar"
          aria-label="Settings"
        >
          <Settings />
        </Button>
      </Container>
    </header>
  );
}
