import React, { useContext, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { Routes, Route, useLocation } from "react-router-dom";
import { AppContext } from "./context/AppContext";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import History from "./components/History";
import ViewTransactions from "./pages/ViewTransactions";
import Income from "./pages/Income";
import Expenses from "./pages/Expenses";
import IncomeTransactions from "./pages/IncomeTransactions";
import ExpenseTransactions from "./pages/ExpenseTransactions";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./routes/ProtectedRoute";

const App = () => {
  const location = useLocation();
  const { token, fetchIncome, fetchExpense } = useContext(AppContext);

  useEffect(() => {
    if (token) {
      fetchIncome();
      fetchExpense();
    }
  }, [token, location.pathname]);

  return (
    <div className="flex flex-row w-full h-screen">
      <ToastContainer />

      {token && <Sidebar />}

      <div className="flex-1 max-h-screen w-full overflow-auto">
        <Routes>
          {/* Dashboard with History (side-by-side layout) */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <div className="flex flex-row w-full">
                  <div className="flex-1">
                    <Dashboard />
                  </div>
                  <div className="hidden lg:flex md:w-1/3">
                    <History />
                  </div>
                </div>
              </ProtectedRoute>
            }
          />

          {/* Other Protected Routes */}
          <Route
            path="/view-transaction"
            element={
              <ProtectedRoute>
                <ViewTransactions />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-income"
            element={
              <ProtectedRoute>
                <Income />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-expense"
            element={
              <ProtectedRoute>
                <Expenses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/income-transactions"
            element={
              <ProtectedRoute>
                <IncomeTransactions />
              </ProtectedRoute>
            }
          />
          <Route
            path="/expense-transactions"
            element={
              <ProtectedRoute>
                <ExpenseTransactions />
              </ProtectedRoute>
            }
          />

          {/* Auth Routes (public) */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
