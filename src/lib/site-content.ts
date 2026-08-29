import {
  BadgeCheck,
  Clock,
  Droplets,
  Flame,
  ShowerHead,
  Wrench,
  type LucideIcon,
} from "lucide-react";

import imgUnnamed11 from "@/assets/unnamed-11.jpeg";
import imgUnnamed6 from "@/assets/unnamed-6.jpeg";

export const PHONE_DISPLAY = "64 9 8844104";
export const PHONE_LINK = "tel:+6498844104";

export const serviceOptions = [
  "Leak repairs",
  "Blocked drains",
  "Hot water",
  "Bathrooms & fixtures",
  "Gas fitting",
  "Emergency plumbing",
  "Other (describe if not listed)",
] as const;

export type ServiceName = (typeof serviceOptions)[number];

export type Service = {
  name: ServiceName;
  text: string;
  icon: LucideIcon;
};

export const services: Service[] = [
  {
    name: "Leak repairs",
    text: "Leak tracing, pipe repairs, mixer leaks and tidy permanent fixes before damage spreads.",
    icon: Droplets,
  },
  {
    name: "Blocked drains",
    text: "Kitchen, bathroom and stormwater blockages cleared with practical diagnosis and no guesswork.",
    icon: Wrench,
  },
  {
    name: "Hot water",
    text: "No hot water, leaking cylinders, gas systems and continuous-flow upgrades.",
    icon: Flame,
  },
  {
    name: "Bathrooms & fixtures",
    text: "Tapware, toilets, showers, vanities, laundry plumbing and bathroom renovation fit-offs.",
    icon: ShowerHead,
  },
  {
    name: "Gas fitting",
    text: "Certified gas installs, servicing, safety checks, cooktops and appliance connections.",
    icon: BadgeCheck,
  },
  {
    name: "Emergency plumbing",
    text: "Burst pipes, overflowing toilets, ceiling leaks and urgent water shutoffs, day or night.",
    icon: Clock,
  },
];

export type Review = {
  name: string;
  location: string;
  when: string;
  text: string;
  meta?: string;
};

export const reviews: Review[] = [
  {
    name: "Cesar Gil",
    location: "Papatoetoe",
    when: "3 days ago",
    text: "Outstanding service from Papatoetoe Plumbing & Gas. From the first contact they were responsive, professional and very clear about pricing. The plumber arrived on time, diagnosed the issue quickly and completed the job to a very high standard. Everything was left clean and tidy, with great attention to detail. Fair price, excellent workmanship and great communication. Highly recommend - 5 stars!",
    meta: "Outdoor plumbing system repair",
  },
  {
    name: "Oliver Compton",
    location: "South Auckland",
    when: "4 days ago",
    text: "Did a fantastic job fixing up a leak underneath our floor. Arrived on time and job was done to a high standard - good price too! Cheers mate.",
    meta: "Great price · $200–400",
  },
  {
    name: "Josh Murphy",
    location: "South Auckland",
    when: "1 week ago",
    text: "Done a great job installing a new shower and piping in our newly renovated bathroom. Was fast and done very professional. Friendly, kind and all over nice to deal with. 10 out of 10 recommend.",
    meta: "Shower installation",
  },
  {
    name: "Gary Mcentee",
    location: "Papatoetoe",
    when: "1 week ago",
    text: "Super duper guy to deal with. On time. No mess left. Very mannerly and his price was on fleck too. Highly recommend Sam.",
  },
  {
    name: "Priyank Patel",
    location: "South Auckland",
    when: "1 week ago",
    text: "Excellent service from Papatoetoe Plumbing and Gas. They were prompt, professional, and completed the job to a high standard. Highly recommended!",
    meta: "Great price",
  },
  {
    name: "Frasers Mowing",
    location: "Papatoetoe",
    when: "1 week ago",
    text: "Fantastic service from Papatoetoe Plumbing & Gas! Professional, reliable and friendly from start to finish. The work was completed to a high standard, with great communication and attention to detail. Excellent workmanship and a great local team!",
  },
  {
    name: "Perez Matenga",
    location: "Papatoetoe",
    when: "1 week ago",
    text: "Great customer service and value for money. Have his contact saved for future need. Thank you.",
    meta: "Toilet repair, hot water, drain cleaning and more",
  },
  {
    name: "Lachie Parkers",
    location: "South Auckland",
    when: "2 weeks ago",
    text: "Papatoetoe Plumbing & Gas sorted out my job quickly and did solid, tidy work. They were easy to deal with, turned up on time, and the whole process felt straightforward and professional.",
    meta: "Toilet repair",
  },
  {
    name: "Damith Herath",
    location: "South Auckland",
    when: "2 weeks ago",
    text: "Highly recommend! Had my hot water cylinder replaced and couldn’t be happier with the service. Great communication, punctual, and reasonably priced. Really easy to deal with from start to finish.",
    meta: "Water heater installation",
  },
];

export const reviewCount = reviews.length;

export const gallery = [
  {
    src: imgUnnamed11,
    alt: "Completed Papatoetoe plumbing repair with tidy pipework",
    width: 480,
    height: 640,
    caption: "Completed Papatoetoe plumbing repair with tidy pipework",
  },
  {
    src: imgUnnamed6,
    alt: "Before and after plumbing project photo in South Auckland",
    width: 765,
    height: 1020,
    caption: "Before and after plumbing project photo in South Auckland",
  },
] as const;

export const suburbs = [
  "Papatoetoe",
  "Manukau",
  "Mangere",
  "Mangere East",
  "Otara",
  "Flat Bush",
  "East Tamaki",
  "Otahuhu",
  "Favona",
  "Wiri",
  "Takanini",
  "Papakura",
  "Manurewa",
  "Clendon Park",
  "Randwick Park",
  "Goodwood Heights",
  "Hillpark",
  "The Gardens",
  "Airport Oaks",
  "Auckland Airport",
  "Clover Park",
  "Totara Heights",
  "Puhinui",
  "Middlemore",
] as const;
