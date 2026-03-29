"use client"
import { useAuthStore } from '@/stores/authStore/authStore'
import { Edit3, Loader2 } from 'lucide-react'
import React, { ChangeEvent, useState } from 'react'
import { useRouter } from "next/navigation"
import { motion } from 'motion/react'

const JoinRoom = () => {
    const { joinRoom, isJoiningRoom } = useAuthStore()
    const [formData, setFormData] = useState({ roomId: "" })
    const router = useRouter()

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        const success = await joinRoom(formData.roomId || "")
        if (success) router.push(`/canvas/${formData.roomId}`)
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-white px-4 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-[#07060f] pointer-events-none">
                <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-indigo-700/15 blur-[100px]" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-violet-700/10 blur-[80px]" />
            </div>

            <motion.div
                className="relative z-10 w-full max-w-md"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                {/* Logo */}
                <div className="flex items-center justify-center gap-2 mb-8">
                    <div className="relative w-9 h-9">
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-500/40" />
                        <Edit3 size={16} className="absolute inset-0 m-auto text-white" />
                    </div>
                    <span className="font-bold text-lg bg-gradient-to-r from-violet-300 to-indigo-300 bg-clip-text text-transparent">
                        SyncBoard
                    </span>
                </div>

                {/* Card */}
                <div className={`bg-white/4 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl shadow-violet-900/20 ${isJoiningRoom ? "opacity-50 pointer-events-none" : ""}`}>
                    <h1 className="text-2xl font-bold text-center mb-2">Join a Board</h1>
                    <p className="text-gray-400 text-sm text-center mb-7">Enter a board ID shared with you</p>

                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Board ID…"
                            className="bg-white/6 border border-white/12 text-white px-4 py-3 rounded-xl placeholder-gray-500 focus:ring-2 focus:ring-violet-500 focus:outline-none transition"
                            onChange={onChangeHandler}
                            value={formData.roomId}
                            name="roomId"
                        />
                        <button
                            type="submit"
                            className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-3 rounded-xl font-semibold shadow-md shadow-violet-700/30 hover:from-violet-500 hover:to-indigo-500 transition-all duration-300"
                        >
                            Join Board
                        </button>
                    </form>
                </div>
            </motion.div>

            {/* Loading overlay */}
            {isJoiningRoom && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white/10 border border-white/20 rounded-2xl px-8 py-6 flex flex-col items-center gap-3">
                        <Loader2 className="animate-spin text-violet-400 size-8" />
                        <p className="text-sm text-gray-300">Joining board…</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default JoinRoom
