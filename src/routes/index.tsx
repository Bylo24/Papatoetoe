import { createFileRoute } from "@tanstack/react-router";
import heroPipes from "@/assets/hero-pipes.jpg";
import { Phone, ShieldCheck, CheckCircle2, ArrowRight, MapPin } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const PHONE_DISPLAY = "64 9 8844104";
const PHONE_HREF = "tel:+6498844104";
const BRAND_NAME = "Papatoetoe Plumbing & Gas";
const FORM_ACTION = "https://formsubmit.co/samuelhowell247@gmail.com";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${BRAND_NAME} — 24/7 Plumbing & Gas` },
      {
        name: "description",
        content:
          "Call Papatoetoe Plumbing & Gas for leaks, blocked drains, hot water, gas fitting, and 24/7 emergency plumbing.",
      },
      { property: "og:title", content: `${BRAND_NAME} — 24/7 Plumbing & Gas` },
      {
        property: "og:description",
        content:
          "Simple booking, upfront pricing, and reliable plumbing and gas fitting across Papatoetoe and South Auckland.",
      },
    ],
    links: [{ rel: "icon", href: "/favicon.svg", type: "image/svg+xml" }],
  }),
  component: Index,
});

const services = [
  "Emergency plumbing",
  "Leak repairs",
  "Blocked drains",
  "Hot water",
  "Gas fitting",
  "Bathrooms & fixtures",
];

const serviceAreas = [
  "Papatoetoe",
  "Old Papatoetoe",
  "Manukau",
  "Manurewa",
  "Otahuhu",
  "Mangere",
  "Mangere East",
  "Otara",
  "Favona",
  "Wiri",
  "Clendon Park",
  "Takanini",
  "Papakura",
  "Flat Bush",
  "East Tamaki",
  "Clover Park",
  "Goodwood Heights",
  "Totara Heights",
  "Randwick Park",
  "Weymouth",
  "Hillpark",
  "The Gardens",
  "Puhinui",
  "Auckland Airport",
];

const testimonials = [
  {
    quote: "Quick, professional, and friendly — fixed our burst pipe in no time.",
    name: "M. Thompson",
    suburb: "Papatoetoe",
  },
  {
    quote: "Upfront pricing and great communication. Highly recommended!",
    name: "A. Patel",
    suburb: "Manukau",
  },
  {
    quote: "Reliable, polite, and fast — sorted our hot water issue.",
    name: "C. Williams",
    suburb: "Mangere East",
  },
  {
    quote: "Friendly and efficient — arrived on time and cleaned up.",
    name: "S. Ng",
    suburb: "Manurewa",
  },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0] || "")
    .slice(0, 2)
    .join("")
    .replace(/[^A-Za-z0-9]/g, "")
    .toUpperCase();
}

function Index() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    suburb: "",
    service: services[0],
  });

  const footerRef = useRef<HTMLElement | null>(null);
  const [showAfterpay, setShowAfterpay] = useState(true);

  useEffect(() => {
    let obs: IntersectionObserver | null = null;
    let retryTimer: number | null = null;

    const createObserver = (el: Element) => {
      obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            setShowAfterpay(!entry.isIntersecting);
          });
        },
        { threshold: 0 },
      );
      obs.observe(el);
    };

    const waitForFooter = () => {
      const el = footerRef.current;
      if (el) {
        createObserver(el);
      } else {
        // Retry a few times until the footer is mounted
        retryTimer = window.setTimeout(waitForFooter, 100);
      }
    };

    waitForFooter();

    return () => {
      if (obs) obs.disconnect();
      if (retryTimer) clearTimeout(retryTimer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background pb-20 text-foreground sm:pb-0">
      <div className="bg-accent text-accent-foreground">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-1.5 px-4 py-2 text-sm font-semibold sm:flex-row sm:items-center sm:px-6">
          <p>24/7 emergency plumbing in Papatoetoe and South Auckland</p>
          <a href={PHONE_HREF} className="inline-flex items-center gap-2 hover:underline">
            <Phone className="size-4" />
            {PHONE_DISPLAY}
          </a>
        </div>
      </div>

      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
          <a
            href="#"
            className="min-w-0 max-w-[13rem] font-display text-sm font-bold uppercase leading-tight sm:max-w-none sm:text-xl"
          >
            {BRAND_NAME}
          </a>

          <div className="flex items-center gap-2">
            <a
              href={PHONE_HREF}
              className="hidden sm:inline-flex items-center justify-center gap-2 border border-border px-4 py-2 rounded-md text-sm font-bold hover:bg-secondary"
            >
              <Phone className="size-4" />
              Call
            </a>
            <a
              href="#request"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-bold text-primary-foreground hover:opacity-90 sm:px-4"
            >
              Request service
            </a>
          </div>
        </div>
      </nav>

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <img
              src={heroPipes}
              alt=""
              className="h-full w-full object-cover opacity-[0.07]"
              width={1280}
              height={960}
            />
          </div>
          <div className="mx-auto grid max-w-6xl items-start gap-8 px-4 pb-12 pt-10 sm:px-6 sm:py-14 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-12 lg:py-16 xl:grid-cols-[minmax(0,1fr)_420px]">
            <div className="max-w-2xl lg:pt-4">
              <div className="mb-5 inline-flex items-center gap-2 rounded-md bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                <ShieldCheck className="size-4" />
                Qualified, insured, local
              </div>
              <h1 className="mb-5 text-balance font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                Need a plumber in Papatoetoe?
              </h1>
              <p className="mb-7 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
                Call now for urgent help, or send a quick request and we will get back to you.
              </p>
              <div className="mb-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href={PHONE_HREF}
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-3.5 text-base font-bold text-primary-foreground shadow-[var(--shadow-elevated)] hover:opacity-90 sm:px-7 sm:py-4 sm:text-lg"
                >
                  <Phone className="size-5" />
                  Call {PHONE_DISPLAY}
                </a>
                <a
                  href="#request"
                  className="inline-flex items-center justify-center gap-2 rounded-md border-2 border-border bg-background px-5 py-3.5 text-base font-bold hover:bg-secondary sm:px-7 sm:py-4 sm:text-lg"
                >
                  Request online <ArrowRight className="size-5" />
                </a>
              </div>

              <div className="grid gap-2.5 text-sm sm:grid-cols-3">
                <span className="inline-flex items-center gap-2 rounded-md border border-border bg-background/80 px-3 py-2 text-muted-foreground">
                  <CheckCircle2 className="size-4 text-primary" />
                  24/7 emergencies
                </span>
                <span className="inline-flex items-center gap-2 rounded-md border border-border bg-background/80 px-3 py-2 text-muted-foreground">
                  <CheckCircle2 className="size-4 text-primary" />
                  Upfront pricing
                </span>
                <span className="inline-flex items-center gap-2 rounded-md border border-border bg-background/80 px-3 py-2 text-muted-foreground">
                  <CheckCircle2 className="size-4 text-primary" />
                  Plumbing & gas
                </span>
              </div>
            </div>

            <div
              id="request"
              className="scroll-mt-24 rounded-md border border-border bg-background p-4 shadow-[var(--shadow-elevated)] sm:p-6"
            >
              <form action={FORM_ACTION} method="POST" className="space-y-3.5">
                <input type="hidden" name="_subject" value="New plumbing request" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />
                <input
                  type="text"
                  name="_honey"
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />
                <div>
                  <h2 className="font-display text-xl font-bold sm:text-2xl">Quick request</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Leave your details and we will call you back.
                  </p>
                </div>
                <label className="block text-sm">
                  <span className="font-semibold mb-1.5 block">Name</span>
                  <input
                    required
                    name="name"
                    autoComplete="name"
                    maxLength={100}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-md border border-border bg-background px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </label>
                <label className="block text-sm">
                  <span className="font-semibold mb-1.5 block">Phone</span>
                  <input
                    required
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    maxLength={30}
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full rounded-md border border-border bg-background px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </label>
                <label className="block text-sm">
                  <span className="font-semibold mb-1.5 block">Suburb</span>
                  <input
                    name="suburb"
                    autoComplete="address-level2"
                    maxLength={200}
                    value={form.suburb}
                    onChange={(e) => setForm({ ...form, suburb: e.target.value })}
                    className="w-full rounded-md border border-border bg-background px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </label>
                <label className="block text-sm">
                  <span className="font-semibold mb-1.5 block">What do you need?</span>
                  <select
                    name="service"
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    className="w-full rounded-md border border-border bg-background px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {services.map((service) => (
                      <option key={service}>{service}</option>
                    ))}
                  </select>
                </label>
                <label className="block text-sm">
                  <span className="font-semibold mb-1.5 block">Other (describe if not listed)</span>
                  <input
                    name="service_other"
                    placeholder="e.g. Leak in outdoor tap"
                    className="w-full rounded-md border border-border bg-background px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </label>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-6 py-3.5 font-bold text-primary-foreground hover:opacity-90"
                >
                  Send request <ArrowRight className="size-4" />
                </button>
                <p className="text-xs text-muted-foreground text-center">
                  For emergencies, call instead:{" "}
                  <a href={PHONE_HREF} className="font-bold text-foreground hover:text-primary">
                    {PHONE_DISPLAY}
                  </a>
                </p>
              </form>
            </div>
          </div>
        </section>

        {/* Desktop / tablet banner */}
        <div
          className={`hidden sm:block fixed bottom-0 left-0 right-0 z-40 ${showAfterpay ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-2 pointer-events-none"} transition-all duration-200 ease-in-out`}
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="flex items-center justify-center gap-3 border-t border-border bg-background/95 py-2.5 shadow-[var(--shadow-card)] backdrop-blur">
              <span className="text-sm font-semibold">We accept</span>
              <img
                src="/Afterpay_logo.svg.png"
                alt="Afterpay"
                className="h-5 w-auto object-contain"
              />
            </div>
          </div>
        </div>

        {/* Mobile banner above the mobile CTA */}
        <div
          className={`sm:hidden fixed left-0 right-0 bottom-16 z-[60] ${showAfterpay ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-2 pointer-events-none"} transition-all duration-200 ease-in-out`}
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="flex items-center justify-center gap-2 rounded-t-md border border-b-0 border-border bg-background/95 py-2 shadow-[var(--shadow-card)] backdrop-blur">
              <span className="text-xs font-semibold">We accept</span>
              <img
                src="/Afterpay_logo.svg.png"
                alt="Afterpay"
                className="h-5 w-auto object-contain"
              />
            </div>
          </div>
        </div>

        <section className="border-t border-border bg-secondary/10">
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
            <div className="mb-5 flex items-end justify-between gap-4">
              <h2 className="font-display text-2xl font-bold">What our customers say</h2>
            </div>
            <div className="flex flex-col items-stretch gap-5 md:grid md:grid-cols-[0.9fr_1.1fr] lg:gap-6">
              <div className="hidden sm:block">
                <img
                  src={heroPipes}
                  alt="Plumbing and gas service in Papatoetoe"
                  className="h-56 w-full rounded-md object-cover object-top shadow-[var(--shadow-elevated)] md:h-[430px] lg:h-[420px]"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-1 lg:h-[420px] lg:auto-rows-fr lg:grid-cols-2">
                {testimonials.map((t) => (
                  <div
                    key={t.name}
                    className="flex flex-col justify-center rounded-md border border-border bg-background p-4 shadow-[var(--shadow-card)]"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-10 w-10 shrink-0 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                        {getInitials(t.name)}
                      </div>
                      <div>
                        <div className="text-sm font-semibold">{t.name}</div>
                        <div className="text-xs text-muted-foreground">{t.suburb}</div>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">“{t.quote}”</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-secondary/40">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[0.75fr_1.25fr]">
            <div>
              <h2 className="font-display text-2xl font-bold mb-4">Common jobs</h2>
              <div className="flex flex-wrap gap-2">
                {services.map((service) => (
                  <a
                    key={service}
                    href="#request"
                    className="rounded-md border border-border bg-background px-3 py-2 text-sm font-semibold hover:border-primary"
                  >
                    {service}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold mb-4">Service areas</h2>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-muted-foreground sm:grid-cols-3">
                {serviceAreas.map((area) => (
                  <span key={area} className="inline-flex items-center gap-2">
                    <MapPin className="size-4 shrink-0 text-primary" />
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer ref={footerRef} className="bg-background">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <div className="font-display font-bold uppercase">{BRAND_NAME}</div>
            <p className="text-muted-foreground">24/7 emergency plumbing.</p>
          </div>
          <a
            href={PHONE_HREF}
            className="inline-flex items-center justify-center gap-2 bg-foreground text-background px-5 py-3 rounded-md font-bold hover:bg-primary"
          >
            <Phone className="size-4" />
            {PHONE_DISPLAY}
          </a>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground">We accept</span>
            <img src="/Afterpay_logo.svg.png" alt="Afterpay" className="h-6" />
          </div>
        </div>
      </footer>
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 p-3 shadow-[var(--shadow-elevated)] backdrop-blur sm:hidden">
        <div className="grid grid-cols-2 gap-2">
          <a
            href={PHONE_HREF}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-3 text-sm font-bold text-primary-foreground"
          >
            <Phone className="size-4" />
            Call now
          </a>
          <a
            href="#request"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-background px-4 py-3 text-sm font-bold"
          >
            Request
          </a>
        </div>
      </div>
    </div>
  );
}
