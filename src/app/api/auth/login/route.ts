import { NextResponse } from "next/server";
import { getUserByEmail } from "@/libs/prisma/user";
import { comparePasswords } from "@/utils/bcrypt.utility";
import { signJwtAccessToken } from "@/utils/jwt.utility";

const ERROR_MSG = {
  NOT_FOUND: "User not found.",
  BAD_REQUEST: "Invalid password or email.",
};

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const user = await getUserByEmail(email);

    if (!user) return new Response(ERROR_MSG.NOT_FOUND, { status: 404 });

    const isValidPassword = await comparePasswords(
      password,
      user?.password.valueOf()
    );

    if (!isValidPassword) return new Response(ERROR_MSG.BAD_REQUEST, { status: 404 });

    const { password: pass, ...userWithoutPass } = user;
    const accessToken = signJwtAccessToken(userWithoutPass);

    return NextResponse.json(
      { accessToken, ...userWithoutPass },
      { status: 200 }
    );
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Internal server error.";
    return new Response(message, { status: 500 });
  }
}
