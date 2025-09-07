"use client";

import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to Taskin 🚀</h1>
      <p className="mb-6 text-gray-600">
        A developer-first task management tool
      </p>
      <div className="flex gap-4">
        <Link
          href="/login"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Login
        </Link>
        <Link
          href="/signup"
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
        >
          Signup
        </Link>
      </div>
    </main>
  );
}
