import { TypographyH2 } from "@/components/typography";
import { gallery } from "@/lib/site-content";

export function WorkEvidence() {
  return (
    <section id="work" className="scroll-mt-28 border-y border-border bg-secondary">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <div className="grid gap-5 sm:grid-cols-[0.85fr_1.15fr] sm:items-end sm:gap-10">
          <div>
            <p className="eyebrow">Evidence from completed jobs</p>
            <TypographyH2 className="section-title mt-3 text-4xl sm:text-5xl">
              Recent plumbing work
            </TypographyH2>
          </div>
          <p className="max-w-xl text-muted-foreground">
            Real work from Papatoetoe and South Auckland, shown plainly so you
            can see the standard of the finish.
          </p>
        </div>

        <div className="mt-10 grid items-start gap-8 sm:grid-cols-[1.15fr_0.85fr] sm:gap-10">
          {gallery.map((image, index) => (
            <figure
              key={image.src}
              className={index === 1 ? "sm:mt-20" : undefined}
            >
              <div className="border-4 border-primary bg-primary p-1">
                <img
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[3/4] h-auto w-full object-cover"
                />
              </div>
              <figcaption className="mt-4 border-t-2 border-accent pt-3">
                <span className="font-display text-sm font-bold uppercase tracking-[0.12em] text-accent-foreground">
                  Work {String(index + 1).padStart(2, "0")}
                </span>
                <strong className="mt-1 block text-lg leading-tight text-foreground">
                  {image.caption}
                </strong>
                <span className="mt-1 block text-sm text-muted-foreground">
                  Existing project photograph
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
