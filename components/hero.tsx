"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowRight, BadgeCheck, Bell, Smartphone, Wallet } from "lucide-react";
import { MagneticButton } from "@/components/magnetic-button";
import { Badge, StoryPill, useReducedMotion } from "@/components/section-heading";
import { useUi } from "@/components/ui-provider";
import { ghostBtn, primaryBtn } from "@/lib/styles";

gsap.registerPlugin(ScrollTrigger);

const RAIL = [
  { id: "01", label: "Dilemma" },
  { id: "02", label: "Your App" },
  { id: "03", label: "Autopilot" },
  { id: "04", label: "Launch" },
];

function stepFromProgress(value: number) {
  if (value < 0.23) return 0;
  if (value < 0.58) return 1;
  if (value < 0.86) return 2;
  return 3;
}

export function Hero() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progress = useMotionValue(0);
  const [step, setStep] = useState(0);
  const [videoReady, setVideoReady] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const { openDemo, openPreview } = useUi();

  useMotionValueEvent(progress, "change", (value) => {
    const next = stepFromProgress(value);
    setStep((current) => (current === next ? current : next));
  });

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video || reduced) return;

    let trigger: ScrollTrigger | undefined;
    let disposed = false;

    const bind = () => {
      if (disposed) return;
      video.pause();
      trigger?.kill();
      trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          progress.set(self.progress);
          const duration = video.duration;
          if (!Number.isFinite(duration) || duration <= 0) return;
          const nextTime =
            self.progress > 0.995 ? duration * self.progress : duration * self.progress;
          if (Math.abs(video.currentTime - nextTime) > 1 / 30) {
            video.currentTime = nextTime;
          }
        },
      });
      ScrollTrigger.refresh();
    };

    const prime = () => {
      video.muted = true;
      const playback = video.play();
      if (!playback) {
        bind();
        return;
      }
      playback
        .then(() => {
          video.pause();
          bind();
        })
        .catch(() => bind());
    };

    const onReady = () => {
      setVideoReady(true);
      prime();
    };

    if (video.readyState >= 1) onReady();
    else video.addEventListener("loadedmetadata", onReady);

    return () => {
      disposed = true;
      video.removeEventListener("loadedmetadata", onReady);
      trigger?.kill();
    };
  }, [progress, reduced]);

  useEffect(() => {
    if (!reduced) return;
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.loop = true;
    void video.play().catch(() => undefined);
  }, [reduced]);

  return (
    <section
      id="top"
      ref={sectionRef}
      className={reduced ? "relative h-screen" : "relative h-[350vh]"}
      aria-label="Scroll-driven product film"
    >
      <h1 className="sr-only">
        Classplus for Creators. Your coaching app, live in minutes.
      </h1>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-obsidian">
        <video
          ref={videoRef}
          className="sticky top-0 h-screen w-full transform-gpu object-cover will-change-transform"
          src="/videos/classplus-creator-banner.mp4"
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          aria-hidden="true"
          onError={() => setVideoError(true)}
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(6,8,15,0.88)_0%,rgba(6,8,15,0.55)_42%,rgba(6,8,15,0.18)_100%),linear-gradient(180deg,rgba(6,8,15,0.55)_0%,transparent_22%,transparent_62%,rgba(6,8,15,0.82)_100%)]" />

        <motion.div
          style={{ scaleX: reduced ? 1 : progress }}
          className="absolute top-0 left-0 z-20 h-[2px] w-full origin-left bg-gradient-to-r from-cobalt via-cyan-400 to-emerald-400"
        />

        {videoError ? (
          <p className="absolute top-24 left-6 z-20 max-w-sm text-sm text-white/70">
            The product film could not load. The story below still walks the same path.
          </p>
        ) : null}

        {!videoReady && !videoError ? (
          <p className="absolute bottom-8 left-6 z-20 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
            Preparing the film
          </p>
        ) : null}

        {reduced ? (
          <StaticHero onBook={openDemo} onPreview={openPreview} />
        ) : (
          <>
            <Milestone
              progress={progress}
              input={[0, 0.16, 0.23]}
              output={[1, 1, 0]}
              active={step === 0}
            >
              <CopyBlock
                badge="01 / The Creator Dilemma"
                title="Stop Juggling Drive Links and WhatsApp Payments."
                body="Take complete ownership of your students, content, and revenue."
              />
              <ChaosCard />
            </Milestone>

            <Milestone
              progress={progress}
              input={[0.23, 0.3, 0.5, 0.58]}
              output={[0, 1, 1, 0]}
              active={step === 1}
            >
              <CopyBlock
                badge="02 / Your Brand, Your App"
                title="Your Custom Coaching App Live in Minutes."
                pills={[
                  "Play Store & App Store Live",
                  "Zero Tech Team Needed",
                  "Anti-Piracy Video Player",
                ]}
              />
              <StoreCard />
            </Milestone>

            <Milestone
              progress={progress}
              input={[0.56, 0.64, 0.8, 0.88]}
              output={[0, 1, 1, 0]}
              active={step === 2}
            >
              <CopyBlock
                badge="03 / Growth on Autopilot"
                title="Live Batches, Mock Tests & Automated WhatsApp Reminders."
                pills={[
                  "Instant UPI Payouts",
                  "Automated Fee Receipts",
                  "1:1 Paid Mentorship",
                ]}
              />
              <AutopilotCard progress={progress} />
            </Milestone>

            <DockBar
              progress={progress}
              active={step === 3}
              onBook={openDemo}
              onPreview={openPreview}
            />

            <ScrollHint progress={progress} />
            <Rail step={step} />
          </>
        )}
      </div>
    </section>
  );
}

