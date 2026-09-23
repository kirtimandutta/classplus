export const BRANDS = [
  { id: "indigo", label: "Indigo", hex: "#4F46E5", soft: "#A5B4FC" },
  { id: "emerald", label: "Emerald", hex: "#059669", soft: "#6EE7B7" },
  { id: "violet", label: "Violet", hex: "#7C3AED", soft: "#C4B5FD" },
  { id: "coral", label: "Coral", hex: "#E11D48", soft: "#FDA4AF" },
] as const;

export type BrandId = (typeof BRANDS)[number]["id"];

export const COURSE_TAGS = [
  { id: "upsc", label: "UPSC", meta: "148 lectures", detail: "Polity · GS" },
  { id: "coding", label: "Coding", meta: "86 projects", detail: "DSA · Apps" },
  { id: "fitness", label: "Fitness", meta: "42 programs", detail: "Strength" },
  { id: "finance", label: "Finance", meta: "31 modules", detail: "Markets" },
  { id: "school", label: "School Tutoring", meta: "120 classes", detail: "Class 8–12" },
  { id: "design", label: "Design", meta: "24 studios", detail: "Portfolio" },
] as const;

export type CourseId = (typeof COURSE_TAGS)[number]["id"];

export const CATEGORIES = [
  "UPSC",
  "Coding",
  "Fitness",
  "Finance",
  "School Tutoring",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const POWERS = [
  {
    id: "app",
    title: "Branded Mobile App & Website",
    line: "White-label Play Store and App Store presence, with a site on your domain.",
    body: "Students install your academy, not a shared marketplace. Your logo, colors, and course library ship as a real store listing.",
    points: [
      "iOS and Android listings under your brand",
      "Custom domain for the course website",
      "No engineering hire to publish an update",
    ],
  },
  {
    id: "stream",
    title: "Encrypted Anti-Piracy Streaming",
    line: "Watermarked playback that discourages recording and file sharing.",
    body: "Lectures stream inside a locked player. Each session can carry the learner name, and downloads stay off unless you allow them.",
    points: [
      "Dynamic on-video watermark",
      "Recording deterrence on supported devices",
      "No open Drive links to forward",
    ],
  },
  {
    id: "live",
    title: "Live Interactive Classes & 1:1 Sessions",
    line: "HD Zoom Pro and Meet Pro sessions with attendance on the same roster.",
    body: "Cohorts and paid mentorship sit next to your course library. Attendance is captured with the class, not in a side spreadsheet.",
    points: [
      "Zoom Pro and Google Meet Pro",
      "Attendance tied to the learner profile",
      "1:1 paid mentorship slots",
    ],
  },
  {
    id: "tests",
    title: "Online Test & Assessment Portal",
    line: "Automated grading, percentile reports, and a mock-test engine.",
    body: "Publish a timed mock, score it as soon as the window closes, and show learners where they stand against the batch.",
    points: [
      "Objective papers graded on submit",
      "Percentile and topic reports",
      "Reusable mock-test templates",
    ],
  },
  {
    id: "whatsapp",
    title: "WhatsApp Marketing Automation",
    line: "Reminders, abandoned-cart nudges, and payment links on WhatsApp.",
    body: "The message lands where your students already reply. Fee chases and class broadcasts leave on a schedule you set once.",
    points: [
      "Class reminders and batch broadcasts",
      "Abandoned checkout nudges",
      "Payment links inside the chat",
    ],
  },
  {
    id: "payouts",
    title: "Instant Direct Payouts",
    line: "Zero-commission options with settlement into your bank account.",
    body: "Fees can settle to you directly. You keep the student relationship and a clear receipt trail for every UPI payment.",
    points: [
      "Direct bank settlement",
      "Zero-commission payout paths",
      "Automated fee receipts",
    ],
  },
  {
    id: "analytics",
    title: "Deep Student Analytics",
    line: "Retention, an active-learner heatmap, and a revenue forecast.",
    body: "See who showed up this week, which course is stalling, and what collections look like before the month closes.",
    points: [
      "Active learner heatmap",
      "Retention by cohort",
      "Revenue forecast from open fees",
    ],
  },
] as const;

export const BILLING_YEARS = [1, 3, 5] as const;
export type BillingYears = (typeof BILLING_YEARS)[number];

const DISCOUNT: Record<BillingYears, number> = {
  1: 0,
  3: 0.2,
  5: 0.35,
};

export function priceFor(yearly: number, years: BillingYears) {
  const discount = DISCOUNT[years];
  const perYear = Math.round(yearly * (1 - discount));
  return {
    discount,
    perYear,
    total: perYear * years,
    monthly: Math.round(perYear / 12),
  };
}

export const PLANS = [
  {
    id: "starter",
    name: "Starter",
    audience: "First cohort, branded and ready to collect fees.",
    yearly: 29999,
    features: [
      { label: "Branded iOS and Android app", included: true },
      { label: "Course website and custom domain", included: true },
      { label: "UPI fee collection and receipts", included: true },
      { label: "Up to 1,000 active learners", included: true },
      { label: "Test portal", included: false },
      { label: "Marketing suite", included: false },
      { label: "Custom UI add-ons", included: false },
    ],
  },
  {
    id: "growth",
    name: "Growth",
    audience: "Live classes, tests, and WhatsApp running together.",
    yearly: 59999,
    popular: true,
    features: [
      { label: "Everything in Starter", included: true },
      { label: "Test portal", included: true },
      { label: "Marketing suite", included: true },
      { label: "Anti-piracy video player", included: true },
      { label: "Live classes and attendance", included: true },
      { label: "Up to 10,000 active learners", included: true },
      { label: "Custom UI add-ons", included: false },
    ],
  },
  {
    id: "pro",
    name: "Pro",
    audience: "Mentorship, custom UI, and a success partner.",
    yearly: 119999,
    features: [
      { label: "Everything in Growth", included: true },
      { label: "Test portal", included: true },
      { label: "Marketing suite", included: true },
      { label: "Custom UI add-ons", included: true },
      { label: "1:1 paid mentorship", included: true },
      { label: "Priority direct payouts", included: true },
      { label: "Unlimited learners", included: true },
    ],
  },
] as const;

export const COMPARE_ROWS = [
  { label: "Test portal", starter: false, growth: true, pro: true },
  { label: "Marketing suite", starter: false, growth: true, pro: true },
  { label: "Custom UI add-ons", starter: false, growth: false, pro: true },
] as const;
