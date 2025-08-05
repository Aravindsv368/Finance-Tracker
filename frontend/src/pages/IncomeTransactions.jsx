import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { FiTrash2 } from "react-icons/fi";

const IncomeTransactions = () => {
  const { incomeData, deleteIncome } = useContext(AppContext);

  const handleDelete = (id) => {
    deleteIncome(id);
  };

  return (
    <div className="max-w-full p-4 mt-14">
      <h1 className="text-3xl font-semibold mb-6 text-start">
        Income Transactions
      </h1>
      <div className="overflow-x-auto pr-8">
        <table className="w-full table-auto border-collapse bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="bg-gray-300 text-gray-700 uppercase text-sm">
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Amount</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {incomeData.map((transaction, index) => (
              <tr
                key={index}
                className="border-b last:border-none hover:bg-gray-50 transition-colors"
              >
                <td className="p-4 text-left">{transaction.title}</td>
                <td className="p-4 text-left">{transaction.category}</td>
                <td className="p-4 text-left">
                  {new Date(transaction.date).toLocaleDateString()}
                </td>
                <td className="p-4 text-left text-green-500 font-semibold">
                  $ {transaction.amount}
                </td>
                <td className="p-4 text-left pl-8">
                  <button
                    onClick={() => handleDelete(transaction._id)}
                    className="text-red-500 hover:text-red-700 transition-colors cursor-pointer"
                  >
                    <FiTrash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IncomeTransactions;
