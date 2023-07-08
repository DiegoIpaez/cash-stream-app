import { NextRequest, NextResponse } from "next/server";
import {
  createTransaction,
  deleteTransaction,
  getAllTransactionByUser,
  updateTransaction,
} from "@/libs/prisma/transaction";
import { Transaction } from "@/interfaces";

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get("userId");
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

export async function POST(request: Request) {
  try {
    const body: Transaction = await request.json();
    const user = await createTransaction(body);

    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Internal server error.";
    return new Response(message, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body: Transaction = await request.json();
    const user = await updateTransaction(body);

    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Internal server error.";
    return new Response(message, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id }: { id: string } = await request.json();
    const user = await deleteTransaction(id);

    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Internal server error.";
    return new Response(message, { status: 500 });
  }
}
