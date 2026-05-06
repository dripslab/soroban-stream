"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Boxes,
  CircleDollarSign,
  Clock3,
  Code2,
  GitBranch,
  ShieldCheck,
  Sparkles,
  WalletCards,
  Waves,
} from "lucide-react";
import { useEffect } from "react";

const stats = [
  { value: "1s", label: "accrual precision" },
  { value: "24/7", label: "recipient withdrawals" },
  { value: "100%", label: "on-chain settlement" },
];

const useCases = [
  {
    icon: CircleDollarSign,
    title: "Payroll",
    copy: "Open salary streams that unlock continuously instead of batching at the end of the month.",
  },
  {
    icon: WalletCards,
    title: "Subscriptions",
    copy: "Let customers fund cancellable token flows with transparent accrual and instant shutdown.",
  },
  {
    icon: GitBranch,
    title: "Grants",
    copy: "Disburse ecosystem funding over fixed periods while contributors withdraw on their schedule.",
  },
  {
    icon: ShieldCheck,
    title: "Vesting",
    copy: "Replace cliff-only releases with real-time ownership that can be read from the ledger.",
  },
];

const modules = [
  ["stream.rs", "Create, inspect, and persist stream state"],
  ["withdraw.rs", "Calculate unlocked balances and transfer tokens"],
  ["cancel.rs", "Terminate early and refund unearned funds"],
  ["events.rs", "Emit created, withdrawn, and cancelled events"],
];

const particles = Array.from({ length: 34 }, (_, index) => ({
  id: index,
  x: (index * 37) % 100,
  y: (index * 61) % 100,
  delay: (index % 9) * 0.45,
  duration: 9 + (index % 7),
}));

