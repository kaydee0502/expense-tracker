'use client';

import { useEffect, useState } from 'react';
import Header from './components/Header';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import { ExpenseData } from './interfaces/expense';
import { createExpense, getExpenses } from '@/utils/api';

interface Expense {
  id: string;
  title: string;
  amount: string;
  category: string;
  date: string;
  description: string;
}

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    const loadExpenses = async () => {
      try {
        const expenses = await getExpenses();
        setExpenses(expenses);
      } catch (error) {
        console.error('Failed to load expenses:', error);
      }
    };

    loadExpenses();
  }, []);

  const handleAddExpense = async (expenseData: Omit<Expense, 'id'>) => {
    try {
      const apiExpenseData: ExpenseData = {
        title: expenseData.title,
        amount: expenseData.amount,
        category: expenseData.category,
        date: expenseData.date,
        desc: expenseData.description
      };
      
      const newExpense = await createExpense(apiExpenseData);
      setExpenses(prev => [newExpense, ...prev]);
    } catch (error) {
      console.error('Failed to create expense:', error);
    }
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <ExpenseForm onAddExpense={handleAddExpense} />
          <ExpenseList 
            expenses={expenses} 
            onDeleteExpense={handleDeleteExpense}
          />
        </div>
      </main>
    </div>
  );
}