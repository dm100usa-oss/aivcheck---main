"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Mode = "quick" | "pro";

const quickParams = [
  { id: 1, name: "robots.txt", description: "Если файл закрывает сайт, он может полностью исчезнуть из поиска ИИ." },
  { id: 2, name: "sitemap.xml", description: "Карта сайта показывает, какие страницы учитывать, если её нет — часть страниц невидима." },
  { id: 3, name: "X-Robots-Tag", description: "Если заголовки запрещают индексацию, сайт не попадает в поиск." },
  { id: 4, name: "Meta robots", description: "Если мета-теги закрывают страницу, она не появляется в результатах." },
  { id: 5, name: "Canonical", description: "Если не указана основная версия страницы, ИИ может показывать дубликаты." },
];

const proParams = [
  "robots.txt",
  "sitemap.xml",
  "X-Robots-Tag",
  "Meta robots",
  "Canonical",
  "Title",
  "Meta description",
  "Open Graph",
  "H1",
  "Structured Data",
  "Mobile friendly",
  "HTTPS",
  "Alt texts",
  "Favicon",
  "404 page",
];

export default function PreviewPage({
  params,
  searchParams,
}: {
  params: { mode: Mode };
  searchParams: Record<string, string | undefined>;
}) {
  const mode = (params.mode as Mode) || "quick";
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handlePay = () => {
    if (mode === "pro" && !validateEmail(email)) {
      setError("Invalid email address. Please try again.");
      return;
    }
    setError(null);
    router.push("/success?mode=" + mode);
  };

  const validateEmail = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  if (searchParams?.status === "error") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h1 className="text-xl font-semibold mb-4">
          Could not analyze this website. Please check the URL and try again.
        </h1>
        <button
          onClick={() => router.push("/")}
          className="px-6 py-3 rounded-xl bg-amber-500 text-white hover:bg-amber-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold mb-6">
        {mode === "quick" ? "Your site has been checked" : "Full site audit preview"}
      </h1>

      {mode === "quick" ? (
        <ul className="space-y-4">
          {quickParams.map((p) => (
            <li key={p.id} className="flex items-start space-x-3">
              <div className="w-4 h-4 rounded-full bg-blue-500 mt-1" />
              <div>
                <p className="font-semibold">{p.name}</p>
                <p className="text-sm text-gray-600">{p.description}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="space-y-3">
          {proParams.map((p, i) => (
            <li key={i} className="flex items-center space-x-3">
              <div className="w-4 h-4 rounded-full bg-gray-400" />
              <span>{p} — Pending</span>
            </li>
          ))}
        </ul>
      )}

      {mode === "pro" && (
        <div className="mt-6">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg p-2 mb-2"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      )}

      <button
        onClick={handlePay}
        className={`mt-8 w-full py-3 rounded-xl text-white ${
          mode === "quick"
            ? "bg-gradient-to-r from-blue-500 to-blue-600"
            : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {mode === "quick" ? "Pay & Get Results" : "Pay & Get Full Report"}
      </button>
    </div>
  );
}
