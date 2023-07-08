import prisma from "./client";
import { Transaction } from "@/interfaces";
import ObjectID from "bson-objectid";

export const getAllTransactionByUser = async (userId: string) => {
  const transactions = await prisma.transactions.findMany({
    where: { userId, deleted: false },
  });

  const totalByTransactionType: any = await prisma.transactions.aggregateRaw({
    pipeline: [
      { $match: { userId: new ObjectID(userId).str } },
      {
        $group: {
          _id: "$type",
          totalAmountRaw: { $sum: "$amount" },
        },
      },
      {
        $addFields: {
          totalAmount: {
            $sum: {
              $cond: [
                { $eq: ["$_id", "DISCHARGE"] },
                { $multiply: ["$totalAmountRaw", -1] },
                "$totalAmountRaw",
              ],
            },
          },
        },
      },
    ],
  });

  const [income, discharge] = totalByTransactionType;
  const totalAmount = income.totalAmount + discharge.totalAmount;
  return { transactions, totalByTransactionType, totalAmount };
};

export const createTransaction = async (data: Transaction) => {
  const transaction = await prisma.transactions.create({ data });
  return transaction;
};

export const getTransactionById = async (id: string) => {
  const transaction = await prisma.transactions.findUnique({ where: { id } });
  return transaction;
};

export const updateTransaction = async ({ id, ...data }: Transaction) => {
  const transaction = await prisma.transactions.update({
    where: { id },
    data,
  });
  return transaction;
};

export const deleteTransaction = async (id: string) => {
  const transaction = await prisma.transactions.update({
    where: { id },
    data: { deleted: true },
  });
  return transaction;
};
