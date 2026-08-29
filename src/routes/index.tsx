import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Clock, MapPin, Phone, ReceiptText, ShieldCheck, Star } from "lucide-react";

import { AreaRegister } from "@/components/area-register";
import { ClosingCta } from "@/components/closing-cta";
import { ProcessRail } from "@/components/process-rail";
import { RequestForm } from "@/components/request-form";
import { Reviews } from "@/components/reviews";
import { ServiceIndex } from "@/components/service-index";
import { TypographyH1, TypographyP } from "@/components/typography";
import { WorkEvidence } from "@/components/work-evidence";
import { Button } from "@/components/ui/button";
import { experimentId, type BanditVariant } from "@/lib/bandit.constants";
import {
  getBanditAssignment,
  recordBanditConversion,
} from "@/lib/bandit.functions";
import {
  PHONE_DISPLAY,
  PHONE_LINK,
  gallery,
  serviceOptions,
  type ServiceName,
} from "@/lib/site-content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Papatoetoe Plumber | Plumbing, Hot Water & Gas",
      },
      {
        name: "description",
        content:
          "Papatoetoe plumbing, hot water, gas and bathroom work across South Auckland. Call for 24/7 emergency help or request a callback from a qualified local plumber.",
      },
      {
        property: "og:title",
        content: "Papatoetoe Plumbing & Gas | Plumbing, Hot Water & Gas",
      },
      {
        property: "og:description",
        content:
          "Local plumbing, hot water, gas and bathroom work across Papatoetoe and South Auckland, with 24/7 emergency help when you need it.",
      },
      { property: "og:image", content: gallery[0].src },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [selectedService, setSelectedService] = useState<ServiceName>(
    serviceOptions[0],
  );
  const [banditVariant, setBanditVariant] = useState<BanditVariant>("control");
  const [visitorId, setVisitorId] = useState("");
  const requestRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storageKey = "papatoetoe-bandit-visitor";
    const existingId = window.localStorage.getItem(storageKey);
    const nextId = existingId ?? crypto.randomUUID();
    if (!existingId) window.localStorage.setItem(storageKey, nextId);
    setVisitorId(nextId);

    void getBanditAssignment({ data: { visitorId: nextId } })
      .then(({ variant }) => setBanditVariant(variant))
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    if (!visitorId) return;
    window.dispatchEvent(
      new CustomEvent("conversion-analytics-ready", {
        detail: {
          experimentId,
          variant: banditVariant,
          visitorId,
        },
      }),
    );
  }, [banditVariant, visitorId]);

  const trackCallClick = () => {
    window.dispatchEvent(
      new CustomEvent("lead-conversion", { detail: { type: "phone_call" } }),
    );
    if (visitorId) {
      void recordBanditConversion({
        data: { visitorId, experimentId },
      }).catch(() => undefined);
    }
  };

  const selectService = (service: ServiceName) => {
    setSelectedService(service);
    requestRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => {
      document.getElementById("request-form-heading")?.focus();
    }, 350);
  };

  return (
    <div id="top" className="min-h-screen bg-background text-foreground">
      <div className="bg-ink text-ink-foreground">
        <div className="mx-auto flex min-h-9 max-w-6xl items-center justify-center gap-2 px-5 py-2 text-center text-xs font-semibold uppercase tracking-wide sm:text-sm">
          <Clock className="size-4 shrink-0 text-accent" aria-hidden="true" />
          <span>
            Papatoetoe plumbing, hot water & gas · 24/7 emergency help · {PHONE_DISPLAY}
          </span>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur">
        <div className="mx-auto flex min-h-[4.5rem] max-w-6xl items-center justify-between gap-4 px-5">
          <a
            href="#top"
            aria-label="Papatoetoe Plumbing and Gas home"
            className="font-display text-lg font-bold uppercase leading-none sm:text-xl"
          >
            Papatoetoe <span className="text-accent-foreground">Plumbing & Gas</span>
          </a>
          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-6 text-sm font-semibold uppercase text-muted-foreground lg:flex"
          >
            <a href="#services" className="nav-link">
              Services
            </a>
            <a href="#reviews" className="nav-link">
              Reviews
            </a>
            <a href="#work" className="nav-link">
              Work
            </a>
            <a href="#areas" className="nav-link">
              Areas
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild variant="call" size="lg">
              <a href={PHONE_LINK} onClick={trackCallClick}>
                <Phone aria-hidden="true" /> Call now
              </a>
            </Button>
            <Button asChild variant="default" size="lg" className="hidden sm:inline-flex">
              <a href="#request">Request service</a>
            </Button>
          </div>
        </div>
      </header>

      <main>
        <section className="hero-surface text-primary-foreground">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:py-16 lg:min-h-[650px] lg:grid-cols-[1.06fr_0.94fr] lg:items-center lg:gap-16">
            <div className="hero-copy">
              <p className="eyebrow text-primary-foreground/75">
                <MapPin className="size-4 text-accent" aria-hidden="true" />
                Papatoetoe & South Auckland plumbing
              </p>
              <TypographyH1 className="mt-5 max-w-3xl text-5xl sm:text-7xl">
                Plumbing, hot water, gas & urgent help.
              </TypographyH1>
              <TypographyP className="mt-5 max-w-2xl text-lg text-primary-foreground/80 sm:text-xl">
                Everyday plumbing, hot water, gas and bathroom work across
                Papatoetoe and South Auckland. If something cannot wait, call for
                24/7 emergency help.
              </TypographyP>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button asChild variant="call" size="xl">
                  <a href={PHONE_LINK} onClick={trackCallClick}>
                    <Phone aria-hidden="true" /> Call now · {PHONE_DISPLAY}
                  </a>
                </Button>
                <Button asChild variant="onDark" size="xl">
                  <a href="#request">Request service</a>
                </Button>
              </div>
              <p className="mt-4 flex max-w-xl items-start gap-2 text-sm leading-6 text-primary-foreground/75">
                <ShieldCheck className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                <span>
                  For burst pipes, overflowing toilets or urgent water shutoffs,
                  call rather than waiting for a callback.
                </span>
              </p>

              <div className="mt-8 grid gap-3 border-t border-primary-foreground/20 pt-5 text-sm sm:grid-cols-3 sm:gap-0">
                <div className="flex items-center gap-2 sm:pr-4">
                  <Star className="size-4 shrink-0 fill-current text-accent" aria-hidden="true" />
                  <span>
                    <strong className="block">5 stars</strong>
                    <span className="text-primary-foreground/65">Google rating</span>
                  </span>
                </div>
                <div className="flex items-center gap-2 border-primary-foreground/20 sm:border-l sm:px-4">
                  <ShieldCheck className="size-4 shrink-0 text-accent" aria-hidden="true" />
                  <span>Qualified & insured</span>
                </div>
                <div className="flex items-center gap-2 border-primary-foreground/20 sm:border-l sm:pl-4">
                  <ReceiptText className="size-4 shrink-0 text-accent" aria-hidden="true" />
                  <span>Clear pricing before work</span>
                </div>
              </div>
            </div>

            <RequestForm
              ref={requestRef}
              visitorId={visitorId}
              banditVariant={banditVariant}
              selectedService={selectedService}
              onServiceChange={setSelectedService}
            />
          </div>
        </section>

        <ProcessRail />
        <Reviews />

        <section className="border-y border-border bg-ink text-ink-foreground">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-3 text-base font-semibold sm:text-lg">
              <Phone className="size-5 text-accent" aria-hidden="true" />
              For burst pipes and urgent water problems, call first.
            </p>
            <Button asChild variant="call" size="lg">
              <a href={PHONE_LINK} onClick={trackCallClick}>
                Call {PHONE_DISPLAY}
              </a>
            </Button>
          </div>
        </section>

        <ServiceIndex
          selectedService={selectedService}
          onSelectService={selectService}
        />
        <WorkEvidence />
        <AreaRegister />
        <ClosingCta onCallClick={trackCallClick} />
      </main>

      <footer className="bg-ink text-ink-foreground">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-xl font-bold uppercase">
              Papatoetoe <span className="text-accent">Plumbing & Gas</span>
            </p>
            <p className="mt-1 text-sm text-ink-foreground/65">
              Plumbing, hot water and gas across Papatoetoe and South Auckland.
            </p>
          </div>
          <a
            href={PHONE_LINK}
            onClick={trackCallClick}
            className="font-display text-2xl font-bold text-accent"
          >
            {PHONE_DISPLAY}
          </a>
        </div>
      </footer>

      <div className="mobile-conversion-dock fixed inset-x-0 bottom-0 z-50 grid grid-cols-[1.12fr_0.88fr] gap-2 border-t border-border bg-card p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] sm:hidden">
        <Button asChild variant="call" size="lg">
          <a href={PHONE_LINK} onClick={trackCallClick}>
            <Phone aria-hidden="true" /> Call now
          </a>
        </Button>
        <Button asChild variant="default" size="lg">
          <a href="#request">Request service</a>
        </Button>
      </div>
    </div>
  );
}
