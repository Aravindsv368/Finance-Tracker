import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import cookie from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [expenseData, setExpenseData] = useState([]);
  const [incomeData, setIncomeData] = useState([]);
  const [token, setToken] = useState(Boolean(cookie.get("token")));
  const backenUrl = "http://localhost:4000";

  const userToken = cookie.get("token");

  const fetchIncome = async () => {
    try {
      if (!userToken || typeof userToken !== "string") return;

      const decodedToken = jwtDecode(userToken);
      const userId = decodedToken?.id;
      if (!userId) return;

      const { data } = await axios.get(`${backenUrl}/api/user/get-income`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });

      if (data.success) {
        setIncomeData(data.data);
      }
    } catch (error) {
      console.log("fetchIncome error:", error.message);
    }
  };

  const fetchExpense = async () => {
    try {
      if (!userToken || typeof userToken !== "string") return;

      const decodedToken = jwtDecode(userToken);
      const userId = decodedToken?.id;
      if (!userId) return;

      const { data } = await axios.get(`${backenUrl}/api/user/get-expense`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });

      if (data.success) {
        setExpenseData(data.data);
      }
    } catch (error) {
      console.log("fetchExpense error:", error.message);
    }
  };

  const addIncome = async (
    title,
    amount,
    income,
    category,
    description,
    date
  ) => {
    try {
      const { data } = await axios.post(
        `${backenUrl}/api/user/add-income`,
        { title, amount, income, category, description, date },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        fetchIncome();
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addExpense = async (
    title,
    amount,
    income,
    category,
    description,
    date
  ) => {
    try {
      const { data } = await axios.post(
        `${backenUrl}/api/user/add-expense`,
        { title, amount, income, category, description, date },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        fetchExpense();
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //update, delete, functionality
  const updateIncome = async (
    id,
    title,
    amount,
    category,
    description,
    date
  ) => {
    try {
      const { data } = await axios.put(
        `${backenUrl}/api/user/update-income/${id}`,
        { title, amount, category, description, date },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      // toast.error("Failed to update income");
    }
  };

  const updateExpense = async (
    id,
    title,
    amount,
    category,
    description,
    date
  ) => {
    try {
      const { data } = await axios.put(
        `${backenUrl}/api/user/update-expense/${id}`,
        { title, amount, category, description, date },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update expense");
    }
  };

  const deleteIncome = async (id) => {
    try {
      const { data } = await axios.delete(
        `${backenUrl}/api/user/delete-income/${id}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      // toast.error("Failed to delete income");
    }
  };

  const deleteExpense = async (id) => {
    try {
      const { data } = await axios.delete(
        `${backenUrl}/api/user/delete-expense/${id}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      //   toast.error("Failed to delete expense");
    }
  };

  const handleRegister = async (name, email, password) => {
    try {
      const { data } = await axios.post(
        `${backenUrl}/api/user/register`,
        { name, email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (data.success) {
        cookie.set("token", data.token, { expires: 7 });
        setToken(true);
        fetchIncome();
        fetchExpense();
        toast.success(data.message || "Register successfull");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async (email, password) => {
    try {
      const { data } = await axios.post(
        `${backenUrl}/api/user/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (data.success) {
        cookie.set("token", data.token, { expires: 7 });
        setToken(true);
        fetchIncome();
        fetchExpense();
        toast.success(data.message || "Login successfull");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  useEffect(() => {
    const currentToken = cookie.get("token");

    if (currentToken) {
      fetchIncome();
      fetchExpense();
    }
  }, []);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${cookie.get(
        "token"
      )}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  const values = {
    backenUrl,
    handleRegister,
    handleLogin,
    fetchIncome,
    fetchExpense,
    addIncome,
    addExpense,
    updateIncome,
    updateExpense,
    deleteIncome,
    deleteExpense,
    incomeData,
    expenseData,
    token,
    setToken,
    setIncomeData,
    setExpenseData,
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
