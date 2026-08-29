import * as React from "react";

import { cn } from "@/lib/utils";

type HeadingProps = React.HTMLAttributes<HTMLHeadingElement>;
type ParagraphProps = React.HTMLAttributes<HTMLParagraphElement>;

export function TypographyH1({ className, ...props }: HeadingProps) {
  return (
    <h1
      className={cn("font-display font-bold uppercase leading-none", className)}
      {...props}
    />
  );
}

export function TypographyH2({ className, ...props }: HeadingProps) {
  return (
    <h2
      className={cn("font-display font-bold uppercase leading-none", className)}
      {...props}
    />
  );
}

export function TypographyH3({ className, ...props }: HeadingProps) {
  return (
    <h3
      className={cn("font-display font-bold uppercase leading-none", className)}
      {...props}
    />
  );
}

export function TypographyP({ className, ...props }: ParagraphProps) {
  return <p className={cn("leading-7", className)} {...props} />;
}
