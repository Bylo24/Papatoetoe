import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import {
  Phone,
  Clock,
  ShieldCheck,
  Flame,
  Droplets,
  Wrench,
  ShowerHead,
  BadgeCheck,
  MapPin,
  Receipt,
  Send,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Reviews } from "@/components/reviews";
import imgUnnamed11 from "@/assets/unnamed-11.jpeg";
import imgUnnamed6 from "@/assets/unnamed-6.jpeg";

const gallery = [
  { src: imgUnnamed11, alt: "Recent work — job photo 11" },
  { src: imgUnnamed6, alt: "Recent work — job photo 6" },
];

const PHONE = "64 9 8844104";
const TEL = "tel:+6498844104";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Papatoetoe Plumbing & Gas | 24/7 Emergency Plumber Auckland" },
      {
        name: "description",
        content:
          "24/7 emergency plumbing and gas fitting in Papatoetoe and South Auckland. Qualified, insured, local. Call +64 9 8844104 or request service online.",
      },
      {
        property: "og:title",
        content: "Papatoetoe Plumbing & Gas | 24/7 Emergency Plumber",
      },
      {
        property: "og:description",
        content:
          "Urgent leaks, blocked drains, hot water and gas fitting across Papatoetoe. Upfront pricing, 5.0 Google rating.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const jobs = [
  {
    icon: Clock,
    title: "Emergency plumbing",
    text: "Burst pipes and urgent leaks, day or night.",
  },
  {
    icon: Droplets,
    title: "Leak repairs",
    text: "Fast leak detection and permanent fixes.",
  },
  {
    icon: Wrench,
    title: "Blocked drains",
    text: "Cleared with jetting and camera inspection.",
  },
  {
    icon: Flame,
    title: "Hot water",
    text: "Cylinders, gas and continuous flow systems.",
  },
  {
    icon: BadgeCheck,
    title: "Gas fitting",
    text: "Certified gas installs, servicing and checks.",
  },
  {
    icon: ShowerHead,
    title: "Bathrooms & fixtures",
    text: "Taps, toilets, showers and renovations.",
  },
];

const suburbs = [
  "Albany",
  "Bayview",
  "Beach Haven",
  "Belmont",
  "Birkdale",
  "Birkenhead",
  "Browns Bay",
  "Campbells Bay",
  "Castor Bay",
  "Devonport",
  "Forrest Hill",
  "Glenfield",
  "Greenhithe",
  "Hauraki",
  "Hillcrest",
  "Long Bay",
  "Mairangi Bay",
  "Milford",
  "Northcote",
  "Northcross",
  "Pinehill",
  "Rothesay Bay",
  "Rosedale",
  "Sunnynook",
  "Takapuna",
  "Torbay",
  "Totara Vale",
  "Unsworth Heights",
  "Wairau Valley",
  "Windsor Park",
];

const serviceOptions = [
  "Emergency plumbing",
  "Leak repairs",
  "Blocked drains",
  "Hot water",
  "Gas fitting",
  "Bathrooms & fixtures",
  "Other (describe if not listed)",
];


