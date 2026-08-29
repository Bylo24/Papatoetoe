import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { reviewCount } from "@/lib/site-content";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">
          Page not found
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-6">
          <Button asChild>
            <Link to="/">Go home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn&apos;t load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back
          home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <Button
            onClick={() => {
              router.invalidate();
              reset();
            }}
          >
            Try again
          </Button>
          <Button asChild variant="outline">
            <a href="/">Go home</a>
          </Button>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    head: () => ({
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          title: "Papatoetoe Plumber | Plumbing, Hot Water & Gas",
        },
        {
          name: "description",
          content:
            "Papatoetoe plumbing, hot water, gas and bathroom work across South Auckland. Call for 24/7 emergency help or request a callback from a qualified local plumber.",
        },
        { name: "author", content: "Papatoetoe Plumbing & Gas" },
        { property: "og:type", content: "website" },
        { property: "og:locale", content: "en_NZ" },
        { property: "og:url", content: "https://papatoetoeplumbing.co.nz/" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [
        {
          rel: "stylesheet",
          href: appCss,
        },
        { rel: "canonical", href: "https://papatoetoeplumbing.co.nz/" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossOrigin: "anonymous",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700&family=Barlow:wght@400;500;600;700&display=swap",
        },
      ],
    }),

    shellComponent: RootShell,
    component: RootComponent,
    notFoundComponent: NotFoundComponent,
    errorComponent: ErrorComponent,
  },
);

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Plumber",
              "@id": "https://papatoetoeplumbing.co.nz/#business",
              name: "Papatoetoe Plumbing & Gas",
              telephone: "+64 9 8844104",
              areaServed: [
                "Papatoetoe",
                "South Auckland",
                "Manukau",
                "Mangere",
                "Otara",
                "Flat Bush",
                "Manurewa",
                "Papakura",
                "Auckland",
              ],
              description:
                "Plumbing, hot water, gas fitting and bathroom services in Papatoetoe and surrounding Auckland suburbs, with 24/7 emergency help available.",
              openingHours: "Mo-Su 00:00-23:59",
              priceRange: "$$",
              url: "https://papatoetoeplumbing.co.nz",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "5",
                reviewCount,
                bestRating: "5",
                worstRating: "1",
              },
              review: [
                {
                  "@type": "Review",
                  author: { "@type": "Person", name: "Cesar Gil" },
                  reviewRating: { "@type": "Rating", ratingValue: "5" },
                  reviewBody:
                    "Responsive, professional, clear about pricing, arrived on time, and completed the job to a very high standard.",
                },
                {
                  "@type": "Review",
                  author: { "@type": "Person", name: "Oliver Compton" },
                  reviewRating: { "@type": "Rating", ratingValue: "5" },
                  reviewBody:
                    "A leak was fixed underneath the floor, the plumber arrived on time, and the job was completed to a high standard.",
                },
                {
                  "@type": "Review",
                  author: { "@type": "Person", name: "Damith Herath" },
                  reviewRating: { "@type": "Rating", ratingValue: "5" },
                  reviewBody:
                    "A hot water cylinder was replaced with great communication, punctual service, and reasonable pricing.",
                },
              ],
              makesOffer: [
                "Emergency plumbing",
                "Leak repairs",
                "Blocked drains",
                "Hot water",
                "Gas fitting",
                "Bathrooms & fixtures",
              ].map((name) => ({
                "@type": "Offer",
                itemOffered: { "@type": "Service", name },
              })),
            }),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html:
              "window.dataLayer=window.dataLayer||[];window.addEventListener('lead-conversion',function(e){window.dataLayer.push({event:'lead_conversion',detail:e.detail});});window.addEventListener('conversion-analytics-ready',function(e){window.dataLayer.push({event:'ab_test_ready',detail:e.detail});});",
          }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      <Toaster />
    </QueryClientProvider>
  );
}
