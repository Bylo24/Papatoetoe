import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  phone: z.string().trim().min(4, "Phone is required").max(40),
  suburb: z.string().trim().max(100).optional().default(""),
  service: z.string().trim().min(1).max(100),
  details: z.string().trim().max(2000).optional().default(""),
});

export const sendContactRequest = createServerFn({ method: "POST" })
  .inputValidator((input) => contactSchema.parse(input))
  .handler(async ({ data }) => {
    // Recipient kept server-side so it's never exposed to the client.
    const to = "samuelhowell247@gmail.com";
    const res = await fetch(
      `https://formsubmit.co/ajax/${encodeURIComponent(to)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          suburb: data.suburb,
          service: data.service,
          details: data.details,
          _subject: `New service request — ${data.service}`,
          _template: "table",
        }),
      },
    );

    if (!res.ok) {
      throw new Error(`FormSubmit responded with ${res.status}`);
    }

    const json = (await res.json()) as { success: boolean };
    return { success: json.success !== false };
  });
