import { ClipboardCheck, PhoneCall, ReceiptText } from "lucide-react";

import { TypographyH2, TypographyH3, TypographyP } from "@/components/typography";

const steps = [
  {
    number: "01",
    icon: PhoneCall,
    title: "Call or send a request",
    text: "Call for urgent problems, or leave your number and a short description if you prefer a callback.",
  },
  {
    number: "02",
    icon: ClipboardCheck,
    title: "We confirm the job details",
    text: "We confirm what needs attention and the practical next step for your plumbing or gas job.",
  },
  {
    number: "03",
    icon: ReceiptText,
    title: "Clear advice before work starts",
    text: "You get clear advice and pricing before work starts, with tidy repairs as the goal.",
  },
] as const;

export function ProcessRail() {
  return (
    <section className="border-y border-border bg-secondary">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
        <div className="max-w-2xl">
          <p className="eyebrow">Before work starts</p>
          <TypographyH2 className="section-title mt-3 text-4xl sm:text-5xl">
            What happens after you contact us
          </TypographyH2>
        </div>

        <div className="process-rail mt-10 grid gap-0 lg:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="process-rail__item relative grid grid-cols-[auto_1fr] gap-4 border-border py-5 first:pt-0 last:pb-0 lg:min-h-32 lg:px-7 lg:py-0 lg:first:pl-0 lg:last:pr-0 lg:[&+div]:border-l"
              >
                <span className="font-display text-4xl font-bold leading-none text-accent">
                  {step.number}
                </span>
                <div>
                  <Icon
                    className="mb-3 size-5 text-primary"
                    aria-hidden="true"
                  />
                  <TypographyH3 className="text-2xl">
                    {step.title}
                  </TypographyH3>
                  <TypographyP className="mt-2 text-sm leading-6 text-muted-foreground">
                    {step.text}
                  </TypographyP>
                </div>
                {index < steps.length - 1 ? (
                  <span
                    className="absolute -bottom-px left-0 right-0 h-px bg-border lg:bottom-auto lg:left-auto lg:right-0 lg:top-1/2 lg:h-px lg:w-7 lg:translate-x-full"
                    aria-hidden="true"
                  />
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
