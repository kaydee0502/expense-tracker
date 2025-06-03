import { getApiUrl } from '@/config/api';
import { ExpenseData } from '../../app/interfaces/expense';

export const createExpense = async (expenseData: ExpenseData) => {
  const response = await fetch(getApiUrl('EXPENSES'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ expense: expenseData }),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  return response.json();
};

export const getExpenses = async () => {
  const response = await fetch(getApiUrl('EXPENSES'), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  return response.json();
};