import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

const ADMIN_PASSWORD = "admin123";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem("admin_auth", "true");
      navigate("/admin/dashboard");
    } else {
      setError("ভুল পাসওয়ার্ড। আবার চেষ্টা করুন।");
    }
  };

  return (
    <main
      data-testid="admin-login-page"
      className="min-h-screen bg-[#FDFBF7] flex items-center justify-center px-4"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-[0_20px_40px_rgb(0,0,0,0.08)] border border-slate-100">
          {/* Icon */}
          <div className="w-16 h-16 rounded-2xl bg-[#2C4B3B]/10 flex items-center justify-center mx-auto mb-8">
            <Lock size={28} className="text-[#2C4B3B]" />
          </div>

          <h1
            className="font-heading text-2xl font-bold text-[#0F172A] text-center mb-2"
            data-testid="admin-login-title"
          >
            অ্যাডমিন প্যানেল
          </h1>
          <p className="text-sm text-[#94A3B8] text-center mb-8">
            অ্যাক্সেস করতে পাসওয়ার্ড দিন
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="পাসওয়ার্ড লিখুন"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                data-testid="admin-password-input"
                className="w-full bg-[#F3F4F1] border-0 rounded-xl px-4 py-3 pr-12 text-[#0F172A] placeholder:text-[#94A3B8] focus-visible:ring-2 focus-visible:ring-[#2C4B3B]/20"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                data-testid="toggle-password-visibility"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#475569] transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {error && (
              <p
                className="text-sm text-red-500 text-center"
                data-testid="admin-login-error"
              >
                {error}
              </p>
            )}

            <Button
              type="submit"
              data-testid="admin-login-submit"
              className="w-full bg-[#2C4B3B] text-white rounded-xl py-3 text-base font-medium hover:bg-[#1E3529] transition-all duration-300 flex items-center justify-center gap-2"
            >
              প্রবেশ করুন
              <ArrowRight size={18} />
            </Button>
          </form>
        </div>
      </motion.div>
    </main>
  );
}
