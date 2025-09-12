"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Board = {
  id: string;
  title: string;
};

export default function BoardPage() {
  const params = useParams();
  const boardId = params.id as string;

  const [board, setBoard] = useState<Board | null>(null);

  useEffect(() => {
    fetch(`/api/boards/${boardId}`)
      .then((res) => res.json())
      .then((data) => setBoard(data));
  }, [boardId]);

  if (!board) return <p>Loading...</p>;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">{board.title}</h1>
      <p className="text-gray-600">Here we’ll add lists & cards 🚀</p>
    </main>
  );
}
