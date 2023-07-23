import { Transaction, TransactionType } from "@/interfaces";
import { useState } from "react";
import LoadingBtn from "@/components/UI/LoadingBtn";

interface Props {
  userId?: string;
  handleFetchTransactions: (id: string) => Promise<void>;
}

export function TransactionForm({ userId, handleFetchTransactions }: Props) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState<TransactionType>("INCOME");
  const [isLoadingBtn, setIsLoadingBtn] = useState(false);

  const createTransaction = async (payload: Transaction) => {
    try {
      setIsLoadingBtn(true);
      const res = await fetch("/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const newTransation = await res.json();
      if (newTransation) {
        await handleFetchTransactions(payload?.userId);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingBtn(false);
    }
  };

  const onSubmit = async (e: any) => {
    try {
      e.preventDefault();
      if (!userId) throw new Error('User Id not found.')
      const payload: Transaction = {
        description,
        amount: +amount,
        userId,
        type,
      };
      await createTransaction(payload);
      setDescription("");
      setAmount(0);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <select
          onChange={(e: any) => setType(e.target.value)}
          className="bg-zinc-600 text-white px-3 py-2 rounded-lg block mb-2 w-full"
          value={type}
        >
          <option value="INCOME">Income of money</option>
          <option value="DISCHARGE">Discharge of money</option>
        </select>
        <input
          type="text"
          onChange={(e: any) => setDescription(e.target.value)}
          placeholder="Enter a description"
          className="bg-zinc-600 text-white px-3 py-2 rounded-lg block mb-2 w-full"
          value={description}
        />
        <input
          type="number"
          onChange={(e: any) => setAmount(e.target.value)}
          step="0.01"
          placeholder="0.00"
          className="bg-zinc-600 text-white px-3 py-2 rounded-lg block mb-2 w-full"
          value={amount}
        />
        <LoadingBtn
          disabled={!description || !amount || isLoadingBtn}
          isLoading={isLoadingBtn}
          textContent="Add Transaction"
        />
      </form>
    </div>
  );
}
