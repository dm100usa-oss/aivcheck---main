// /components/ReportLayout.tsx
import React from "react";

type CheckItem = {
  name: string;
  description: string;
  status: "Good" | "Moderate" | "Poor";
};

type ReportLayoutProps = {
  score: number;
  interpretation: string;
  items: CheckItem[];
  mode: "quick" | "pro";
};

export default function ReportLayout({
  score,
  interpretation,
  items,
  mode,
}: ReportLayoutProps) {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow">
      {/* Score donut */}
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

      {/* Checks list */}
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index} className="p-4 border rounded-lg">
            <p className="font-medium">{item.name}</p>
            <p className="text-sm text-gray-600 mb-2">{item.description}</p>
            <span
              className={`px-3 py-1 rounded text-white text-sm font-semibold ${
                item.status === "Good"
                  ? "bg-green-500"
                  : item.status === "Moderate"
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
            >
              {item.status}
            </span>
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg text-center">
        <p className="font-medium">
          Overall, your site shows {interpretation.toLowerCase()}.
        </p>

        {mode === "quick" && (
          <p className="text-sm text-gray-600 mt-2">
            You can also run a quick check of your other websites, or upgrade to
            a full audit to get detailed results and a technical assignment for
            your developer.
          </p>
        )}

        {mode === "pro" && (
          <>
            <p className="text-sm text-gray-600 mt-2">
              The full report with detailed results and the technical assignment
              for your developer has been sent to your email.
            </p>
            <p className="text-sm text-gray-600 mt-2">
              If you do not have a developer, we are ready to help implement the
              necessary improvements.
            </p>
          </>
        )}

        <p className="text-xs text-gray-400 mt-4">
          All percentages and recommendations are approximate and provided for
          informational purposes only. The results are automatically generated
          and do not constitute legal, financial, or technical advice.
        </p>
      </div>
    </div>
  );
}
