import React, { useState } from 'react';

const ExpenseFilter = ({ onFilterChange }) => {
    const [filter, setFilter] = useState({
        startDate: '',
        endDate: '',
        category: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedFilter = { ...filter, [name]: value };
        setFilter(updatedFilter);
        onFilterChange(updatedFilter);
    };

    const categories = [
        'All', 'Food', 'Transport', 'Entertainment',
        'Utilities', 'Other'
    ];

    return (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Filter Expenses
            </h3>
            <div className="grid md:grid-cols-3 gap-4 text-black">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Start Date
                    </label>
                    <input
                        type="date"
                        name="startDate"
                        value={filter.startDate}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-200 text-gray-400 font-light rounded-md focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        End Date
                    </label>
                    <input
                        type="date"
                        name="endDate"
                        value={filter.endDate}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-200 text-gray-400 font-light rounded-md focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                    </label>
                    <select
                        name="category"
                        value={filter.category}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-200 text-gray-400 font-light rounded-md focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
                    >
                        {categories.map(category => (
                            <option key={category} value={category === 'All' ? '' : category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default ExpenseFilter;