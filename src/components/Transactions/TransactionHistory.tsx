"use client";
import React, { useEffect, useState } from "react";
import { TransactionList } from "./components";
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
  }, [session]);

  const handleFetchTransactions = async (id: string) => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/transactions/user/${id}`, {
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
    <div className="flex justify-center items-center">
      <div className="p-10 pt-3 rounded-md w-full">
        <TransactionList
          isLoading={isLoading}
          transactions={transactions}
          handleFetchTransactions={handleFetchTransactions}
        />
      </div>
    </div>
  );
}