export default function Home() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 120, damping: 28, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 28, mass: 0.5 });
  const heroRotate = useTransform(springX, [0, 1440], [-3, 3]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    mouseX.set(window.innerWidth / 2);
    mouseY.set(window.innerHeight / 2);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-ink text-white">
      <Background springX={springX} springY={springY} />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 py-6 sm:px-8 lg:px-10">
        <header className="flex items-center justify-between rounded-full border border-white/10 bg-white/[0.03] px-4 py-3 backdrop-blur-xl">
          <a className="flex items-center gap-3" href="#">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-navy shadow-glow">
              <Waves className="h-5 w-5" />
            </span>
            <span className="text-lg font-semibold tracking-normal">
              soroban-stream
            </span>
          </a>
          <nav className="hidden items-center gap-6 font-mono text-xs uppercase text-white/56 md:flex">
            <a className="transition hover:text-white" href="#protocol">
              Protocol
            </a>
            <a className="transition hover:text-white" href="#use-cases">
              Use Cases
            </a>
            <a className="transition hover:text-white" href="#architecture">
              Architecture
            </a>
          </nav>
          <a
            className="inline-flex h-10 items-center gap-2 rounded-full bg-white px-4 text-sm font-semibold text-ink transition hover:bg-blue-100"
            href="#launch"
          >
            Launch App
            <ArrowRight className="h-4 w-4" />
          </a>
        </header>

        <section className="grid flex-1 items-center gap-12 py-14 lg:grid-cols-[1.02fr_0.98fr] lg:py-8">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1.5 font-mono text-xs uppercase text-blue-100">
              <Sparkles className="h-3.5 w-3.5 text-navy-soft" />
              Built with Soroban
            </div>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[0.95] tracking-normal text-white sm:text-6xl lg:text-7xl">
              Continuous token streams for real-time Stellar finance.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/68">
              Soroban Stream turns lump-sum transfers into programmable flows:
              salaries, subscriptions, grants, and vesting that accrue every
              second and settle fully on-chain.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                id="launch"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-navy px-6 text-sm font-semibold shadow-glow transition hover:bg-blue-600"
                href="#protocol"
              >
                Create a Stream
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-6 text-sm font-semibold text-white/86 backdrop-blur transition hover:border-white/24 hover:bg-white/[0.07]"
                href="#architecture"
              >
                <Code2 className="h-4 w-4" />
                View Contract
              </a>
            </div>
            <div className="mt-12 grid max-w-2xl grid-cols-3 gap-3">
              {stats.map((stat) => (
                <div
                  className="border-l border-white/12 pl-4"
                  key={stat.label}
                >
                  <div className="text-2xl font-semibold">{stat.value}</div>
                  <div className="mt-1 font-mono text-[11px] uppercase text-white/44">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            style={{ rotateY: heroRotate }}
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.08, ease: "easeOut" }}
            className="relative mx-auto w-full max-w-xl"
          >
            <StreamConsole />
          </motion.div>
        </section>
      </div>

      <section
        id="protocol"
        className="relative z-10 border-y border-white/10 bg-white/[0.025] py-18"
      >
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:px-10">
          <div>
            <p className="font-mono text-xs uppercase text-navy-soft">
              Protocol Flow
            </p>
            <h2 className="mt-4 max-w-xl text-3xl font-semibold leading-tight sm:text-4xl">
              Lock once. Accrue continuously. Withdraw whenever the ledger says
              value has unlocked.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {["create_stream()", "withdraw()", "cancel()"].map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.08 }}
                className="rounded-lg border border-white/10 bg-ink/70 p-5"
              >
                <div className="mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/12 text-navy-soft">
                  <Clock3 className="h-5 w-5" />
                </div>
                <p className="font-mono text-sm text-white">{item}</p>
                <p className="mt-3 text-sm leading-6 text-white/55">
                  {i === 0
                    ? "Sender locks tokens and defines recipient, rate, and duration."
                    : i === 1
                      ? "Recipient pulls accrued value at any point in the stream."
                      : "Unearned funds return cleanly when a stream ends early."}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="use-cases"
        className="relative z-10 mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10"
      >
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-xs uppercase text-navy-soft">
              Use Cases
            </p>
            <h2 className="mt-4 max-w-2xl text-3xl font-semibold leading-tight sm:text-4xl">
              Payment rails for work that happens over time.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-white/56">
            Designed for teams that need transparent accrual, recipient-owned
            withdrawals, and contract-level settlement guarantees.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {useCases.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: index * 0.06 }}
              className="rounded-lg border border-white/10 bg-white/[0.035] p-5 backdrop-blur"
            >
              <item.icon className="h-6 w-6 text-navy-soft" />
              <h3 className="mt-8 text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/56">
                {item.copy}
              </p>
            </motion.article>
          ))}
        </div>
      </section>

      <section
        id="architecture"
        className="relative z-10 mx-auto grid max-w-7xl gap-8 px-5 pb-20 sm:px-8 lg:grid-cols-[1fr_1fr] lg:px-10"
      >
        <div className="rounded-lg border border-white/10 bg-white/[0.035] p-6">
          <p className="font-mono text-xs uppercase text-navy-soft">
            Contract Modules
          </p>
          <div className="mt-6 space-y-3">
            {modules.map(([name, description]) => (
              <div
                key={name}
                className="flex items-start justify-between gap-4 rounded-md border border-white/10 bg-ink/70 p-4"
              >
                <div>
                  <p className="font-mono text-sm text-white">{name}</p>
                  <p className="mt-1 text-sm text-white/48">{description}</p>
                </div>
                <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-navy-soft" />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/[0.035] p-6">
          <p className="font-mono text-xs uppercase text-navy-soft">
            Deployment Stack
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3">
            {[
              "Rust",
              "Soroban SDK",
              "Next.js 14",
              "TypeScript",
              "Tailwind CSS",
              "Freighter",
              "Stellar SDK",
              "GitHub Actions",
            ].map((tech) => (
              <div
                key={tech}
                className="flex items-center gap-3 rounded-md border border-white/10 bg-ink/70 px-4 py-3"
              >
                <Boxes className="h-4 w-4 text-navy-soft" />
                <span className="text-sm text-white/72">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function Background({
  springX,
  springY,
}: {
  springX: ReturnType<typeof useSpring>;
  springY: ReturnType<typeof useSpring>;
}) {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <motion.div
        className="absolute h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/18 blur-3xl"
        style={{ x: springX, y: springY }}
      />
      <div
        className="absolute inset-0 opacity-[0.17]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <motion.div
        animate={{ x: [0, 30, -10, 0], y: [0, -40, 20, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[8%] top-[18%] h-72 w-72 rounded-full bg-blue-700/25 blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -45, 25, 0], y: [0, 30, -25, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[6%] top-[12%] h-96 w-96 rounded-full bg-blue-500/16 blur-3xl"
      />
      <motion.div
        animate={{ x: [0, 35, 10, 0], y: [0, -25, 35, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[4%] left-[42%] h-80 w-80 rounded-full bg-sky-400/10 blur-3xl"
      />
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute h-1 w-1 rounded-full bg-blue-200/60"
          style={{ left: `${particle.x}%`, top: `${particle.y}%` }}
          animate={{ opacity: [0.15, 0.85, 0.15], y: [0, -28, 0] }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,7,12,0.36)_52%,#05070c_100%)]" />
    </div>
  );
}

function StreamConsole() {
  return (
    <div className="relative rounded-lg border border-white/12 bg-[#07101f]/85 p-4 shadow-2xl shadow-blue-950/40 backdrop-blur-2xl">
      <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-blue-500" />
          <span className="h-3 w-3 rounded-full bg-blue-400/50" />
          <span className="h-3 w-3 rounded-full bg-white/25" />
        </div>
        <span className="font-mono text-xs text-white/42">stream.active</span>
      </div>

      <div className="grid gap-4 sm:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-md border border-white/10 bg-white/[0.035] p-4">
          <p className="font-mono text-xs uppercase text-white/42">
            Recipient Accrued
          </p>
          <div className="mt-3 text-4xl font-semibold">$2,418.32</div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-blue-500"
              initial={{ width: "22%" }}
              animate={{ width: ["38%", "72%", "54%", "86%"] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <div className="mt-4 flex items-center justify-between font-mono text-[11px] uppercase text-white/42">
            <span>0 USDC</span>
            <span>3,000 USDC</span>
          </div>
        </div>

        <div className="rounded-md border border-blue-400/18 bg-blue-500/10 p-4">
          <p className="font-mono text-xs uppercase text-blue-100/70">
            Contract Call
          </p>
          <pre className="mt-4 overflow-hidden whitespace-pre-wrap font-mono text-xs leading-6 text-blue-50/78">
{`create_stream({
  asset: "USDC",
  rate_per_second: "0.0011574",
  recipient: "GDRP...7M2Q",
  end_ledger: 827719
})`}
          </pre>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {["ACTIVE", "withdraw anytime", "cancel enabled"].map((item) => (
          <div
            key={item}
            className="rounded-md border border-white/10 bg-ink/70 px-3 py-3 font-mono text-[11px] uppercase text-white/56"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
