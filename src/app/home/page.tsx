"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

type Board = {
  id: string;
  title: string;
};

export default function HomePage() {
  const { data: session } = useSession();
  const [boards, setBoards] = useState<Board[]>([]);
  const [newBoard, setNewBoard] = useState("");

  useEffect(() => {
    if (session) {
      fetch("/api/boards")
        .then((res) => res.json())
        .then((data) => setBoards(data));
    }
  }, [session]);

  async function createBoard() {
    if (!newBoard.trim()) return;
    const res = await fetch("/api/boards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newBoard }),
    });
    const board = await res.json();
    setBoards([board, ...boards]);
    setNewBoard("");
  }

  if (!session) return <p>Loading...</p>;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome, {session.user?.name}</h1>
      <button
        onClick={() => signOut()}
        className="px-3 py-2 bg-gray-200 rounded-md mb-4"
      >
        Sign Out
      </button>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newBoard}
          onChange={(e) => setNewBoard(e.target.value)}
          placeholder="New board title"
          className="border px-3 py-2 rounded-md"
        />
        <button
          onClick={createBoard}
          className="px-3 py-2 bg-blue-600 text-white rounded-md"
        >
          Create Board
        </button>
      </div>
      <ul className="space-y-2">
        {boards.map((board) => (
          <li key={board.id} className="p-3 border rounded-md">
            <Link
              href={`/board/${board.id}`}
              className="text-blue-600 hover:underline"
            >
              {board.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
