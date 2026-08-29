import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, LoaderCircle, Send, ShieldCheck } from "lucide-react";
import { useForm } from "react-hook-form";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { experimentId, type BanditVariant } from "@/lib/bandit.constants";
import { recordBanditConversion } from "@/lib/bandit.functions";
import {
  contactFormSchema,
  type ContactFormValues,
} from "@/lib/contact.schema";
import {
  PHONE_DISPLAY,
  PHONE_LINK,
  serviceOptions,
  type ServiceName,
} from "@/lib/site-content";
import { cn } from "@/lib/utils";

export type RequestStatus = "idle" | "sending" | "success" | "error";

type RequestFormProps = {
  visitorId: string;
  banditVariant: BanditVariant;
  selectedService: ServiceName;
  onServiceChange: (service: ServiceName) => void;
  className?: string;
};

const defaultValues: ContactFormValues = {
  name: "",
  phone: "",
  suburb: "",
  service: serviceOptions[0],
  details: "",
};

const formSubmitEndpoint =
  "https://formsubmit.co/ajax/samuelhowell247@gmail.com";

export const RequestForm = React.forwardRef<HTMLDivElement, RequestFormProps>(
  (
    { visitorId, banditVariant, selectedService, onServiceChange, className },
    ref,
  ) => {
    const [status, setStatus] = React.useState<RequestStatus>("idle");
    const form = useForm<ContactFormValues>({
      resolver: zodResolver(contactFormSchema),
      defaultValues,
      mode: "onBlur",
    });

    React.useEffect(() => {
      if (form.getValues("service") !== selectedService) {
        form.setValue("service", selectedService, {
          shouldDirty: false,
          shouldValidate: false,
        });
      }
    }, [form, selectedService]);

    const onSubmit = async (values: ContactFormValues) => {
      setStatus("sending");
      try {
        const response = await fetch(formSubmitEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: values.name,
            phone: values.phone,
            suburb: values.suburb,
            service: values.service,
            details: values.details,
            _subject: `New service request - ${values.service}`,
            _template: "table",
            _captcha: "false",
          }),
        });

        if (!response.ok) {
          throw new Error(`FormSubmit responded with ${response.status}`);
        }

        const result = (await response.json()) as {
          success?: boolean | string;
          message?: string;
        };

        if (result.success === false || result.success === "false") {
          throw new Error(result.message ?? "Contact request was not accepted");
        }

        if (visitorId) {
          void recordBanditConversion({
            data: { visitorId, experimentId },
          }).catch((error) => {
            console.error(error);
          });
        }

        window.dispatchEvent(
          new CustomEvent("lead-conversion", {
            detail: { type: "form_submit", variant: banditVariant },
          }),
        );
        form.reset({ ...defaultValues, service: values.service });
        onServiceChange(values.service);
        setStatus("success");
      } catch (error) {
        console.error(error);
        setStatus("error");
      }
    };

    return (
      <div ref={ref} id="request" className={cn("scroll-mt-28", className)}>
        <div className="request-docket overflow-hidden rounded-xl bg-card text-card-foreground shadow-lift">
          <div className="bg-ink px-5 py-5 text-ink-foreground sm:px-7 sm:py-6">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">
              Request service
            </p>
            <div className="mt-2 flex items-end justify-between gap-4">
              <h2
                id="request-form-heading"
                tabIndex={-1}
                className="font-display text-3xl font-bold uppercase leading-none outline-hidden focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
              >
                Prefer a callback?
              </h2>
              <span className="hidden text-right text-sm text-ink-foreground/70 sm:block">
                We&apos;ll call you back.
              </span>
            </div>
            <p className="mt-2 text-sm text-ink-foreground/70">
              Leave your number and a short description. We&apos;ll confirm the
              details by phone.
            </p>
          </div>

          <div className="px-5 py-5 sm:px-7 sm:py-6">
            <Form {...form}>
              <form
                id="request-form"
                noValidate
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid gap-4"
              >
                <FormField
                  control={form.control}
                  name="service"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What do you need?</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={(value) => {
                          const service = value as ServiceName;
                          field.onChange(service);
                          onServiceChange(service);
                          setStatus("idle");
                        }}
                      >
                        <FormControl>
                          <SelectTrigger className="h-12 bg-background">
                            <SelectValue placeholder="Choose a service" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {serviceOptions.map((service) => (
                            <SelectItem key={service} value={service}>
                              {service}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            autoComplete="name"
                            placeholder="Your name"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="tel"
                            inputMode="tel"
                            autoComplete="tel"
                            placeholder="e.g. 021 123 4567"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="suburb"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Suburb{" "}
                        <span className="text-muted-foreground">
                          (optional)
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          autoComplete="address-level2"
                          placeholder="e.g. Papatoetoe"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="details"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Details{" "}
                        <span className="text-muted-foreground">
                          (optional)
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          rows={3}
                          placeholder="e.g. Leaking tap, no hot water, bathroom repair"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  variant="call"
                  size="xl"
                  className="mt-1 w-full"
                  disabled={status === "sending"}
                  aria-busy={status === "sending"}
                >
                  {status === "sending" ? (
                    <LoaderCircle className="animate-spin" aria-hidden="true" />
                  ) : (
                    <Send aria-hidden="true" />
                  )}
                  {status === "sending" ? "Sending request…" : "Send request"}
                </Button>

                {status === "success" ? (
                  <Alert className="border-accent/40 bg-accent/10 text-foreground">
                    <CheckCircle2
                      className="text-accent-foreground"
                      aria-hidden="true"
                    />
                    <AlertDescription>
                      Request sent. We&apos;ll call you back shortly. For urgent
                      problems, call{" "}
                      <a
                        href={PHONE_LINK}
                        className="font-bold text-primary underline underline-offset-4"
                      >
                        {PHONE_DISPLAY}
                      </a>
                      .
                    </AlertDescription>
                  </Alert>
                ) : null}

                {status === "error" ? (
                  <Alert variant="destructive">
                    <ShieldCheck aria-hidden="true" />
                    <AlertDescription>
                      Your request wasn&apos;t sent. Please call{" "}
                      <a
                        href={PHONE_LINK}
                        className="font-bold underline underline-offset-4"
                      >
                        {PHONE_DISPLAY}
                      </a>
                      . Your entered details are still here.
                    </AlertDescription>
                  </Alert>
                ) : null}

                <p className="text-center text-xs leading-5 text-muted-foreground">
                  Your details are used only to respond to this service request.
                </p>
                <p className="text-center text-sm text-muted-foreground">
                  For urgent problems, call instead:{" "}
                  <a
                    href={PHONE_LINK}
                    className="font-bold text-primary underline underline-offset-4"
                  >
                    {PHONE_DISPLAY}
                  </a>
                </p>
              </form>
            </Form>
          </div>
        </div>
      </div>
    );
  },
);

RequestForm.displayName = "RequestForm";
