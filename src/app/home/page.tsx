"use client";

import { useState, useEffect } from "react";

export default function HomePage() {
  const [boards, setBoards] = useState<any[]>([]); // store boards
  const [newBoardTitle, setNewBoardTitle] = useState(""); // store input text

  // Fetch boards on load
  useEffect(() => {
    const fetchBoards = async () => {
      const res = await fetch("/api/boards");
      if (res.ok) {
        const data = await res.json();
        setBoards(data);
      }
    };
    fetchBoards();
  }, []);

  // Create board
  async function createBoard() {
    if (!newBoardTitle.trim()) return;

    const res = await fetch("/api/boards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newBoardTitle }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      console.error("Create board failed:", err);
      return;
    }

    const data = await res.json();
    setBoards([...boards, data]);
    setNewBoardTitle("");
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Boards</h1>

      {/* Create board input */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newBoardTitle}
          onChange={(e) => setNewBoardTitle(e.target.value)}
          placeholder="New board title"
          className="border px-3 py-2 rounded w-full"
        />
        <button
          onClick={createBoard}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create
        </button>
      </div>

      {/* Show boards */}
      <ul className="space-y-2">
        {boards.map((board) => (
          <li key={board.id} className="p-3 border rounded">
            {board.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
