// app/preview/[mode]/page.tsx
"use client";

import { useState, useMemo } from "react";
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

  // Sample items for preview (before payment)
  const previewItems: CheckItem[] = useMemo(
    () =>
      mode === "quick"
        ? [
            { name: "AI Visibility", status: "Pending", explanation: "Result available after payment" },
            { name: "AI Readability of Text", status: "Pending", explanation: "Result available after payment" },
            { name: "AI Access to Key Pages", status: "Pending", explanation: "Result available after payment" },
            { name: "Up-to-Date Information for AI", status: "Pending", explanation: "Result available after payment" },
            { name: "AI-Friendly Page Structure", status: "Pending", explanation: "Result available after payment" },
          ]
        : [
            { name: "robots.txt", status: "Pending", explanation: "Result available after payment" },
            { name: "sitemap.xml", status: "Pending", explanation: "Result available after payment" },
            { name: "X-Robots-Tag", status: "Pending", explanation: "Result available after payment" },
            { name: "Meta robots", status: "Pending", explanation: "Result available after payment" },
            { name: "Canonical", status: "Pending", explanation: "Result available after payment" },
            { name: "Title", status: "Pending", explanation: "Result available after payment" },
            { name: "Meta description", status: "Pending", explanation: "Result available after payment" },
            { name: "Open Graph", status: "Pending", explanation: "Result available after payment" },
            { name: "H1", status: "Pending", explanation: "Result available after payment" },
            { name: "Structured Data", status: "Pending", explanation: "Result available after payment" },
            { name: "Mobile friendly", status: "Pending", explanation: "Result available after payment" },
            { name: "HTTPS", status: "Pending", explanation: "Result available after payment" },
            { name: "Alt texts", status: "Pending", explanation: "Result available after payment" },
            { name: "Favicon", status: "Pending", explanation: "Result available after payment" },
            { name: "404 page", status: "Pending", explanation: "Result available after payment" },
          ],
    [mode]
  );

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

  const back = () => router.push("/");

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <h1 className="mb-6 text-center text-2xl font-semibold">
          Your result is ready
        </h1>

        {url && (
          <p className="mb-4 text-center text-sm text-neutral-600">
            Checked website: <span className="font-medium">{url}</span>
          </p>
        )}

        <ReportLayout
          mode={mode}
          score={undefined} // no score before payment
          interpretation={undefined}
          items={previewItems}
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
                  <p className="mt-1 text-xs text-rose-600">
                    Please enter a valid email.
                  </p>
                )}
              </div>
            )}
            <button
              onClick={pay}
              disabled={!url || (mode === "pro" && !emailValid)}
              className={`w-full rounded-md px-4 py-3 text-base font-medium text-white ${
                mode === "quick" ? "bg-blue-600 hover:bg-blue-700" : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {mode === "pro" ? "Pay & Get Full Report" : "Pay & Get Results"}
            </button>
          </div>
        ) : (
          <div className="mt-6 text-center text-sm text-emerald-700">
            {mode === "pro"
              ? "Payment confirmed. Your full report with technical recommendations will be sent to your email."
              : "Payment confirmed. Your results are now unlocked."}
          </div>
        )}

        <div className="mt-6 flex justify-center">
          <button
            onClick={back}
            className="rounded-md border border-neutral-300 px-4 py-2 text-sm hover:bg-neutral-50"
          >
            Back to Home
          </button>
        </div>

        <footer className="mt-8 text-center text-xs text-neutral-500">
          © 2025 AI Visibility Pro. All rights reserved.
          <br />
          <span className="opacity-60">
            Visibility scores are estimated and based on publicly available data. Not legal advice.
          </span>
        </footer>
      </div>
    </main>
  );
}
