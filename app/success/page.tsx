// app/success/page.tsx
"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import ReportLayout, { CheckItem } from "../../components/ReportLayout";

export default function SuccessPage() {
  const params = useSearchParams();
  const mode = (params.get("mode") || "quick") as "quick" | "pro";
  const url = params.get("url") || "";
  const score = Number(params.get("score") || (mode === "pro" ? 62 : 75));
  const interpretation = params.get("interpretation") || "Moderate visibility";

  const testItems: CheckItem[] =
    mode === "pro"
      ? [
          { name: "robots.txt", status: "Poor", explanation: "File missing or blocks AI access" },
          { name: "sitemap.xml", status: "Good", explanation: "Sitemap found and valid" },
          { name: "X-Robots-Tag", status: "Good", explanation: "Header allows indexing" },
          { name: "Meta robots", status: "Good", explanation: "Proper meta robots tag" },
          { name: "Canonical", status: "Good", explanation: "Canonical tag is present" },
          { name: "Title", status: "Good", explanation: "Title is clear and unique" },
          { name: "Meta description", status: "Poor", explanation: "Missing or duplicated description" },
          { name: "Open Graph", status: "Good", explanation: "OG tags are implemented" },
          { name: "H1", status: "Good", explanation: "Main H1 heading is valid" },
          { name: "Structured Data", status: "Moderate", explanation: "No JSON-LD schema found" },
          { name: "Mobile friendly", status: "Good", explanation: "Mobile-friendly design" },
          { name: "HTTPS", status: "Good", explanation: "SSL certificate is valid" },
          { name: "Alt texts", status: "Good", explanation: "Images have alt attributes" },
          { name: "Favicon", status: "Good", explanation: "Favicon is present" },
          { name: "404 page", status: "Good", explanation: "Custom 404 page is working" },
        ]
      : [
          { name: "AI Visibility", status: "Good", explanation: "Site is accessible to AI crawlers" },
          { name: "AI Readability of Text", status: "Good", explanation: "Text is clear for AI parsing" },
          { name: "AI Access to Key Pages", status: "Good", explanation: "Important pages are accessible" },
          { name: "Up-to-Date Information for AI", status: "Moderate", explanation: "Some outdated content detected" },
          { name: "AI-Friendly Page Structure", status: "Poor", explanation: "Structure may confuse AI systems" },
        ];

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl">
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
          score={score}
          interpretation={interpretation}
          items={testItems}
        />

        {/* Extra messages after the report */}
        <div className="mt-6 space-y-3 text-center text-sm">
          {mode === "pro" && (
            <p className="text-emerald-700">
              Full report with results and technical recommendations has been sent to your email.
            </p>
          )}
          <p className="text-blue-700">
            You can also run a quick check of other websites or upgrade to a full audit for detailed work with developers.
          </p>
          <p className="text-neutral-500 text-xs">
            Visibility scores are estimated and based on publicly available data. Not legal advice.
          </p>
        </div>
      </div>
    </main>
  );
}
