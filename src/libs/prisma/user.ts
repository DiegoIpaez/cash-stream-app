import prisma from "./client";
import { User } from "@/interfaces";

export const createUser = async (data: User) => {
  const user = await prisma.users.create({ data });
  return user;
};

export const getUserById = async (id: string) => {
  const user = await prisma.users.findUnique({
    where: { id },
    include: { transactions: true },
  });
  return user;
};

export const updateUser = async ({ id, ...data }: User) => {
  const user = await prisma.users.update({
    where: { id },
    data,
  });
  return user;
};
