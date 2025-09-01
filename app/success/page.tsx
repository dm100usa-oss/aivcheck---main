// /app/success/page.tsx
"use client";

import React from "react";
import ReportLayout from "../../components/ReportLayout";
import { CheckItem } from "../../types";

export default function SuccessPage() {
  // Example full check items (Pro, 15 points)
  const testItems: CheckItem[] = [
    { name: "robots.txt", status: "Good", explanation: "The file is valid and does not block AI." },
    { name: "sitemap.xml", status: "Moderate", explanation: "Sitemap exists but does not cover all pages." },
    { name: "X-Robots-Tag", status: "Good", explanation: "Headers allow AI indexing." },
    { name: "Meta robots", status: "Poor", explanation: "Some pages block indexing with noindex." },
    { name: "Canonical", status: "Good", explanation: "Canonical tags are correctly configured." },
    { name: "Title", status: "Good", explanation: "Titles are clear and unique." },
    { name: "Meta description", status: "Moderate", explanation: "Some pages have missing or duplicate descriptions." },
    { name: "Open Graph", status: "Good", explanation: "OG tags are set correctly." },
    { name: "H1", status: "Moderate", explanation: "Some pages have missing or duplicate H1 tags." },
    { name: "Structured Data", status: "Poor", explanation: "Structured data is missing on important pages." },
    { name: "Mobile friendly", status: "Good", explanation: "The site is mobile-friendly." },
    { name: "HTTPS", status: "Good", explanation: "SSL is enabled and valid." },
    { name: "Alt texts", status: "Moderate", explanation: "Some images lack alt attributes." },
    { name: "Favicon", status: "Good", explanation: "Favicon is present." },
    { name: "404 page", status: "Good", explanation: "Custom 404 page works correctly." },
  ];

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <ReportLayout
        mode="pro"
        score={72}
        interpretation="Moderate visibility"
        items={testItems}
      />
    </main>
  );
}
