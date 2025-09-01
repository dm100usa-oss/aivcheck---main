// /components/ReportLayout.tsx
import React from "react";
import { CheckItem } from "../types";

type ReportLayoutProps = {
  mode: "quick" | "pro"; // 👈 обязательный параметр
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
  // Цвет круга зависит от результата
  const circleColor =
    score < 50 ? "text-red-500" : score < 80 ? "text-yellow-500" : "text-green-500";

  // Цвет бейджа зависит от статуса
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Good":
        return "bg-green-100 text-green-700 px-2 py-1 rounded";
      case "Moderate":
        return "bg-yellow-100 text-yellow-700 px-2 py-1 rounded";
      case "Poor":
        return "bg-red-100 text-red-700 px-2 py-1 rounded";
      default:
        return "bg-gray-100 text-gray-700 px-2 py-1 rounded";
    }
  };

  // Цвет акцентов (синий для quick, зеленый для pro)
  const accentColor = mode === "quick" ? "text-blue-600" : "text-green-600";

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      {/* Circular progress */}
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
              className={circleColor}
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
      <p className={`text-center text-lg font-medium mb-4 ${accentColor}`}>
        {interpretation}
      </p>

      {/* List of checks */}
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex flex-col border rounded p-3 bg-gray-50"
          >
            <div className="flex justify-between items-center mb-1">
              <span className="font-medium">{item.name}</span>
              <span className={getStatusColor(item.status)}>{item.status}</span>
            </div>
            <p className="text-sm text-gray-600">{item.explanation}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
