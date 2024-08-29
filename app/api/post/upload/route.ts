import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();

    if (!body.post || !body.email) {
      return new NextResponse("Invalid input", { status: 400 });
    }

    const post = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const createdPost = await tx.posts.create({
        data: {
          text: body.post.text || "",
          image: body.post.image || "",
          video: body.post.video || "",
          UserEmail: body.email || "",
          type: "text",
        },
        include: {
          likedBy: true,
          savedby: true,
        },
      });
      return createdPost;
    });

    return new NextResponse(JSON.stringify(post));
  } catch (error) {
    console.error("Error creating post:", error);
    return new NextResponse(`Error: `, { status: 500 });
  }
};
