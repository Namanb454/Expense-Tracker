import React, { useState } from 'react';
import { toast } from 'react-toastify';

const ExpenseForm = ({ onAddExpense }) => {
    const [formData, setFormData] = useState({
        amount: '',
        category: '',
        date: '',
        description: ''
    });

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!formData.amount || parseFloat(formData.amount) <= 0) {
            newErrors.amount = 'Amount must be a positive number';
        }
        if (!formData.category) {
            newErrors.category = 'Category is required';
        }
        if (!formData.date) {
            newErrors.date = 'Date is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear specific error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error('Please fix form errors');
            return;
        }

        try {
            await onAddExpense({
                ...formData,
                amount: parseFloat(formData.amount)
            });

            // Reset form after successful submission
            setFormData({
                amount: '',
                category: '',
                date: '',
                description: ''
            });

            toast.success('Expense added successfully!');
        } catch (error) {
            toast.error('Failed to add expense. Please try again.');
        }
    };

    const categories = [
        'Food', 'Transport', 'Entertainment', 'Utilities', 'Other'
    ];

    return (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Add New Expense</h2>
            <form onSubmit={handleSubmit} className="space-y-4 text-black">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <input
                            type="number"
                            name="amount"
                            placeholder="Amount"
                            value={formData.amount}
                            onChange={handleChange}
                            className={`w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 
                ${errors.amount ? 'border-red-500 focus:ring-red-500' : 'focus:ring-[#3B82F6]'}`}
                        />
                        {errors.amount && (
                            <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
                        )}
                    </div>
                    <div>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className={`w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2
                ${errors.category ? 'border-red-500 focus:ring-red-500' : 'focus:ring-[#3B82F6]'}`}
                        >
                            <option value="">Select Category</option>
                            {categories.map(category => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                        {errors.category && (
                            <p className="text-red-500 text-sm mt-1">{errors.category}</p>
                        )}
                    </div>
                </div>

                <div>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className={`w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2
              ${errors.date ? 'border-red-500 focus:ring-red-500' : 'focus:ring-[#3B82F6]'}`}
                    />
                    {errors.date && (
                        <p className="text-red-500 text-sm mt-1">{errors.date}</p>
                    )}
                </div>

                <input
                    type="text"
                    name="description"
                    placeholder="Description (Optional)"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
                />

                <button
                    type="submit"
                    className="w-full bg-[#3B82F6] text-white p-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                    Add Expense
                </button>
            </form>
        </div>
    );
};

export default ExpenseForm;