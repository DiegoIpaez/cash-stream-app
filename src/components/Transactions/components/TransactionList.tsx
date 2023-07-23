import Link from "next/link";
import { Transaction } from "@/interfaces";
import { TransactionItem } from "./TransactionItem";
import Skeleton from "../../UI/Skeleton";

interface Props {
  isLoading: boolean;
  transactions: Transaction[];
  handleFetchTransactions: (id: string) => Promise<void>;
}

export function TransactionList({
  isLoading,
  transactions,
  handleFetchTransactions,
}: Props) {
  if (!isLoading && transactions.length === 0) {
    return (
      <div className="bg-gray-800 p-4 my-2">
        <div className="h-full flex items-center justify-center w-full flex-col">
          <h1 className="text-slate-300 text-xl font-bold my-2">
            There are no transactions yet
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 p-4">
      <Link href="/history">
        <h3 className="text-slate-300 text-xl font-bold mt-2 mb-3 text-center">
          History
        </h3>
      </Link>
      {isLoading ? (
        <div className="pb-2">
          <Skeleton />
          <Skeleton />
        </div>
      ) : (
        <ul>
          {transactions.map((transaction: Transaction) => (
            <TransactionItem
              key={transaction?.id ?? ""}
              transaction={transaction}
              handleFetchTransactions={handleFetchTransactions}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
