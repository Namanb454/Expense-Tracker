import React from 'react';

const ExpenseItem = ({ expense }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 mb-2 flex justify-between items-center">
            <div>
                <h4 className="font-bold text-gray-800">{expense.category}</h4>
                <p className="text-gray-600">{expense.description}</p>
            </div>
            <div className="text-right">
                <span className="text-green-600 font-semibold">&#8377;{expense.amount}</span>
                <p className="text-gray-500 text-sm">{expense.date}</p>
            </div>
        </div>
    );
};

export default ExpenseItem;