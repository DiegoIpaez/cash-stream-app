import { NextResponse } from "next/server";
import { createUser } from "@/libs/prisma/user";
import { User } from '@/interfaces'


export async function POST(request: Request) {
  try {
    const body: User = await request.json();
    const user = await createUser(body);

    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Internal server error.";
    return new Response(message, { status: 500 });
  }
}
