// /app/success/page.tsx
"use client";

import React from "react";
import ReportLayout from "../../components/ReportLayout";
import { CheckItem } from "../../types";

export default function SuccessPage() {
  const testItems: CheckItem[] = [
    { name: "Robots.txt", status: "Poor", explanation: "File missing or blocks AI" },
    { name: "Sitemap.xml", status: "Good", explanation: "Sitemap found and valid" },
    { name: "Title tag", status: "Good", explanation: "Title is clear and unique" },
    { name: "Meta description", status: "Poor", explanation: "Missing description" },
    { name: "Structured Data", status: "Moderate", explanation: "No JSON-LD found" },
  ];

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <ReportLayout
        mode="pro"   // 👈 добавили обязательное поле
        score={62}
        interpretation="Moderate visibility"
        items={testItems}
      />
    </main>
  );
}
