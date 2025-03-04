import React from 'react';
import ExpenseItem from './ExpenseItem';

const ExpenseList = ({ expenses }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6 text-left h-fit">
            <h3 className="text-2xl font-bold mb-4 text-gray-800 text-center">Expense List</h3>
            {expenses.length === 0 ? (
                <p className="text-gray-500 text-left">No expenses recorded yet.</p>
            ) : (
                <div>
                    {expenses.map((expense, idx) => (
                        <ExpenseItem key={idx} expense={expense} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ExpenseList;