"use client"
import { redirect, useRouter } from "next/navigation"
import { useAuthStore } from "../stores/authStore/authStore"
import { useEffect } from "react"
import Link from "next/link"
import { Loader2, Edit3, LogOut, Layers } from "lucide-react"
import { motion } from "motion/react"

export default function HomePage() {
  const { logout, authUser, checkAuth, isLoggingOut } = useAuthStore()
  const router = useRouter()

  useEffect(() => { checkAuth() }, [checkAuth, logout])
  useEffect(() => { if (!authUser) redirect("/") }, [authUser])

  return (
    <div className="h-screen flex flex-col text-white relative overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 bg-[#07060f] pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-violet-700/15 blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-indigo-700/10 blur-[80px]" />
        <svg className="absolute inset-0 h-full w-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hp-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(139,92,246,0.1)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hp-grid)" />
        </svg>
      </div>

      {/* Navbar */}
      <header className="relative z-20 flex items-center justify-between px-6 py-4 border-b border-white/8 backdrop-blur-sm bg-white/3">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 shadow-md shadow-violet-500/40" />
            <Edit3 size={14} className="absolute inset-0 m-auto text-white" />
          </div>
          <span className="font-bold text-base bg-gradient-to-r from-violet-300 to-indigo-300 bg-clip-text text-transparent">
            SyncBoard
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/rooms")}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-white/8 border border-white/12 hover:bg-white/15 transition-all duration-200"
          >
            <Layers size={14} />
            My Boards
          </button>
          <button
            onClick={logout}
            disabled={isLoggingOut}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-white/8 border border-white/12 hover:bg-red-500/20 hover:border-red-500/30 hover:text-red-300 transition-all duration-200 min-w-[100px]"
          >
            {isLoggingOut ? <Loader2 className="animate-spin size-4" /> : <><LogOut size={14} /> Sign Out</>}
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="relative z-10 flex flex-col items-center justify-center flex-1 px-4">
        <motion.div
          className="text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 rounded-full px-4 py-1.5 text-xs text-violet-300 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            Welcome back{authUser?.name ? `, ${authUser.name}` : ""}!
          </motion.div>

          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 bg-gradient-to-br from-white via-violet-100 to-indigo-200 bg-clip-text text-transparent">
            Your Creative Hub
          </h1>
          <p className="text-gray-400 text-lg mb-10">
            Jump into a board and start collaborating with your team in real time.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/create-room">
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg shadow-violet-700/40 hover:from-violet-500 hover:to-indigo-500 hover:shadow-xl hover:shadow-violet-600/50 transition-all duration-300"
              >
                + Create Board
              </motion.button>
            </Link>
            <Link href="/join-room">
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto bg-white/8 border border-white/15 text-white px-8 py-4 rounded-2xl font-semibold backdrop-blur-sm hover:bg-white/15 transition-all duration-300"
              >
                Join a Board
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  )
}