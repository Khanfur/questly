import Link from "next/link";
import { BookOpen, Code2 } from "lucide-react";

import { Container } from "@/components/layout/container";

const FEATURE_LINKS = [
  { name: "Stats", href: "/" },
  { name: "Quests", href: "/quests" },
  { name: "Ask the Sage", href: "/ask-the-sage" },
] as const;

const RESOURCE_LINKS = [
  { name: "Report an issue", href: "https://github.com/Khanfur/questly/issues" },
] as const;

const SOCIAL_LINKS = [
  { label: "Source code", href: "https://github.com/Khanfur/questly", icon: Code2 },
] as const;

export function Footer() {
  return (
    <footer
      className="border-t border-border bg-card"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <Container className="py-12">
        <div className="xl:grid xl:grid-cols-2 xl:gap-16">
          <div className="space-y-6 pr-8">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <BookOpen className="size-4" />
              </span>
              <span className="font-heading text-lg font-bold uppercase tracking-wide text-foreground">
                Questly
              </span>
            </Link>
            <p className="max-w-sm text-sm leading-6 text-muted-foreground">
              Questly keeps every skill, quest and diary in one parchment — a
              free, fan-made companion for Old School RuneScape.
            </p>
            <div className="flex gap-4">
              {SOCIAL_LINKS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <span className="sr-only">{item.label}</span>
                  <item.icon className="size-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-8 xl:mt-0">
            <div>
              <h3 className="section-heading">Features</h3>
              <ul className="mt-4 space-y-3">
                {FEATURE_LINKS.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="section-heading">Resources</h3>
              <ul className="mt-4 space-y-3">
                {RESOURCE_LINKS.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          Questly is a fan-made companion app and is not affiliated with Jagex.
        </div>
      </Container>
    </footer>
  );
}
