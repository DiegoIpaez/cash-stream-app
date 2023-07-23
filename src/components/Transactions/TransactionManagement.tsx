"use client";
import React, { useEffect, useState } from "react";
import { TransactionForm, TransactionList } from "./components";
import formatCurrency from "@/helpers/formatCurrency.helper";
import { useSession } from "next-auth/react";

export default function TransactionManagement() {
  const { data: session } = useSession();

  const [transactions, setTransactions] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | undefined>();

  useEffect(() => {
    setUserId(session?.user.id);
  }, [session])

  const handleFetchTransactions = async (id: string) => {
    try {
      setIsLoading(true);
      const params = { limit: "4" };
      const queryParams = new URLSearchParams(params);

      const res = await fetch(`/api/transactions/user/${id}?${queryParams}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      setTransactions(data.transactions);
      setTotalAmount(data.totalAmount);
      setTotalIncome(data.totalIncome);
      setTotalExpense(data.totalDischarge);
    } catch (error) {
      setTransactions([]);
      setTotalAmount(0);
      setTotalIncome(0);
      setTotalExpense(0);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchTransactions = async (userId: string) => {
      try {
        await handleFetchTransactions(userId);
      } catch (error) {
        console.log(error);
      }
    };
    userId && fetchTransactions(userId);
  }, [userId]);

  return (
    <div className="flex flex-col md:flex-row justify-between gap-4">
      <div className="flex-1 mt-4">
        <div className="flex justify-between my-2">
          <h4>Income</h4>
          <p>${formatCurrency(totalIncome)}</p>
        </div>
        <div className="flex justify-between my-2">
          <h4>Expense</h4>
          <p>${formatCurrency(totalExpense)}</p>
        </div>
        <div className="flex justify-between items-center mt-4 mb-2">
          <h4 className="text-slate-400">Your Balance: </h4>
        </div>
        <div className="flex justify-between items-center mt-2 mb-4">
          <h3 className="text-2xl font-bold">${formatCurrency(totalAmount)}</h3>
        </div>
        <TransactionForm userId={userId} handleFetchTransactions={handleFetchTransactions} />
      </div>
      <div className="flex-1 flex flex-col mt-4">
        <div className="bg-gray-800 p-4 my-2">
          <div className="h-full flex items-center justify-center w-full flex-col">
            <div className="text-9xl" />
            <h2 className="text-slate-200 text-2xl font-bold my-2">
              No data yet
            </h2>
          </div>
        </div>
        <TransactionList
          isLoading={isLoading}
          transactions={transactions}
          handleFetchTransactions={handleFetchTransactions}
        />
      </div>
    </div>
  );
}
