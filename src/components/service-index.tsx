import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  TypographyH2,
  TypographyH3,
  TypographyP,
} from "@/components/typography";
import { services, type ServiceName } from "@/lib/site-content";

export function ServiceIndex({
  selectedService,
  onSelectService,
}: {
  selectedService: ServiceName;
  onSelectService: (service: ServiceName) => void;
}) {
  return (
    <section id="services" className="scroll-mt-28 bg-background">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">Plumbing and gas services</p>
            <TypographyH2 className="section-title mt-3 text-4xl sm:text-5xl">
              What do you need help with?
            </TypographyH2>
          </div>
          <TypographyP className="max-w-md text-muted-foreground">
            Choose a service to prefill the request form. The list uses the same
            job language you&apos;ll see when you contact us.
          </TypographyP>
        </div>

        <div className="mt-10 grid border-t border-foreground lg:grid-cols-2 lg:gap-x-10">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isSelected = selectedService === service.name;
            return (
              <Button
                key={service.name}
                type="button"
                variant="ghost"
                aria-pressed={isSelected}
                aria-label={`Select ${service.name} for your request`}
                onClick={() => onSelectService(service.name)}
                className={`service-index-row group h-auto min-h-28 w-full justify-start gap-4 whitespace-normal rounded-none border-b border-l-4 border-border border-l-transparent px-4 py-5 text-left hover:bg-secondary/60 focus-visible:bg-secondary/60 sm:px-5 ${
                  isSelected ? "border-l-accent bg-secondary/70" : ""
                }`}
              >
                <span className="w-8 shrink-0 font-display text-xl font-bold text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <Icon
                  className="size-5 shrink-0 text-primary"
                  aria-hidden="true"
                />
                <span className="min-w-0 flex-1">
                  <TypographyH3 className="text-2xl">
                    {service.name}
                  </TypographyH3>
                  <span className="mt-2 block text-sm leading-6 text-muted-foreground">
                    {service.text}
                  </span>
                </span>
                <ArrowRight
                  className="mr-0.5 size-5 shrink-0 text-accent opacity-40 transition-transform group-hover:translate-x-1 group-hover:opacity-100 group-focus-visible:translate-x-1 group-focus-visible:opacity-100 sm:mr-1"
                  aria-hidden="true"
                />
              </Button>
            );
          })}
        </div>

        <p className="mt-5 text-sm text-muted-foreground">
          Not listed?{" "}
          <Button
            asChild
            variant="link"
            size="sm"
            className="h-auto px-0 py-0 font-bold text-primary"
          >
            <a
              href="#request"
              onClick={(event) => {
                event.preventDefault();
                onSelectService("Other (describe if not listed)");
              }}
            >
              Choose &quot;Other (describe if not listed)&quot; in the request
              form.
            </a>
          </Button>
        </p>
      </div>
    </section>
  );
}
