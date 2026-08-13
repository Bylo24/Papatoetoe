import { Star } from "lucide-react";
import { useEffect } from "react";

type Review = {
  name: string;
  when: string;
  text: string;
  meta?: string;
  reply?: string;
};

const reviews: Review[] = [
  {
    name: "Noela",
    when: "2 weeks ago",
    text: "Highly recommend! The plumber was professional, reliable, and completed the job to a very high standard. Communication was excellent from start to finish, arrived on time, and left everything clean and tidy. The gas installation was completed safely and efficiently.",
    reply: "Thanks for taking the time to leave us a review!",
  },
  {
    name: "Mrs",
    when: "1 week ago",
    text: "Highly recommend the great communication, they were quick to find me a booking and arrived on time. It's rare to see workers clean up their mess properly these days but Papatoetoe Plumbing impressed me! Give them a shot.",
    meta: "Great price · $200–400",
    reply: "Thanks for the review!",
  },
  {
    name: "Logan",
    when: "1 week ago",
    text: "A++ we had the team come out with short notice. Trouble with water supply from our tank as we're rural — turns out there was a leak in the plumbing from the tank to the house. The crew had it sorted in no time. Would definitely recommend 👌",
    meta: "Great price",
    reply: "Thanks for the review! I appreciate it",
  },
  {
    name: "VIRAL",
    when: "2 weeks ago",
    text: "Great service. The plumber was incredibly professional, explained the problem clearly, and did an excellent job. I really appreciated how tidy they were — fantastic experience!",
    meta: "Great price · Plumbing leak detection",
    reply: "We appreciate your wonderful review. Thanks for choosing us!",
  },
  {
    name: "Nikora",
    when: "2 weeks ago",
    text: "Had to call this guy in to fix someone else's mistakes. I should've just got him in the first place. Would highly recommend 10/10",
    meta: "Great price · Plumbing pipe repair",
    reply: "We truly appreciate your support. Thanks for the great review!",
  },
  {
    name: "Tracey",
    when: "3 weeks ago",
    text: "Fantastic service from start to finish. The team was friendly, professional, and took the time to make sure everything was done to a high standard. Reliable, punctual, and genuinely cared about delivering a great result.",
  },
  {
    name: "reshee",
    when: "1 week ago",
    text: "I had a great experience with Papatoetoe Plumbing & Gas. From the very first call these guys were quick, efficient and communicated really well. Quality of the work was excellent too. Top notch service!",
    reply:
      "Thanks so much for your kind review! We really appreciate your support.",
  },
  {
    name: "Tali",
    when: "1 week ago",
    text: "Highly recommend this plumber 😁🤝 Friendly dude, gets the job done right, no shortcuts. Fast communication and reliable — thanks again, will definitely be using you again.",
    reply: "Thanks for the review and feedback!",
  },
  {
    name: "sejal",
    when: "2 weeks ago",
    text: "Very responsive and a good job done.",
    meta: "Great price",
    reply: "Thanks for the feedback!",
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5 text-accent">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="size-4 fill-current" />
      ))}
    </div>
  );
}

export function Reviews() {
  useEffect(() => {
    const scriptId = "sociablekit-google-reviews";
    if (document.getElementById(scriptId)) return;
    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://widgets.sociablekit.com/google-reviews/widget.js";
    script.defer = true;
    document.body.appendChild(script);
  }, []);
  return (
    <section id="reviews" className="border-y border-border bg-card py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Google reviews
            </p>
            <h2 className="mt-1 text-3xl font-bold uppercase sm:text-4xl">
              What our customers say
            </h2>
          </div>
        </div>

        {/* SociableKit embed */}
        <div className="mt-10">
          <div className="sk-ww-google-reviews" data-embed-id="25705141"></div>
        </div>
      </div>
    </section>
  );
}
