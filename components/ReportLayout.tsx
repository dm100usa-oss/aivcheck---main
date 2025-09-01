"use client";

import React from "react";
import Donut from "./Donut";

export type CheckItem = {
  name: string;
  status: "Good" | "Moderate" | "Poor";
  explanation?: string;
};

export default function ReportLayout({
  mode,
  score,
  interpretation,
  items,
}: {
  mode: "quick" | "pro";
  score?: number;
  interpretation?: string;
  items: CheckItem[];
}) {
  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-sm p-6">
      {mode === "pro" && score !== undefined && (
        <div className="mb-6 text-center">
          <Donut value={score} />
          <p className="mt-3 text-lg font-medium text-neutral-700">
            {interpretation}
          </p>
        </div>
      )}

      <ul className="space-y-3">
        {items.map((item, i) => (
          <li
            key={i}
            className="flex items-start justify-between rounded-md border px-3 py-2"
          >
            <div>
              <p className="font-medium">{item.name}</p>
              {mode === "pro" && item.explanation && (
                <p className="text-xs text-neutral-500">{item.explanation}</p>
              )}
            </div>
            <span
              className={`ml-4 inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${
                item.status === "Good"
                  ? "bg-emerald-100 text-emerald-700"
                  : item.status === "Moderate"
                  ? "bg-amber-100 text-amber-700"
                  : "bg-rose-100 text-rose-700"
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

