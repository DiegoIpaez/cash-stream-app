import formatCurrency from "@/helpers/formatCurrency.helper";
import { Transaction } from "@/interfaces";
import { useState } from "react";
import { DeleteOutline, LoadingOutline } from "@/components/UI/Icons/";

interface Props {
  transaction: Transaction;
  handleFetchTransactions: (id: string) => Promise<void>;
}

export function TransactionItem({
  transaction,
  handleFetchTransactions,
}: Props) {
  const { amount, description, type, id, userId } = transaction;
  const sign = type === "DISCHARGE" ? "-" : "+";

  const [itemDeleted, setItemDeleted] = useState({
    isLoading: false,
    key: id,
  });

  const deleteTransaction = async (id: string, userId: string) => {
    try {
      setItemDeleted((item) => ({ ...item, isLoading: true }));
      const res = await fetch("/api/transactions", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const newTransation = await res.json();
      if (newTransation) {
        await handleFetchTransactions(userId);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setItemDeleted((item) => ({ ...item, isLoading: false }));
    }
  };

  return (
    <li
      key={id}
      className={
        `bg-zinc-600 text-white px-3 py-1 rounded-lg mb-2 w-full flex justify-between items-center` +
        ` ${amount < 0 ? "bg-red-700" : "bg-green-700"}`
      }
    >
      <div className="flex justify-between items-center w-full">
        <span>{description}</span>
        <div className="flex items-center">
          <span
            className={` ${
              type === "DISCHARGE" ? "text-red-800" : "text-green-500"
            }`}
          >
            {sign}${formatCurrency(amount)}
          </span>
          <button
            onClick={() => deleteTransaction(id!, userId)}
            className="font-bold text-white rounded-lg ml-2"
          >
            {itemDeleted.key === id && itemDeleted.isLoading ? (
              <LoadingOutline width={17} />
            ) : (
              <DeleteOutline width={17} />
            )}
          </button>
        </div>
      </div>
    </li>
  );
}
