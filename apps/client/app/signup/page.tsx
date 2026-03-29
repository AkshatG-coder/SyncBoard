"use client";
import { useState, useEffect } from "react";
import { useAuthStore } from "@/stores/authStore/authStore";
import { Edit3, Loader } from "lucide-react";
import { Eye, EyeOff } from "lucide-react";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import { motion } from "motion/react";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string(),
  password: z.string()
    .min(8, "Password should be at least 8 characters")
    .max(100, "Password should not exceed 100 characters")
    .regex(/[a-z]/, "Password must contain at least 1 lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least 1 uppercase letter")
    .regex(/[0-9]/, "Password must contain at least 1 number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least 1 special character"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});

type FormFields = z.infer<typeof schema>;

export default function Signup() {
  const { signup, isSigningUp, inputEmail, authUser } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const emailFromUrl = searchParams.get("email");
    const token = searchParams.get("token");
    const source = searchParams.get("source");

    if (emailFromUrl && token && source === "google") {
      localStorage.setItem("setupToken", token);
      useAuthStore.setState({ inputEmail: emailFromUrl });
    }

    if (!inputEmail && !emailFromUrl) redirect("/verify-email");
    if (authUser) redirect("/home-page");
  }, [inputEmail, authUser]);

  const { register, handleSubmit, setError, formState: { errors } } = useForm<FormFields>({
    defaultValues: { email: inputEmail || "" },
    resolver: zodResolver(schema)
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const { name, email, password, confirmPassword } = data;
      signup({ name, email, password, confirmPassword });
    } catch (error) {
      setError("root", { message: "Registration failed" });
      console.error("Error while signing up", error);
    }
  };

  const inputCls = "bg-white/6 border border-white/12 text-white px-4 py-3 rounded-xl placeholder-gray-500 focus:ring-2 focus:ring-violet-500 focus:outline-none transition w-full";

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
        <div className="bg-white/4 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl shadow-violet-900/20">
          <h1 className="text-2xl font-bold text-center mb-1">Create your account</h1>
          <p className="text-gray-400 text-sm text-center mb-7">Join SyncBoard and start collaborating</p>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-sm font-medium text-gray-300">Full Name</label>
              <input type="text" {...register("name")} placeholder="Jane Doe" className={inputCls} id="name" />
              {errors.name && <p className="text-red-400 text-xs">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-sm font-medium text-gray-300">Email</label>
              <input
                type="email"
                {...register("email")}
                readOnly
                value={inputEmail}
                className="bg-white/3 border border-white/8 text-gray-400 px-4 py-3 rounded-xl focus:outline-none cursor-not-allowed"
                id="email"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-sm font-medium text-gray-300">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  placeholder="Min 8 characters"
                  className={`${inputCls} pr-12`}
                  id="password"
                />
                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-xs">{errors.password.message}</p>}
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-300">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword")}
                  placeholder="Repeat password"
                  className={`${inputCls} pr-12`}
                  id="confirmPassword"
                />
                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-400 text-xs">{errors.confirmPassword.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSigningUp}
              className="mt-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-3 rounded-xl font-semibold shadow-md shadow-violet-700/30 hover:from-violet-500 hover:to-indigo-500 transition-all duration-300 flex items-center justify-center"
            >
              {isSigningUp ? <Loader className="mx-auto animate-spin size-5" /> : "Create Account"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}