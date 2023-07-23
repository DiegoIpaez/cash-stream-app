import { NextResponse } from "next/server";
import {
  createTransaction,
  deleteTransaction,
  updateTransaction,
} from "@/libs/prisma/transaction";
import { Transaction } from "@/interfaces";

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