function Index() {
  const [service, setService] = useState(serviceOptions[0]);
  const [sending, setSending] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setSending(true);
    try {
      const to = "samuelhowell247@gmail.com";
      const postData = new FormData();
      postData.append("name", String(fd.get("name") ?? ""));
      postData.append("phone", String(fd.get("phone") ?? ""));
      postData.append("suburb", String(fd.get("suburb") ?? ""));
      postData.append("service", String(fd.get("service") ?? ""));
      postData.append("details", String(fd.get("details") ?? ""));
      postData.append(
        "_subject",
        `New service request — ${String(fd.get("service") ?? "")}`,
      );
      postData.append("_template", "table");
      postData.append("_captcha", "false");

      const res = await fetch(
        `https://formsubmit.co/ajax/${encodeURIComponent(to)}`,
        {
          method: "POST",
          body: postData,
        },
      );

      if (!res.ok) {
        throw new Error(`FormSubmit responded with ${res.status}`);
      }

      const json = (await res.json()) as { success?: boolean };
      if (json.success === false) throw new Error("FormSubmit failure");

      toast.success("Request sent — we'll call you back shortly.", {
        description: `For anything urgent, call ${PHONE}.`,
      });
      form.reset();
      setService(serviceOptions[0]);
    } catch (err) {
      toast.error("Sorry, that didn't go through.", {
        description: `Please call ${PHONE} instead.`,
      });
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Top bar */}
      <div className="bg-ink text-ink-foreground">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 px-5 py-2 text-center text-xs font-semibold uppercase tracking-widest sm:text-sm">
          <Clock className="size-4 text-accent" />
          24/7 emergency plumbing in Papatoetoe · {PHONE}
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
          <a
            href="#top"
            className="font-display text-lg font-bold uppercase leading-tight sm:text-xl"
          >
            Papatoetoe<span className="text-accent"> Plumbing & Gas</span>
          </a>
          <div className="flex items-center gap-2">
            <Button asChild variant="call" size="lg">
              <a href={TEL}>
                <Phone /> Call
              </a>
            </Button>
            <Button
              asChild
              variant="default"
              size="lg"
              className="hidden sm:inline-flex"
            >
              <a href="#request">Request service</a>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="hero-surface text-primary-foreground">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:py-20 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest">
              <ShieldCheck className="size-4 text-accent" /> Qualified, insured,
              local
            </p>
            <h1 className="mt-5 text-4xl font-bold uppercase leading-[0.95] sm:text-6xl">
              Need a plumber in Papatoetoe?
            </h1>
            <p className="mt-5 max-w-xl text-lg text-primary-foreground/80">
              Call now for urgent help, or send a quick request and we will get
              back to you.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild variant="call" size="xl">
                <a href={TEL}>
                  <Phone /> Call {PHONE}
                </a>
              </Button>
              <Button asChild variant="onDark" size="xl">
                <a href="#request">Request online</a>
              </Button>
            </div>
            <dl className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                { icon: Clock, label: "24/7 emergencies" },
                { icon: Receipt, label: "Upfront pricing" },
                { icon: Flame, label: "Plumbing & gas" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 rounded-lg border border-primary-foreground/15 bg-primary-foreground/5 px-4 py-3"
                >
                  <item.icon className="size-5 text-accent" />
                  <dt className="text-sm font-semibold uppercase tracking-wide">
                    {item.label}
                  </dt>
                </div>
              ))}
            </dl>
            
          </div>

          {/* Quick request form */}
          <div id="request" className="scroll-mt-24">
            <form
              onSubmit={onSubmit}
              className="rounded-2xl bg-card p-6 text-card-foreground shadow-lift sm:p-7"
            >
              <h2 className="text-2xl font-bold uppercase">Quick request</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Leave your details and we will call you back.
              </p>

              <div className="mt-5 grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" required autoComplete="name" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      autoComplete="tel"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="suburb">Suburb</Label>
                    <Input
                      id="suburb"
                      name="suburb"
                      placeholder="e.g. Takapuna"
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="service">What do you need?</Label>
                  <select
                    id="service"
                    name="service"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="h-10 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    {serviceOptions.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="details">Details</Label>
                  <Textarea
                    id="details"
                    name="details"
                    rows={3}
                    placeholder="e.g. Leak in outdoor tap"
                  />
                </div>
                <Button
                  type="submit"
                  variant="call"
                  size="xl"
                  className="w-full"
                  disabled={sending}
                >
                  <Send /> {sending ? "Sending…" : "Send request"}
                </Button>
                <p className="text-center text-sm text-muted-foreground">
                  For emergencies, call instead:{" "}
                  <a
                    href={TEL}
                    className="font-semibold text-primary underline underline-offset-4"
                  >
                    {PHONE}
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      <Reviews />

      {/* Common jobs */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="text-3xl font-bold uppercase sm:text-4xl">
            Common jobs
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <div
                key={job.title}
                className="rounded-xl border border-border bg-card p-6 shadow-card transition-shadow hover:shadow-lift"
              >
                <span className="flex size-11 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  <job.icon className="size-5" />
                </span>
                <h3 className="mt-4 text-xl font-bold uppercase">
                  {job.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{job.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent work removed */}

      {/* Recent work */}
      <section className="border-y border-border bg-secondary py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="text-3xl font-bold uppercase sm:text-4xl">
            Recent work
          </h2>
          <p className="mt-2 text-muted-foreground">Real jobs completed across Papatoetoe.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {gallery.map((img) => (
              <img
                key={img.src}
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="h-64 w-full rounded-xl object-cover shadow-card"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Service areas */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="flex items-center gap-3 text-3xl font-bold uppercase sm:text-4xl">
            <MapPin className="size-7 text-accent" /> Service areas
          </h2>
          <ul className="mt-7 flex flex-wrap gap-2">
            {suburbs.map((s) => (
              <li
                key={s}
                className="rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Final CTA */}
      <section className="hero-surface py-14 text-primary-foreground">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-5 text-center">
          <h2 className="text-3xl font-bold uppercase sm:text-4xl">
            Water where it shouldn't be? Call us now.
          </h2>
          <Button asChild variant="call" size="xl">
            <a href={TEL}>
              <Phone /> Call {PHONE}
            </a>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-ink py-10 text-ink-foreground">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <div>
            <p className="font-display text-lg font-bold uppercase">
              Papatoetoe Plumbing & Gas
            </p>
            <p className="text-sm text-ink-foreground/70">
              24/7 emergency plumbing.
            </p>
          </div>
          <a href={TEL} className="text-xl font-bold text-accent">
            {PHONE}
          </a>
        </div>
      </footer>

      {/* Mobile sticky call bar */}
      <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 gap-2 border-t border-border bg-card p-3 sm:hidden">
        <Button asChild variant="call" size="lg">
          <a href={TEL}>
            <Phone /> Call now
          </a>
        </Button>
        <Button asChild variant="default" size="lg">
          <a href="#request">Request</a>
        </Button>
      </div>
      <div className="h-16 sm:hidden" />
    </div>
  );
}
