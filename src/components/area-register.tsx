import { MapPin } from "lucide-react";

import { TypographyH2, TypographyH3 } from "@/components/typography";
import { suburbs } from "@/lib/site-content";

const areaColumns = [
  suburbs.slice(0, 6),
  suburbs.slice(6, 12),
  suburbs.slice(12, 18),
  suburbs.slice(18),
];

export function AreaRegister() {
  return (
    <section id="areas" className="scroll-mt-28 bg-background">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <div className="flex items-center gap-3">
          <MapPin className="size-6 text-accent" aria-hidden="true" />
          <p className="eyebrow">Local coverage</p>
        </div>
        <TypographyH2 className="section-title mt-3 max-w-2xl text-4xl sm:text-5xl">
          Papatoetoe and South Auckland
        </TypographyH2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Local plumbing, hot water and gas help across the surrounding suburbs
          listed below.
        </p>

        <div className="mt-10 grid border-y-2 border-foreground lg:grid-cols-[0.8fr_3.2fr]">
          <div className="border-b border-border py-6 lg:border-b-0 lg:border-r lg:pr-8">
            <TypographyH3 className="text-3xl">Areas we cover</TypographyH3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Papatoetoe is home base, with service across the neighbourhoods
              shown here.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4">
            {areaColumns.map((column, index) => (
              <ul
                key={`area-column-${index}`}
                className="area-register-column border-border py-6 pl-4 pr-3 first:pl-0 md:border-l md:pl-5"
              >
                {column.map((suburb) => (
                  <li
                    key={suburb}
                    className="flex items-baseline gap-2 py-1.5 text-sm text-foreground"
                  >
                    <span
                      className="size-1.5 shrink-0 bg-accent"
                      aria-hidden="true"
                    />
                    {suburb}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
