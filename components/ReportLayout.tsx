// /components/ReportLayout.tsx
import React from "react";
import { CheckItem } from "../types";

type ReportLayoutProps = {
  score: number;
  interpretation: string;
  items: CheckItem[];
  mode: "quick" | "full"; // quick = blue theme, full = green theme
};

export default function ReportLayout({
  score,
  interpretation,
  items,
  mode,
}: ReportLayoutProps) {
  // Pick theme color depending on mode
  const themeColor =
    mode === "quick" ? "text-blue-500" : "text-green-500";
  const bgTheme =
    mode === "quick" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700";

  // Helper for status background
  const getStatusClass = (status: "Good" | "Moderate" | "Poor") => {
    if (status === "Good") return "bg-green-100 text-green-700 px-2 py-1 rounded";
    if (status === "Moderate") return "bg-yellow-100 text-yellow-700 px-2 py-1 rounded";
    return "bg-red-100 text-red-700 px-2 py-1 rounded";
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      {/* Circle with score */}
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
              className={themeColor}
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
      <p className={`text-center text-lg font-medium mb-6 ${bgTheme} inline-block px-4 py-2 rounded`}>
        {interpretation}
      </p>

      {/* Items */}
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li
            key={index}
            className="border-b pb-3"
          >
            <p className="font-semibold">{item.name}</p>
            <p className="text-sm text-gray-700 mb-1">{item.explanation}</p>
            <span className={getStatusClass(item.status)}>
              {item.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
