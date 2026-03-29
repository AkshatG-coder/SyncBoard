"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Users, Edit3, Sparkles, Zap, Loader2, ChevronDown, Layers, MousePointer2, Globe, Bot } from "lucide-react"
import { motion, easeOut, useScroll, useTransform } from "motion/react"
import { FeatureCard } from "../components/FeatureCard"
import { useAuthStore } from "@/stores/authStore/authStore"
import { redirect, useRouter } from "next/navigation"
import { createPortal } from "react-dom"

/* ─── Background pieces ─── */
const AmbientOrbs = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-violet-700/20 blur-[120px]" />
    <div className="absolute top-1/3 -right-60 w-[500px] h-[500px] rounded-full bg-indigo-600/15 blur-[100px]" />
    <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full bg-purple-800/20 blur-[90px]" />
  </div>
)

const GridLines = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
    <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="sb-grid" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(139,92,246,0.12)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#sb-grid)" />
    </svg>
  </div>
)

const FloatingDots = () => {
  const [mounted, setMounted] = useState(false);
  const [dots, setDots] = useState<any[]>([]);

  useEffect(() => {
    setMounted(true);
    const newDots = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      size: Math.random() * 3 + 1.5,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      duration: Math.random() * 8 + 6,
    }));
    setDots(newDots);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          className="absolute rounded-full bg-violet-400/40"
          style={{ width: dot.size, height: dot.size, left: `${dot.x}%`, top: `${dot.y}%` }}
          animate={{ y: [-18, 18, -18], opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: dot.duration, repeat: Infinity, ease: "easeInOut", delay: dot.delay }}
        />
      ))}
    </div>
  );
};


const FloatingIcons = () => (
  <>
    <motion.div
      className="absolute top-28 left-[8%] text-violet-400/15"
      animate={{ y: [-12, 12, -12], rotate: [0, 8, -8, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
    >
      <Layers size={52} />
    </motion.div>
    <motion.div
      className="absolute top-1/3 right-[6%] text-indigo-400/15"
      animate={{ y: [-16, 16, -16], x: [-6, 6, -6] }}
      transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
    >
      <MousePointer2 size={40} />
    </motion.div>
    <motion.div
      className="absolute bottom-1/3 left-[4%] text-purple-400/15"
      animate={{ y: [-10, 10, -10], rotate: [0, -12, 12, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 4 }}
    >
      <Users size={44} />
    </motion.div>
    <motion.div
      className="absolute top-20 right-[22%] text-violet-300/30"
      animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3], rotate: [0, 180, 360] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <Sparkles size={18} />
    </motion.div>
    <motion.div
      className="absolute bottom-36 right-[30%] text-indigo-300/30"
      animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.9, 0.3] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
    >
      <Zap size={14} />
    </motion.div>
  </>
)

const ScrollCue = () => (
  <motion.div
    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-violet-300/50"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 2.5, duration: 1 }}
  >
    <span className="text-xs font-light mb-2 tracking-widest uppercase">Explore</span>
    <motion.div
      animate={{ y: [0, 8, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    >
      <ChevronDown size={18} />
    </motion.div>
  </motion.div>
)

/* ─── Animated logo mark ─── */
const Logo = () => (
  <div className="flex items-center gap-3 mb-10">
    <div className="relative w-10 h-10">
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-500/40" />
      <Edit3 size={18} className="absolute inset-0 m-auto text-white" />
    </div>
    <span className="text-sm font-semibold tracking-widest text-violet-300/80 uppercase">SyncBoard</span>
  </div>
)

/* ─── Typewriter ─── */
type TypewriterProps = { text: string; delay?: number }
const TypewriterText = ({ text, delay = 0 }: TypewriterProps) => {
  const [display, setDisplay] = useState("")
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    if (idx >= text.length) return
    const t = setTimeout(() => { setDisplay(p => p + text[idx]); setIdx(p => p + 1) }, delay + idx * 28)
    return () => clearTimeout(t)
  }, [idx, text, delay])
  return (
    <span>
      {display}
      <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }} className="text-violet-400">|</motion.span>
    </span>
  )
}

/* ─── Stat pill ─── */
const StatPill = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl px-5 py-3 text-center">
    <div className="text-2xl font-bold bg-gradient-to-r from-violet-300 to-indigo-300 bg-clip-text text-transparent">{value}</div>
    <div className="text-xs text-gray-400 mt-0.5">{label}</div>
  </div>
)

