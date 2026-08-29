import { ArrowRight, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { TypographyH2, TypographyP } from "@/components/typography";
import { PHONE_DISPLAY, PHONE_LINK } from "@/lib/site-content";

export function ClosingCta({
  onCallClick,
}: {
  onCallClick?: () => void;
}) {
  return (
    <section className="hero-surface text-primary-foreground">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 sm:py-16 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="eyebrow text-primary-foreground/70">Need plumbing help?</p>
          <TypographyH2 className="section-title mt-3 max-w-3xl text-4xl text-primary-foreground sm:text-5xl">
            Call now for urgent help, or request service for a callback.
          </TypographyH2>
          <TypographyP className="mt-4 max-w-2xl text-primary-foreground/75">
            Plumbing, hot water, gas and bathroom work across Papatoetoe and
            South Auckland. For urgent problems, calling is the fastest route.
          </TypographyP>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
          <Button asChild variant="call" size="xl">
            <a href={PHONE_LINK} onClick={onCallClick}>
              <Phone aria-hidden="true" /> Call {PHONE_DISPLAY}
            </a>
          </Button>
          <Button asChild variant="onDark" size="xl">
            <a href="#request">
              Request service <ArrowRight aria-hidden="true" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
