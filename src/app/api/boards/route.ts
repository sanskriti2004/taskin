import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET: all boards for user
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json([], { status: 401 });

  const boards = await prisma.board.findMany({
    where: { owner: { email: session.user.email } },
  });

  return NextResponse.json(boards);
}

// POST: create new board
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    if (!body.title) {
      return NextResponse.json({ error: "Title required" }, { status: 400 });
    }

    const board = await prisma.board.create({
      data: {
        title: body.title,
        owner: { connect: { email: session.user.email } },
      },
    });

    return NextResponse.json(board);
  } catch (error) {
    console.error("Error creating board:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
