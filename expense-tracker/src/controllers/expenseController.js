const Expense = require('../models/Expense');
const { sendSuccessResponse, sendErrorResponse } = require('../utils/responseHandler');

exports.createExpense = async (req, res) => {
    try {
        const expense = new Expense(req.body);
        await expense.save();
        sendSuccessResponse(res, expense, 201);
    } catch (error) {
        sendErrorResponse(res, error, 400);
    }
};

exports.getExpenses = async (req, res) => {
    try {
        const { category, startDate, endDate } = req.query;

        const filter = {};
        if (category) filter.category = category;
        if (startDate && endDate) {
            filter.date = {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            };
        }

        const expenses = await Expense.find(filter).sort({ date: -1 });
        sendSuccessResponse(res, expenses);
    } catch (error) {
        sendErrorResponse(res, error, 500);
    }
};

exports.getTotalExpenses = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        const filter = startDate && endDate
            ? {
                date: {
                    $gte: new Date(startDate),
                    $lte: new Date(endDate)
                }
            }
            : {};

        const expenses = await Expense.find(filter);
        const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

        sendSuccessResponse(res, {
            total,
            count: expenses.length
        });
    } catch (error) {
        sendErrorResponse(res, error, 500);
    }
};