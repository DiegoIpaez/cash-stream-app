import { NextResponse } from "next/server";
import { createUser, getUserByEmail } from "@/libs/prisma/user";
import { encryptPassword } from "@/utils/bcrypt.utility";
import { User } from "@/interfaces";

export async function POST(request: Request) {
  try {
    const body: User = await request.json();
     
    const user = await getUserByEmail(body.email);
    if (user) return NextResponse.json({message: 'This email has already been used.'}, { status: 404 });

    const password = await encryptPassword(body.password);
    const newUser = await createUser({ ...body, password });

    return NextResponse.json(newUser, { status: 200 });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Internal server error.";
    return new Response(message, { status: 500 });
  }
}
