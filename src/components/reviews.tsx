import * as React from "react";
import { ChevronDown, ChevronUp, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { TypographyH2, TypographyH3 } from "@/components/typography";
import { reviewCount, reviews, type Review } from "@/lib/site-content";

function Stars({ className }: { className?: string }) {
  return (
    <span
      className={`inline-flex gap-1 text-accent ${className ?? ""}`}
      aria-label="5 out of 5 stars"
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className="size-4 fill-current"
          aria-hidden="true"
        />
      ))}
    </span>
  );
}

function ReviewMeta({ review }: { review: Review }) {
  return (
    <div className="mt-5 border-t border-border pt-4">
      <p className="font-semibold text-foreground">{review.name}</p>
      <p className="text-sm text-muted-foreground">
        {review.location} · {review.when}
      </p>
      {review.meta ? (
        <p className="mt-1 text-sm font-semibold text-primary">{review.meta}</p>
      ) : null}
    </div>
  );
}

function ReviewQuote({
  review,
  featured = false,
}: {
  review: Review;
  featured?: boolean;
}) {
  return (
    <article className={featured ? "review-ledger__featured" : "review-ledger__supporting"}>
      <Stars />
      <blockquote
        className={
          featured
            ? "mt-4 text-2xl leading-tight text-foreground sm:text-3xl"
            : "mt-4 text-lg leading-7 text-foreground"
        }
      >
        “{review.text}”
      </blockquote>
      <ReviewMeta review={review} />
    </article>
  );
}

export function Reviews() {
  const [showMore, setShowMore] = React.useState(false);
  const featured = reviews[0];
  const supporting = [reviews[1], reviews[3]];
  const remaining = reviews.slice(3);

  if (!featured) return null;

  return (
    <section id="reviews" className="scroll-mt-28 border-b border-border bg-secondary">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <div className="flex flex-col gap-7 border-b border-border pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <p className="eyebrow">Recent local customers</p>
            <TypographyH2 className="section-title mt-3 text-4xl sm:text-5xl">
              5-star service from local customers.
            </TypographyH2>
          </div>
          <div className="border-l-2 border-accent pl-4 sm:min-w-48">
            <p className="font-display text-4xl font-bold leading-none text-primary">
              5.0
            </p>
            <Stars className="mt-2" />
            <p className="mt-1 text-sm font-semibold text-foreground">
              on Google · {reviewCount} reviews
            </p>
          </div>
        </div>

        <div className="review-ledger mt-8 grid gap-8 lg:grid-cols-[1.4fr_0.8fr] lg:gap-12">
          <ReviewQuote review={featured} featured />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1">
            {supporting.map((review) =>
              review ? <ReviewQuote key={review.name} review={review} /> : null,
            )}
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-5">
          <Button
            type="button"
            variant="link"
            className="h-auto px-0 py-0 text-primary"
            aria-expanded={showMore}
            aria-controls="additional-reviews"
            onClick={() => setShowMore((current) => !current)}
          >
            {showMore ? "Hide additional reviews" : "See more customer reviews"}
            {showMore ? <ChevronUp aria-hidden="true" /> : <ChevronDown aria-hidden="true" />}
          </Button>
          <span className="ml-4 text-sm text-muted-foreground">
            Selected reviews are shown above; open the rest when you want more detail.
          </span>
        </div>

        {showMore ? (
          <div
            id="additional-reviews"
            className="mt-8 grid gap-x-8 gap-y-8 border-t border-border pt-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {remaining.map((review) => (
              <article key={review.name} className="border-l-2 border-border pl-4">
                <Stars />
                <TypographyH3 className="mt-3 text-xl">
                  {review.name}
                </TypographyH3>
                <blockquote className="mt-2 text-sm leading-6 text-foreground">
                  “{review.text}”
                </blockquote>
                <p className="mt-3 text-xs text-muted-foreground">
                  {review.location} · {review.when}
                  {review.meta ? ` · ${review.meta}` : ""}
                </p>
              </article>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