function Milestone({
  progress,
  input,
  output,
  active,
  children,
}: {
  progress: MotionValue<number>;
  input: number[];
  output: number[];
  active: boolean;
  children: React.ReactNode;
}) {
  const opacity = useTransform(progress, input, output);
  const y = useTransform(
    progress,
    input,
    output.map((value, index) => (value === 0 && index === 0 ? 28 : value === 0 ? -20 : 0)),
  );

  return (
    <motion.div
      style={{ opacity, y }}
      aria-hidden={!active}
      inert={active ? undefined : true}
      className="pointer-events-none absolute inset-0 z-10 flex items-center"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr]">
        {children}
      </div>
    </motion.div>
  );
}

function CopyBlock({
  badge,
  title,
  body,
  pills,
}: {
  badge: string;
  title: string;
  body?: string;
  pills?: string[];
}) {
  return (
    <div className="max-w-xl pt-16">
      <Badge>{badge}</Badge>
      <p className="mt-5 text-balance text-4xl font-semibold tracking-[-0.048em] text-white sm:text-6xl sm:leading-[1.02]">
        {title}
      </p>
      {body ? (
        <p className="mt-5 max-w-md text-base leading-relaxed text-white/70 sm:text-lg">
          {body}
        </p>
      ) : null}
      {pills ? (
        <div className="mt-6 flex flex-wrap gap-2">
          {pills.map((pill) => (
            <StoryPill key={pill}>{pill}</StoryPill>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function ChaosCard() {
  const rows = [
    { label: "Drive folder", value: "drive.google.com/unlisted" },
    { label: "WhatsApp pay", value: "wa.me/fee-link-expired" },
    { label: "Zoom invite", value: "zoom.us/j/resent-again" },
  ];
  return (
    <div className="hidden rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-2xl lg:block">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
        Four tools. Zero ownership.
      </p>
      <ul className="mt-4 space-y-3">
        {rows.map((row) => (
          <li
            key={row.label}
            className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3"
          >
            <p className="text-xs text-white/45">{row.label}</p>
            <p className="mt-1 truncate font-mono text-sm text-white/80">{row.value}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function StoreCard() {
  return (
    <div className="hidden rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-2xl lg:block">
      <div className="flex items-center gap-4">
        <div className="grid h-16 w-16 place-items-center rounded-[1.2rem] bg-[linear-gradient(145deg,#2563EB,#06B6D4)] shadow-[0_10px_40px_-12px_rgba(37,99,235,0.9)]">
          <Smartphone className="h-7 w-7" />
        </div>
        <div>
          <p className="text-lg font-semibold tracking-[-0.03em]">Your Academy</p>
          <p className="text-sm text-white/55">Play Store · App Store</p>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-3 gap-2 text-center">
        {["Logo", "Theme", "Courses"].map((item) => (
          <div
            key={item}
            className="rounded-2xl border border-white/10 bg-black/25 px-2 py-3 text-xs text-white/70"
          >
            {item}
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm text-emerald-300">Listing ready for review</p>
    </div>
  );
}

function AutopilotCard({ progress }: { progress: MotionValue<number> }) {
  const first = useTransform(progress, [0.6, 0.66], [0, 1]);
  const second = useTransform(progress, [0.66, 0.73], [0, 1]);
  const third = useTransform(progress, [0.73, 0.8], [0, 1]);

  const notes = [
    { icon: Wallet, title: "+₹4,999", body: "UPI fee collected", opacity: first },
    { icon: Bell, title: "Batch broadcast", body: "WhatsApp reminder sent", opacity: second },
    { icon: Smartphone, title: "128 live", body: "Student dashboard active", opacity: third },
  ];

  return (
    <div className="hidden space-y-3 lg:block">
      {notes.map((note) => {
        const Icon = note.icon;
        return (
        <motion.div
          key={note.title}
          style={{ opacity: note.opacity }}
          className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 backdrop-blur-2xl"
        >
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-500/15 text-emerald-400">
            <Icon className="h-4 w-4" />
          </span>
          <span>
            <span className="block text-sm font-semibold">{note.title}</span>
            <span className="block text-xs text-white/55">{note.body}</span>
          </span>
        </motion.div>
        );
      })}
    </div>
  );
}

function DockBar({
  progress,
  active,
  onBook,
  onPreview,
}: {
  progress: MotionValue<number>;
  active: boolean;
  onBook: () => void;
  onPreview: () => void;
}) {
  const opacity = useTransform(progress, [0.84, 0.94], [0, 1]);
  const y = useTransform(progress, [0.84, 0.94], [56, 0]);

  return (
    <motion.div
      style={{ opacity, y }}
      aria-hidden={!active}
      inert={active ? undefined : true}
      className="absolute inset-x-0 bottom-5 z-20 px-4 sm:bottom-8 sm:px-6"
    >
      <div className="pointer-events-auto mx-auto flex w-full max-w-4xl flex-col gap-4 rounded-3xl border border-white/15 bg-[#0c1220]/75 p-4 shadow-[0_24px_80px_-28px_rgba(6,182,212,0.65)] backdrop-blur-2xl sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[linear-gradient(135deg,#2563EB,#06B6D4)]">
            <BadgeCheck className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">
              Classplus seal
            </p>
            <p className="text-sm font-semibold tracking-tight sm:text-base">
              Today · ₹1.4L+ revenue
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <MagneticButton className={ghostBtn} onClick={onPreview}>
            Launch Your App
          </MagneticButton>
          <MagneticButton className={primaryBtn} onClick={onBook}>
            Book Free Growth Demo
            <ArrowRight className="h-4 w-4" />
          </MagneticButton>
        </div>
      </div>
    </motion.div>
  );
}

function ScrollHint({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0, 0.08], [1, 0]);
  return (
    <motion.div
      style={{ opacity }}
      className="pointer-events-none absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
    >
      <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/55">
        Scroll the film
      </span>
      <span className="h-10 w-px bg-gradient-to-b from-white/80 to-transparent" />
    </motion.div>
  );
}

function Rail({ step }: { step: number }) {
  return (
    <ol className="absolute top-1/2 right-4 z-20 hidden -translate-y-1/2 flex-col gap-4 md:flex lg:right-8">
      {RAIL.map((item, index) => {
        const active = index === step;
        return (
          <li key={item.id} className="flex items-center justify-end gap-3">
            <span
              className={`text-[10px] font-semibold uppercase tracking-[0.16em] ${
                active ? "text-white" : "text-white/35"
              }`}
            >
              {item.label}
            </span>
            <span
              className={`block rounded-full transition-all ${
                active ? "h-8 w-1 bg-white" : "h-1.5 w-1.5 bg-white/35"
              }`}
            />
          </li>
        );
      })}
    </ol>
  );
}

function StaticHero({
  onBook,
  onPreview,
}: {
  onBook: () => void;
  onPreview: () => void;
}) {
  return (
    <div className="absolute inset-0 z-10 flex items-center">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="max-w-xl pt-16">
          <Badge>02 / Your Brand, Your App</Badge>
          <p className="mt-5 text-balance text-4xl font-semibold tracking-[-0.048em] sm:text-6xl sm:leading-[1.02]">
            Your Custom Coaching App Live in Minutes.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <StoryPill>Play Store & App Store Live</StoryPill>
            <StoryPill>Zero Tech Team Needed</StoryPill>
            <StoryPill>Anti-Piracy Video Player</StoryPill>
          </div>
          <div className="mt-8 flex flex-col gap-2 sm:flex-row">
            <MagneticButton className={primaryBtn} onClick={onPreview}>
              Launch Your App
            </MagneticButton>
            <MagneticButton className={ghostBtn} onClick={onBook}>
              Book Free Growth Demo
            </MagneticButton>
          </div>
        </div>
      </div>
    </div>
  );
}
