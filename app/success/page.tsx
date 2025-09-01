// /app/success/page.tsx
"use client";

import React from "react";
import { CheckItem } from "../../types";

export default function SuccessPage() {
  const items: CheckItem[] = [
    { name: "robots.txt", status: "Poor", explanation: "This file controls whether AI can see your site. If access is blocked, your site may disappear from AI answers." },
    { name: "sitemap.xml", status: "Good", explanation: "A sitemap helps AI find all important pages. Missing sitemap means some pages stay invisible." },
    { name: "X-Robots-Tag", status: "Moderate", explanation: "If headers block indexing, AI may skip your site." },
    { name: "Meta robots", status: "Good", explanation: "If meta tags forbid indexing, pages don’t appear in search." },
    { name: "Canonical", status: "Moderate", explanation: "Without canonical tags, AI may show duplicates instead of the main page." },
    { name: "Title", status: "Good", explanation: "Clear titles help AI understand and show your pages correctly." },
    { name: "Meta description", status: "Poor", explanation: "Missing descriptions make your site less attractive in search results." },
    { name: "Open Graph", status: "Moderate", explanation: "Without OG tags, links in AI answers and social media look incomplete." },
    { name: "H1", status: "Good", explanation: "Main heading helps AI understand the page topic." },
    { name: "Structured Data", status: "Poor", explanation: "Without structured data, AI cannot fully understand your content." },
    { name: "Mobile friendly", status: "Good", explanation: "Sites not optimized for phones are shown less often by AI." },
    { name: "HTTPS", status: "Good", explanation: "Sites without HTTPS are considered unsafe and shown less." },
    { name: "Alt texts", status: "Moderate", explanation: "Without image descriptions, AI misses important information." },
    { name: "Favicon", status: "Good", explanation: "Missing favicon makes the site look unfinished and reduces trust." },
    { name: "404 page", status: "Moderate", explanation: "Incorrect 404 setup confuses AI and reduces visibility." },
  ];

  const score = 62; // Example, can be calculated dynamically
  const interpretation = "Moderate visibility";

  const getColor = (status: string) => {
    switch (status) {
      case "Good":
        return "bg-green-100 text-green-700 border-green-300";
      case "Moderate":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "Poor":
        return "bg-red-100 text-red-700 border-red-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto w-full max-w-2xl rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        {/* Score Circle */}
        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            <svg className="w-32 h-32">
              <circle
                className="text-gray-200"
                strokeWidth="10"
                stroke="currentColor"
                fill="transparent"
                r="50"
                cx="64"
                cy="64"
              />
              <circle
                className={
                  score < 50
                    ? "text-red-500"
                    : score < 80
                    ? "text-yellow-500"
                    : "text-green-500"
                }
                strokeWidth="10"
                strokeDasharray={`${(score / 100) * 314} 314`}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="50"
                cx="64"
                cy="64"
                transform="rotate(-90 64 64)"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xl font-bold">
              {score}%
            </span>
          </div>
        </div>

        {/* Interpretation */}
        <p className="text-center text-lg font-medium mb-6">{interpretation}</p>

        {/* Items */}
        <ul className="space-y-3">
          {items.map((item, i) => (
            <li
              key={i}
              className={`flex justify-between items-center border rounded-md px-3 py-2 ${getColor(
                item.status
              )}`}
            >
              <span className="font-medium">{item.name}</span>
              <span className="text-sm">{item.status}</span>
            </li>
          ))}
        </ul>

        {/* Final Notes */}
        <div className="mt-8 space-y-3 text-center text-sm text-neutral-700">
          <p className="font-medium">
            Full report with results and technical task for the developer has been sent to your email.
          </p>
          <p>
            You can also run a quick check of your other sites or sites you are interested in, and then upgrade to a full check for working with developers.
          </p>
          <p className="text-xs text-neutral-500 mt-4 opacity-70">
            Visibility scores are estimated and based on publicly available data. Not legal advice.
          </p>
        </div>
      </div>
    </main>
  );
}
