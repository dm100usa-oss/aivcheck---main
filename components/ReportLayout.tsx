"use client";

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
    <div className="rounded-lg bg-white shadow p-6">
      {score !== undefined && (
        <div className="mb-6 text-center">
          <div className="text-4xl font-bold">{score}%</div>
          <div className="text-sm text-gray-500">{interpretation}</div>
        </div>
      )}

      <ul className="space-y-2">
        {items.map((item, i) => (
          <li
            key={i}
            className="flex justify-between items-start border-b pb-2 last:border-0"
          >
            <span className="font-medium">{item.name}</span>
            <span
              className={`text-sm ${
                item.status === "Good"
                  ? "text-emerald-600"
                  : item.status === "Moderate"
                  ? "text-amber-600"
                  : "text-rose-600"
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
