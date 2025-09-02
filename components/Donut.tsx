"use client";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function Donut({ value }: { value: number }) {
  let color = "#f87171"; // red by default
  if (value >= 80) {
    color = "#22c55e"; // green
  } else if (value >= 40) {
    color = "#eab308"; // yellow
  }

  return (
    <div className="w-40 h-40">
      <CircularProgressbar
        value={value}
        text={`${value}%`}
        styles={buildStyles({
          textColor: "#111827",
          pathColor: color,
          trailColor: "#e5e7eb",
          textSize: "16px",
        })}
      />
    </div>
  );
}
