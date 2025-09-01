// /components/ReportLayout.tsx
import React from "react";
import { CheckItem } from "../types";

type ReportLayoutProps = {
  mode: "quick" | "pro";
  score: number;
  interpretation: string;
  items: CheckItem[];
};

export default function ReportLayout({
  mode,
  score,
  interpretation,
  items,
}: ReportLayoutProps) {
  const getColor = (status: string) => {
    switch (status) {
      case "Good":
        return "bg-green-100 text-green-700 border border-green-300";
      case "Moderate":
        return "bg-yellow-100 text-yellow-700 border border-yellow-300";
      case "Poor":
        return "bg-red-100 text-red-700 border border-red-300";
      default:
        return "bg-gray-100 text-gray-600 border border-gray-300";
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      {/* Donut progress */}
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
      <p
        className={`text-center text-lg font-semibold mb-6 ${
          mode === "quick" ? "text-blue-600" : "text-green-600"
        }`}
      >
        {interpretation}
      </p>

      {/* List of checks */}
      <ul className="space-y-4">
        {items.map((item, index) => (
          <li
            key={index}
            className="p-4 rounded-md border bg-gray-50 shadow-sm"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">{item.name}</span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${getColor(
                  item.status
                )}`}
              >
                {item.status}
              </span>
            </div>
            <p className="text-sm text-gray-600">{item.explanation}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
