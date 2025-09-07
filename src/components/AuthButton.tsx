"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex gap-2 items-center">
        <span className="text-sm">Signed in as {session.user?.name}</span>
        <button
          onClick={() => signOut()}
          className="px-3 py-1 rounded bg-gray-200"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn("github")}
      className="px-3 py-1 rounded bg-blue-500 text-white"
    >
      Sign in with GitHub
    </button>
  );
}
