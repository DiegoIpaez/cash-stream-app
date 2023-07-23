import TransactionManagement from "@/components/Transactions/TransactionManagement";

export default function Cash() {
  return (
    <div className="text-white flex justify-center items-center mt-3">
      <div className="flex justify-center items-center">
        <div className="bg-gray-900 m-4 p-10 rounded-md w-full">
          <div className="text-3xl font-bold text-center mb-4">
            Expense Tracker
          </div>
          <TransactionManagement />
        </div>
      </div>
    </div>
  );
}
