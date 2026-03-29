"use client"
import { useAuthStore } from '@/stores/authStore/authStore'
import { Edit3, Loader2 } from 'lucide-react'
import Link from 'next/link'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { FiCopy, FiCheck } from 'react-icons/fi'
import { motion, AnimatePresence } from 'motion/react'

const CreateRoom = () => {
    const { createRoom, roomId, isCreatingRoom, joinRoom } = useAuthStore()
    const [copied, setCopied] = useState(false)
    const [formData, setFormData] = useState({ name: "" })

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        createRoom(formData)
    }

    const copyToClipboard = () => {
        if (roomId) {
            navigator.clipboard.writeText(roomId)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-white px-4 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-[#07060f] pointer-events-none">
                <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-violet-700/15 blur-[100px]" />
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-indigo-700/10 blur-[80px]" />
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
                <div className={`bg-white/4 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl shadow-violet-900/20 ${isCreatingRoom ? "opacity-50 pointer-events-none" : ""}`}>
                    <h1 className="text-2xl font-bold text-center mb-2">Create a Board</h1>
                    <p className="text-gray-400 text-sm text-center mb-7">Name your board and start collaborating</p>

                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Board name…"
                            className="bg-white/6 border border-white/12 text-white px-4 py-3 rounded-xl placeholder-gray-500 focus:ring-2 focus:ring-violet-500 focus:outline-none transition"
                            onChange={onChangeHandler}
                            value={formData.name}
                            name="name"
                        />
                        <button
                            type="submit"
                            className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-3 rounded-xl font-semibold shadow-md shadow-violet-700/30 hover:from-violet-500 hover:to-indigo-500 transition-all duration-300"
                        >
                            Create Board
                        </button>
                    </form>
                </div>

                {/* Room created card */}
                <AnimatePresence>
                    {roomId && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="mt-5 bg-white/4 backdrop-blur-xl border border-violet-500/20 rounded-3xl p-6 text-center shadow-xl shadow-violet-900/20"
                        >
                            <p className="text-sm text-violet-300 font-medium mb-1">Board Created!</p>
                            <div className="flex items-center justify-center gap-3 mb-5">
                                <span className="text-xl font-bold text-white tracking-wide">{roomId}</span>
                                <button
                                    onClick={copyToClipboard}
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    {copied ? <FiCheck className="text-violet-400" /> : <FiCopy />}
                                </button>
                            </div>
                            <Link href={`/canvas/${roomId}`}>
                                <button
                                    className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:from-violet-500 hover:to-indigo-500 transition-all duration-300 w-full"
                                    onClick={() => joinRoom(roomId)}
                                >
                                    Enter Board →
                                </button>
                            </Link>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Loading overlay */}
            {isCreatingRoom && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white/10 border border-white/20 rounded-2xl px-8 py-6 flex flex-col items-center gap-3">
                        <Loader2 className="animate-spin text-violet-400 size-8" />
                        <p className="text-sm text-gray-300">Creating your board…</p>
                    </div>
                </div>
            )}

            {/* Copied toast */}
            <AnimatePresence>
                {copied && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="fixed top-6 left-1/2 -translate-x-1/2 bg-violet-600/90 backdrop-blur-sm text-white px-5 py-2.5 rounded-xl text-sm font-medium shadow-lg z-50"
                    >
                        Room ID copied! 🎉
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default CreateRoom
