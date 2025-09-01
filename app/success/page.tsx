"use client";

import React from "react";
import ReportLayout from "../../components/ReportLayout";
import { CheckItem } from "../../types";

export default function SuccessPage() {
  // Temporary test data
  const testItems: CheckItem[] = [
    {
      name: "Robots.txt",
      status: "Poor",
      explanation: "File is missing or blocks AI visibility",
    },
    {
      name: "Sitemap.xml",
      status: "Good",
      explanation: "Sitemap found and valid",
    },
    {
      name: "Title tag",
      status: "Good",
      explanation: "Title is clear and unique",
    },
    {
      name: "Meta description",
      status: "Moderate",
      explanation: "Meta description is missing",
    },
    {
      name: "Structured Data",
      status: "Poor",
      explanation: "No structured data found",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <ReportLayout
        score={62}
        interpretation="Moderate visibility"
        items={testItems}
      />
    </main>
  );
}
