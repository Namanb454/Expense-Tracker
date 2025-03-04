// src/services/apiService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/expenses';

export const apiService = {
    async getExpenses(filters = {}) {
        try {
            const queryParams = new URLSearchParams();

            // Add filters to query params
            if (filters.category) queryParams.append('category', filters.category);
            if (filters.startDate) queryParams.append('startDate', filters.startDate);
            if (filters.endDate) queryParams.append('endDate', filters.endDate);

            const response = await axios.get(`${API_BASE_URL}?${queryParams}`);
            return response.data.data;
        } catch (error) {
            console.error('Error fetching expenses:', error);
            throw error;
        }
    },

    async addExpense(expenseData) {
        try {
            const response = await axios.post(API_BASE_URL, expenseData);
            return response.data.data;
        } catch (error) {
            console.error('Error adding expense:', error);
            throw error;
        }
    },

    async getTotalExpenses(filters = {}) {
        try {
            const queryParams = new URLSearchParams();

            if (filters.startDate) queryParams.append('startDate', filters.startDate);
            if (filters.endDate) queryParams.append('endDate', filters.endDate);

            const response = await axios.get(`${API_BASE_URL}/total?${queryParams}`);
            return response.data.data;
        } catch (error) {
            console.error('Error fetching total expenses:', error);
            throw error;
        }
    }
};