import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { banditVariants, experimentId } from "./bandit.constants";
import { recordBanditConversion } from "./bandit.functions";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  phone: z.string().trim().min(4, "Phone is required").max(40),
  suburb: z.string().trim().max(100).optional().default(""),
  service: z.string().trim().min(1).max(100),
  details: z.string().trim().max(2000).optional().default(""),
  visitorId: z.string().min(16).max(100),
  variant: z.enum(banditVariants),
});

const formSubmitRecipient = "samuelhowell247@gmail.com";
const formSubmitEndpoint = `https://formsubmit.co/ajax/${formSubmitRecipient}`;

export const sendContactRequest = createServerFn({ method: "POST" })
  .validator((input) => contactSchema.parse(input))
  .handler(async ({ data }) => {
    const body = new URLSearchParams({
      name: data.name,
      phone: data.phone,
      suburb: data.suburb,
      service: data.service,
      details: data.details,
      _subject: `New service request - ${data.service}`,
      _template: "table",
      _captcha: "false",
    });

    const res = await fetch(formSubmitEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body,
    });

    if (!res.ok) {
      throw new Error(`FormSubmit responded with ${res.status}`);
    }

    const json = (await res.json()) as { success?: boolean };
    if (json.success !== false) {
      await recordBanditConversion({
        data: { visitorId: data.visitorId, experimentId },
      });
    }
    return { success: json.success !== false };
  });
