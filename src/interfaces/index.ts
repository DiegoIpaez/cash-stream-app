export interface UserSession {
  id?: string;
  name: string;
  email: string;
}

export interface User extends UserSession {
  password: string;
}

export type TransactionType = "INCOME" | "DISCHARGE";

export interface Transaction {
  id?: string;
  amount: number;
  type: TransactionType;
  description: string;
  userId: string;
}

export interface UserWithTransactions extends User {
  transactions: Transaction[];
}

export interface transactionWithUser extends Transaction {
  user: User;
}

export interface SVGC {
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
  strokeLinecap?: "round" | "inherit" | "butt" | "square";
  strokeLinejoin?: "round" | "inherit" | "miter" | "bevel";
  strokeWidth?: number;
  className?: string;
  viewBox?: string;
}
