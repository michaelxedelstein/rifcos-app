"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/");
      router.refresh();
    } else {
      setError("Invalid password");
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#0a0a0a]">
      <div className="w-full max-w-sm px-6">
        <h1 className="text-2xl font-bold text-white tracking-widest text-center mb-2">
          RIFCOS
        </h1>
        <p className="text-sm text-[#6e6e80] text-center mb-8">
          Operations Dashboard
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Admin password"
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-[#6e6e80] focus:outline-none focus:border-[#e94560] transition-colors"
          />
          {error && (
            <p className="text-sm text-[#ff3b30] text-center">{error}</p>
          )}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-[#e94560] text-white font-medium hover:bg-[#d63d56] transition-colors"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
