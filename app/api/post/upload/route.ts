import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (req: any) => {
  const body = await req.json();

  try {
    const post = await prisma.$transaction(async (tx) => {
      const createdPost = await tx.posts.create({
        data: {
          text: body.post.text,
          image: body.post.image,
          video: body.post.video,
          UserEmail: body.email,
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
    return new NextResponse(null, { status: 500 });
  }
};
