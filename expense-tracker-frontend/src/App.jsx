import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { apiService } from "./services/apiService";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseFilter from "./components/ExpenseFilter";
import ExpenseSummary from "./components/ExpenseSummary";
import './App.css'

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async (filters = {}) => {
    try {
      setIsLoading(true);
      const fetchedExpenses = await apiService.getExpenses(filters);
      setExpenses(fetchedExpenses);
      setFilteredExpenses(fetchedExpenses);
    } catch (error) {
      toast.error('Failed to fetch expenses');
    } finally {
      setIsLoading(false);
    }
  };

  const addExpense = async (expenseData) => {
    try {
      const newExpense = await apiService.addExpense(expenseData);
      // Refresh expenses to get updated list
      fetchExpenses();
      return newExpense;
    } catch (error) {
      toast.error('Failed to add expense');
      throw error;
    }
  };

  const handleFilterChange = async (filters) => {
    try {
      setIsLoading(true);
      const filteredExpensesData = await apiService.getExpenses(filters);
      setFilteredExpenses(filteredExpensesData);
    } catch (error) {
      toast.error('Failed to filter expenses');
    } finally {
      setIsLoading(false);
    }
  };

  const calculateTotalExpenses = async (filters = {}) => {
    try {
      return await apiService.getTotalExpenses(filters);
    } catch (error) {
      toast.error('Failed to calculate total expenses');
      return { total: 0, count: 0 };
    }
  };

  return (
    <>
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Expense Tracker
      </h1>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      <div className="min-h-screen bg-background p-8 md:grid grid-cols-2 gap-8">

        <div className="max-w-5xl mx-auto">

          <ExpenseForm onAddExpense={addExpense} />

          <ExpenseFilter onFilterChange={handleFilterChange} />

          <ExpenseSummary
            calculateTotalExpenses={calculateTotalExpenses}
            filteredExpensesCount={filteredExpenses.length}
          />

        </div>
          {isLoading ? (
            <div className="text-center py-4">
              <p>Loading expenses...</p>
            </div>
          ) : (
            <ExpenseList expenses={filteredExpenses} />
          )}
      </div>
    </>
  );
};

export default App;