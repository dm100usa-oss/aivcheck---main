"use client";

import React from "react";
import ReportLayout, { CheckItem } from "../../components/ReportLayout";

// 👇 эта строка обязательна
export const dynamic = "force-dynamic";

export default function SuccessPage() {
  const testItems: CheckItem[] = [
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
  ];

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div>
        <h1 className="mb-6 text-center text-2xl font-semibold">
          Your result is ready
        </h1>
        <ReportLayout
          mode="pro"
          score={62}
          interpretation="Moderate visibility"
          items={testItems}
        />
        <div className="mt-6 text-center text-sm text-emerald-700">
          Payment confirmed. Your full report with technical recommendations has been sent to your email.
        </div>
      </div>
    </main>
  );
}
