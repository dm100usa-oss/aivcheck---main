"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PreviewPage({ params }: { params: { mode: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: params.mode }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Failed to create checkout session");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h1 className="text-2xl font-semibold mb-4">Your site has been checked</h1>
      <p className="mb-6 text-gray-600">Preview of results for {params.mode} mode</p>
      <button
        onClick={handleCheckout}
        disabled={loading}
        className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium hover:shadow-md"
      >
        {loading ? "Processing..." : "Pay & Get Results"}
      </button>
    </div>
  );
}
