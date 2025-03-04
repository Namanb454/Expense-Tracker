import React, { useState, useEffect } from 'react';

const ExpenseSummary = ({ calculateTotalExpenses, filteredExpensesCount }) => {
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchTotalExpenses();
    }, []);

    const fetchTotalExpenses = async () => {
        try {
            setIsLoading(true);
            const result = await calculateTotalExpenses();
            setTotalExpenses(result.total);
        } catch (error) {
            console.error('Error fetching total expenses:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Expense Summary
            </h3>
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Total Expenses</p>
                    {isLoading ? (
                        <p className="text-gray-500">Calculating...</p>
                    ) : (
                        <p className="text-2xl font-bold text-[#3B82F6]">
                            &#8377;{totalExpenses.toFixed(2)}
                        </p>
                    )}
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Filtered Expenses</p>
                    <p className="text-2xl font-bold text-[#10B981]">
                        {filteredExpensesCount}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ExpenseSummary;