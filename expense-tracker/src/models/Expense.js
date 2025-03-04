const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: [true, 'Amount is required'],
        min: [0, 'Amount must be a positive number']
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: ['Food', 'Transport', 'Entertainment', 'Utilities', 'Other']
    },
    date: {
        type: Date,
        required: [true, 'Date is required']
    },
    description: {
        type: String,
        trim: true,
        maxlength: [500, 'Description cannot be more than 500 characters']
    }
}, {
    timestamps: true
});

ExpenseSchema.index({ date: 1, category: 1 });

module.exports = mongoose.model('Expense', ExpenseSchema);