import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const revalidate = 5;

export const GET = async (req: Request) => {
  try {
    const users = await prisma.users.findMany({
      orderBy: [
        {
          isVerified: "desc",
        },
        {
          name: "asc",
        },
      ],
    });

    return new NextResponse(JSON.stringify(users), { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return new NextResponse(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
};
