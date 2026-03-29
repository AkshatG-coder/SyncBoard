"use client"
import { useAuthStore } from "@/stores/authStore/authStore"
import { Edit3, Loader } from "lucide-react"
import { redirect, useRouter } from "next/navigation"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { FiEye, FiEyeOff } from "react-icons/fi"
import Image from "next/image"
import { motion } from "motion/react"

export default function Signin() {
    const {
        login,
        isLoggingIn,
        handleGoogleSignin,
        handleGoogleAuthError,
        authUser,
        guestLogin,
        isGuestLoggingIn
    } = useAuthStore()
    const [formData, setFormData] = useState({ email: "", password: "" })
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter()

    useEffect(() => { handleGoogleAuthError() }, [handleGoogleAuthError])
    useEffect(() => { if (authUser) redirect("/home-page") }, [authUser])

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        await login(formData)
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
                <div className="bg-white/4 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl shadow-violet-900/20">
                    <h1 className="text-2xl font-bold text-center mb-1">Welcome back</h1>
                    <p className="text-gray-400 text-sm text-center mb-7">Sign in to your SyncBoard account</p>

                    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="email" className="text-sm font-medium text-gray-300">Email</label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                className="bg-white/6 border border-white/12 text-white px-4 py-3 rounded-xl placeholder-gray-500 focus:ring-2 focus:ring-violet-500 focus:outline-none transition"
                                onChange={onChangeHandler}
                                value={formData.email}
                                name="email"
                                id="email"
                            />
                        </div>

                        <div className="flex flex-col gap-1.5 relative">
                            <label htmlFor="password" className="text-sm font-medium text-gray-300">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="bg-white/6 border border-white/12 text-white px-4 py-3 rounded-xl placeholder-gray-500 focus:ring-2 focus:ring-violet-500 focus:outline-none transition w-full pr-12"
                                    onChange={onChangeHandler}
                                    value={formData.password}
                                    name="password"
                                    id="password"
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoggingIn}
                            className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-3 rounded-xl font-semibold shadow-md shadow-violet-700/30 hover:from-violet-500 hover:to-indigo-500 transition-all duration-300 flex items-center justify-center"
                        >
                            {isLoggingIn ? <Loader className="animate-spin size-5" /> : "Sign In"}
                        </button>

                        <p className="text-center text-sm text-gray-400">
                            Don&#39;t have an account?{" "}
                            <span
                                onClick={() => router.push("/verify-email")}
                                className="text-violet-400 hover:text-violet-300 cursor-pointer hover:underline transition"
                            >
                                Sign up
                            </span>
                        </p>
                    </form>

                    <div className="flex items-center my-5">
                        <div className="flex-1 h-px bg-white/10" />
                        <span className="px-3 text-gray-500 text-xs">or continue with</span>
                        <div className="flex-1 h-px bg-white/10" />
                    </div>

                    <div className="flex flex-col gap-3">
                        <button
                            type="button"
                            onClick={handleGoogleSignin}
                            className="flex items-center justify-center gap-3 w-full py-3 rounded-xl bg-white hover:bg-gray-100 transition font-semibold text-gray-800 text-sm"
                        >
                            <Image src="/google.svg" alt="Google" width={18} height={18} />
                            Sign in with Google
                        </button>
                        
                        <button
                            type="button"
                            onClick={guestLogin}
                            disabled={isGuestLoggingIn}
                            className="flex items-center justify-center gap-3 w-full py-3 rounded-xl bg-violet-600/20 border border-violet-500/30 hover:bg-violet-600/30 transition font-semibold text-violet-300 text-sm"
                        >
                            {isGuestLoggingIn ? <Loader className="animate-spin size-4" /> : "Continue as Guest"}
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
