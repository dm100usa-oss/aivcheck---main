import React from "react";
import { CheckItem } from "../types";

type ReportLayoutProps = {
  score: number;
  interpretation: string;
  items: CheckItem[];
};

export default function ReportLayout({
  score,
  interpretation,
  items,
}: ReportLayoutProps) {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      {/* Progress Circle */}
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
      <p className="text-center text-lg font-medium mb-4">{interpretation}</p>

      {/* Items List */}
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li
            key={index}
            className={`flex justify-between items-center border-b py-2 ${
              item.status === "Good"
                ? "bg-green-50"
                : item.status === "Moderate"
                ? "bg-yellow-50"
                : "bg-red-50"
            }`}
          >
            <div>
              <span className="font-medium">{item.name}</span>
              <p className="text-sm text-gray-600">{item.explanation}</p>
            </div>
            <span
              className={`px-2 py-1 rounded text-sm font-semibold ${
                item.status === "Good"
                  ? "bg-green-500 text-white"
                  : item.status === "Moderate"
                  ? "bg-yellow-500 text-white"
                  : "bg-red-500 text-white"
              }`}
            >
              {item.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
