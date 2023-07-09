import { NextResponse } from "next/server";
import { getAllTransactionByUser } from "@/libs/prisma/transaction";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id;
    if (!userId)
      return NextResponse.json(
        { message: "userId not found" },
        { status: 404 }
      );
    const user = await getAllTransactionByUser(userId);
    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Internal server error.";
    return new Response(message, { status: 500 });
  }
}
