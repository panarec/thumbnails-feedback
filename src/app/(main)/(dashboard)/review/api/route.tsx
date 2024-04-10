import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.redirect('/sign-in');
  }

  const body = await req.json();

  const voteResponse = await db.vote.create({
    data: {
      userId: session.user.id,
      thumbnailId: body.votedThumbnailId,
    },
  });

  if (!body.comments) return NextResponse.json({ message: 'success' });

  const commentResponse = await db.comment.createMany({
    data: body.comments.map((comment: any) => ({
      userId: session.user.id,
      thumbnailId: comment.thumbnailId,
      comment: comment.comment,
    })),
  });

  return NextResponse.json({ message: 'success' });
}
