import prisma from "./client";
import { Transaction } from "@/interfaces";

const DEFAULT_TOTAL = {
  totalAmount: 0,
};

const getTotalDataByTransactionType = (data: Array<any>) => {
  const incomeData =
    data.find((item: any) => item._id === "INCOME") ?? DEFAULT_TOTAL;
  const dischargeData =
    data.find((item: any) => item._id === "DISCHARGE") ?? DEFAULT_TOTAL;

  return {
    totalIncome: incomeData.totalAmount,
    totalDischarge: dischargeData.totalAmount,
    totalAmount: incomeData.totalAmount + dischargeData.totalAmount,
  };
};

interface TransactionFilters {
  userId: string;
  limit?: number;
  orderBy?: "asc" | "desc";
}

export const getAllTransactionByUser = async ({
  userId,
  limit,
  orderBy = "desc"
}: TransactionFilters) => {
  const queries: { take?: number } = {}
  if (limit) queries.take = limit
  
  const transactions = await prisma.transactions.findMany({
    where: { userId, deleted: false },
    orderBy: { createdAt: orderBy },
    ...queries,
  });

  const totalByTransactionType: any = await prisma.transactions.aggregateRaw({
    pipeline: [
      { $match: { userId: { $oid: userId }, deleted: false } },
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

  const totalData = getTotalDataByTransactionType(totalByTransactionType);

  return { transactions, ...totalData };
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
