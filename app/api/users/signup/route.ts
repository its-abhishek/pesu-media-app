import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const PUT = async (req: any) => {
  try {
    const user = await req.json();
    const existingUser = await prisma.users.findFirst({
      where: { email: user.email },
    });

    if (!existingUser) {
      const hashedPassword = user.password
        ? await bcrypt.hash(user.password, 10)
        : null;

      const createUser = await prisma?.users.create({
        data: {
          name: user?.name,
          imageUrl:
            user?.image ||
            "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png?20170328184010",
          password: hashedPassword,
          email: user?.email,
          about: "",
          tag:
            `${user?.email?.split("@")[0]}` +
            `${Math.floor(Math.random() * 1000)}`,
        },
      });

      return new NextResponse(JSON.stringify({ message: "Created New Account" }));
    } else {
      return new NextResponse(JSON.stringify({ error: "User already exists" }), { status: 409 });
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return new NextResponse(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
};