/* ─── Main ─── */
const LandingPage = () => {
  const { authUser, checkAuth, isLoggingOut, guestLogin, isGuestLoggingIn } = useAuthStore()
  const router = useRouter()
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, 50])
  const y2 = useTransform(scrollY, [0, 300], [0, -40])

  useEffect(() => { checkAuth() }, [checkAuth])
  useEffect(() => { if (authUser) redirect("/home-page") }, [authUser, router])

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8, staggerChildren: 0.12, delayChildren: 0.3 } },
  }
  const item = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOut } },
  }
  const card = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: easeOut } },
  }

  return (
    <>
      {isLoggingOut && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 flex flex-col items-center space-y-4">
            <Loader2 className="size-12 animate-spin text-violet-400" />
            <p className="text-white font-medium">Signing out…</p>
          </div>
        </div>,
        document.body
      )}

      <div className="relative min-h-screen bg-[#07060f] text-white overflow-hidden">
        <AmbientOrbs />
        <GridLines />
        <FloatingDots />
        <FloatingIcons />

        <div className="relative z-10">
          {/* ── Hero ── */}
          <motion.div
            className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8"
            style={{ y: y1 }}
          >
            <motion.main
              className="text-center max-w-5xl mx-auto"
              variants={container}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={item} className="flex justify-center">
                <Logo />
              </motion.div>

              {/* Headline */}
              <motion.div variants={item} className="mb-6">
                <motion.h1
                  className="text-6xl sm:text-7xl md:text-8xl lg:text-[96px] font-extrabold mb-4 leading-none tracking-tight"
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 28 }}
                >
                  <span className="bg-gradient-to-br from-violet-300 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                    Sync
                  </span>
                  <span className="text-white">Board</span>
                </motion.h1>

                {/* Animated underline */}
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "260px", opacity: 1 }}
                  transition={{ duration: 1.4, delay: 0.9, ease: "easeOut" }}
                  className="h-1 bg-gradient-to-r from-violet-500 via-indigo-500 to-purple-500 mx-auto rounded-full shadow-lg shadow-violet-500/60"
                />
              </motion.div>

              {/* Tag line */}
              <motion.div variants={item} className="mb-10">
                <p className="text-2xl md:text-3xl font-light text-gray-200 mb-4">
                  Your team's shared canvas — <span className="text-violet-300 font-semibold">always in sync.</span>
                </p>
                <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
                  <TypewriterText
                    text="Real-time whiteboard for teams, educators &amp; creators. Sketch ideas, brainstorm together, and ship faster."
                    delay={200}
                  />
                </p>
              </motion.div>

              {/* CTAs */}
              <motion.div
                variants={item}
                className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-5 mb-14"
              >
                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 12 }}>
                  <Link
                    href="/signup"
                    className="relative inline-flex items-center justify-center gap-2 min-w-[160px] px-8 py-4 rounded-2xl font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 shadow-lg shadow-violet-700/40 hover:from-violet-500 hover:to-indigo-500 hover:shadow-xl hover:shadow-violet-600/50 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-violet-500/30"
                  >
                    Get Started Free
                    <Globe size={16} />
                  </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 12 }}>
                  <button
                    onClick={guestLogin}
                    disabled={isGuestLoggingIn}
                    className="inline-flex items-center justify-center min-w-[160px] px-8 py-4 rounded-2xl font-semibold text-white bg-white/8 border border-white/15 backdrop-blur-sm hover:bg-white/15 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/10"
                  >
                    {isGuestLoggingIn ? <Loader2 className="animate-spin size-5" /> : "Guest Login"}
                  </button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 12 }}>
                  <Link
                    href="/signin"
                    className="inline-flex items-center justify-center min-w-[160px] px-8 py-4 rounded-2xl font-semibold text-gray-300 hover:text-white transition-all duration-300 focus:outline-none"
                  >
                    Sign In
                  </Link>
                </motion.div>
              </motion.div>

              {/* Stats */}
              <motion.div variants={item} className="flex flex-wrap justify-center gap-4">
                <StatPill value="∞" label="Canvases" />
                <StatPill value="Real-time" label="Collaboration" />
                <StatPill value="AI" label="Powered" />
              </motion.div>
            </motion.main>

            <ScrollCue />
          </motion.div>

          {/* ── Feature Cards ── */}
          <motion.div
            className="py-24 px-4 sm:px-6 lg:px-8"
            style={{ y: y2 }}
          >
            <motion.div
              className="max-w-6xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={container}
            >
              <motion.div variants={item} className="text-center mb-14">
                <h2 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-white to-violet-200 bg-clip-text text-transparent">
                  Why SyncBoard?
                </h2>
                <p className="text-gray-400 text-lg max-w-xl mx-auto">
                  Everything you need to collaborate visually — nothing you don't.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
                {[
                  {
                    icon: <Bot size={30} />,
                    title: "AI Drawing Assistant",
                    desc: "Generate and iterate on drawings with built-in AI tooling."
                  },
                  {
                    icon: <Users size={30} />,
                    title: "Rooms & Sharing",
                    desc: "Spin up a board in seconds and invite teammates via a single code."
                  },
                  {
                    icon: <Edit3 size={30} />,
                    title: "Draw Together",
                    desc: "Full-featured canvas with pencil, shapes, text and live cursors."
                  },
                ].map((f, i) => (
                  <motion.div
                    key={f.title}
                    variants={card}
                    whileHover={{ y: -10, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 28 }}
                  >
                    <FeatureCard
                      icon={f.icon}
                      title={f.title}
                      className="bg-gradient-to-br from-violet-500/10 to-indigo-500/10 border-violet-500/20 hover:from-violet-500/20 hover:to-indigo-500/20"
                    >
                      {f.desc}
                    </FeatureCard>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* ── Feature checklist ── */}
          <motion.div
            className="py-16 px-4 sm:px-6 lg:px-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
          >
            <div className="max-w-5xl mx-auto">
              <motion.div
                className="bg-white/4 backdrop-blur-xl border border-white/8 rounded-3xl p-8 md:p-12 shadow-2xl shadow-violet-900/20"
                whileHover={{ scale: 1.01, boxShadow: "0 25px 60px rgba(109,40,217,0.18)" }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-10">
                  <h3 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-violet-300 to-indigo-300 bg-clip-text text-transparent">
                    Everything You Need
                  </h3>
                  <p className="text-gray-400 text-base max-w-xl mx-auto">
                    Professional collaborative whiteboarding, reimagined.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                  {[
                    ["AI Drawing Generator", "Real-time multi-user canvas", "Undo / Redo history"],
                    ["Secure room management", "Cross-platform support", "Intuitive touch interface"],
                  ].map((col, ci) => (
                    <div key={ci} className="space-y-5">
                      {col.map((feat, fi) => (
                        <motion.div
                          key={feat}
                          className="flex items-center gap-4 group"
                          initial={{ opacity: 0, x: ci === 0 ? -20 : 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: fi * 0.1 + ci * 0.2, duration: 0.5 }}
                        >
                          <div className="flex-shrink-0 w-2.5 h-2.5 rounded-full bg-gradient-to-r from-violet-400 to-indigo-400 shadow-md shadow-violet-400/50 group-hover:scale-125 transition-transform duration-300" />
                          <span className="text-gray-300 group-hover:text-white transition-colors duration-300">{feat}</span>
                        </motion.div>
                      ))}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* ── Footer ── */}
          <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/8">
            <div className="max-w-6xl mx-auto text-center">
              <motion.div
                className="flex items-center justify-center gap-2 mb-3"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative w-7 h-7">
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600" />
                  <Edit3 size={13} className="absolute inset-0 m-auto text-white" />
                </div>
                <h4 className="text-xl font-bold bg-gradient-to-r from-violet-300 to-indigo-300 bg-clip-text text-transparent">
                  SyncBoard
                </h4>
              </motion.div>
              <motion.p
                className="text-gray-500 text-sm mb-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Collaborate visually. Always in sync.
              </motion.p>
              <motion.p
                className="text-gray-600 text-xs"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                © {new Date().getFullYear()} SyncBoard. All rights reserved.
              </motion.p>
            </div>
          </footer>
        </div>
      </div>
    </>
  )
}

export default LandingPage