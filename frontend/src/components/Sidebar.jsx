import React, { useContext } from "react";
import logo2 from "../assets/Unified-Logo2.png";
import { GoGraph } from "react-icons/go";
import { FaRegCreditCard } from "react-icons/fa6";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { GiExpense } from "react-icons/gi";
import { IoLogOut } from "react-icons/io5";
import { FaArrowsDownToLine, FaArrowsUpToLine } from "react-icons/fa6";
import { AppContext } from "../context/AppContext";
import { NavLink, useNavigate } from "react-router-dom";
import cookie from "js-cookie";
const Sidebar = () => {
  const { token, setToken } = useContext(AppContext);

  const navigate = useNavigate();

  const handleLogOut = () => {
    cookie.remove("token");
    setToken(false);
    setIncomeData([]);
    setExpenseData([]);
    navigate("/login");
  };
  return (
    <div className="bg-gradient-to-l from-black to-gray-700 h-screen w-55">
      <div className="mt-3 mb-3 py-5 px-2 flex flex-y gap-4">
        <img
          src={logo2}
          onClick={() => navigate("/")}
          alt="Logo"
          className="w-12 block md:block"
        />
        <div className="w-25 h-8 text-lg text-white font-semibold ">
          <span className="text-red-400 text-3xl">Finance</span>
          <span> Tracker</span>
        </div>
      </div>
      <div className="flex flex-row justify-center lg:hover:bg-red-500 lg:border-none hover:border-1-2 border-red-500 text-left gap-5 py-2 px-2">
        <NavLink
          to={"/"}
          className="w-full flex flex-row text-left gap-2 py-2 px-2 rounded-lg cursor-pointer"
        >
          <GoGraph className="text-2xl text-white" />
          <p className="text-lg font-semibold hidden md:block text-white">
            Dashboard
          </p>
        </NavLink>
      </div>
      <div className="flex flex-row justify-center lg:hover:bg-red-500 lg:border-none hover:border-1-2 border-red-500 text-left gap-5 py-2 px-2">
        <NavLink
          to={"/view-transaction"}
          className="w-full flex flex-row  text-left gap-2 py-2 px-2 rounded-lg cursor-pointer"
        >
          <FaRegCreditCard className="text-2xl text-white" />
          <p className="text-lg font-semibold hidden md:block text-white">
            Transactions
          </p>
        </NavLink>
      </div>
      <div className="flex flex-row justify-center lg:hover:bg-red-500 lg:border-none hover:border-1-2 border-red-500 text-left gap-5 py-2 px-2">
        <NavLink
          to={"/income-transactions"}
          className="w-full flex flex-row  text-left gap-2 py-2 px-2 rounded-lg cursor-pointer"
        >
          <FaArrowsDownToLine className="text-2xl text-white" />
          <p className="text-lg font-semibold hidden md:block text-white">
            Income History
          </p>
        </NavLink>
      </div>
      <div className="flex flex-row justify-center lg:hover:bg-red-500 lg:border-none hover:border-1-2 border-red-500 text-left gap-5 py-2 px-2">
        <NavLink
          to={"/expense-transactions"}
          className="w-full flex flex-row  text-left gap-2 py-2 px-2 rounded-lg cursor-pointer"
        >
          <FaArrowsUpToLine className="text-2xl text-white" />
          <p className="text-lg font-semibold hidden md:block text-white">
            Expense History
          </p>
        </NavLink>
      </div>
      <div className="flex flex-row justify-center lg:hover:bg-red-500 lg:border-none hover:border-1-2 border-red-500 text-left gap-5 py-2 px-2">
        <NavLink
          to={"/add-income"}
          className="w-full flex flex-row  text-left gap-2 py-2 px-2 rounded-lg cursor-pointer"
        >
          <FaMoneyBillTrendUp className="text-2xl text-white" />
          <p className="text-lg font-semibold hidden md:block text-white">
            Income
          </p>
        </NavLink>
      </div>
      <div className="flex flex-row justify-center lg:hover:bg-red-500 lg:border-none hover:border-1-2 border-red-500 text-left gap-5 py-2 px-2">
        <NavLink
          to={"/add-expense"}
          className="w-full flex flex-row  text-left gap-2 py-2 px-2 rounded-lg cursor-pointer"
        >
          <GiExpense className="text-2xl text-white" />
          <p className="text-lg font-semibold hidden md:block text-white">
            Expense
          </p>
        </NavLink>
      </div>
      <div className="flex flex-row justify-center lg:hover:bg-red-500 lg:border-none hover:border-1-2 border-red-500 text-left gap-5 py-2 px-2">
        {token ? (
          <NavLink
            onClick={handleLogOut}
            className="w-full flex flex-row  text-left gap-2 py-2 px-2 rounded-lg cursor-pointer"
          >
            <IoLogOut className="text-2xl text-white" />
            <p className="text-lg font-semibold hidden md:block text-white">
              LogOut
            </p>
          </NavLink>
        ) : (
          <NavLink
            to={"/login"}
            className="w-full flex flex-row  justify-center gap-2 py-2 px-2 rounded-lg cursor-pointer"
          >
            <IoLogOut className="text-2xl text-white" />
            <p className="text-lg font-semibold hidden md:block text-white">
              LogIn
            </p>
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
