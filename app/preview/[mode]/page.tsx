"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ReportLayout, { CheckItem } from "../../../components/ReportLayout";

type Mode = "quick" | "pro";

export default function PreviewPage({
  params,
  searchParams,
}: {
  params: { mode: Mode };
  searchParams: Record<string, string | undefined>;
}) {
  const mode = (params.mode as Mode) || "quick";
  const url = (searchParams?.url || "").trim();
  const paid = (searchParams?.paid || "") === "1";
  const router = useRouter();

  const testItemsQuick: CheckItem[] = [
    { name: "AI Visibility", status: "Good" },
    { name: "AI Readability of Text", status: "Good" },
    { name: "AI Access to Key Pages", status: "Good" },
    { name: "Up-to-Date Information for AI", status: "Moderate" },
    { name: "AI-Friendly Page Structure", status: "Poor" },
  ];

  const [email, setEmail] = useState("");
  const emailValid =
    mode === "pro" ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) : true;

  const pay = async () => {
    const resp = await fetch("/api/pay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mode, url, email }),
    });
    const json = await resp.json();
    if (json?.url) window.location.href = json.url as string;
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <h1 className="mb-6 text-center text-2xl font-semibold">
          Your result is ready
        </h1>

        <ReportLayout
          mode={mode}
          score={mode === "pro" ? 62 : undefined}
          interpretation={mode === "pro" ? "Moderate visibility" : undefined}
          items={mode === "pro" ? [] : testItemsQuick}
        />

        {!paid ? (
          <div className="mt-6">
            {mode === "pro" && (
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm text-neutral-700">
                  Your email to receive the PDF after payment
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-md border px-3 py-2 text-sm"
                />
                {!emailValid && (
                  <p className="mt-1 text-xs text-rose-600">Please enter a valid email.</p>
                )}
              </div>
            )}
            <button
              onClick={pay}
              disabled={!url || (mode === "pro" && !emailValid)}
              className={`w-full rounded-md px-4 py-3 text-base font-medium text-white ${
                mode === "quick" ? "bg-blue-600" : "bg-green-600"
              }`}
            >
              {mode === "pro" ? "Pay & Get Full Report" : "Pay & Get Results"}
            </button>
          </div>
        ) : (
          <div className="mt-6 text-center text-sm text-emerald-700">
            {mode === "pro"
              ? "Payment confirmed. Your full report with technical recommendations has been sent to your email."
              : "Payment confirmed. Your results are now unlocked."}
          </div>
        )}
      </div>
    </main>
  );
}
