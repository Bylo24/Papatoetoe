import { z } from "zod";

import { serviceOptions } from "./site-content";

export const contactFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  phone: z.string().trim().min(4, "Phone is required").max(40),
  suburb: z.string().trim().max(100),
  service: z.enum(serviceOptions),
  details: z.string().trim().max(2000),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
