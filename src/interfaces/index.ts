export interface User {
  id?: string;
  name: string;
  email: string;
  password: string;
}

export interface Transaction {
  id?: string;
  amount: number;
  type: "INCOME" | "DISCHARGE";
  description: string;
  userId: string;
}

export interface UserWithTransactions extends User {
  transactions: Transaction[];
}

export interface transactionWithUser extends Transaction {
  user: User;
}
