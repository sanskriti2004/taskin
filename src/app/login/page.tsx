"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">Login to Taskin</h1>
      <button
        onClick={() => signIn("github", { callbackUrl: "/home" })}
        className="px-6 py-3 bg-black text-white rounded-lg"
      >
        Sign in with GitHub
      </button>
    </main>
  );
}
