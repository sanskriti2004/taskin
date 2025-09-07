import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">Welcome, {session.user?.name} 👋</h1>
      <p className="mt-2 text-gray-600">This is your Taskin dashboard.</p>
    </main>
  );
}
