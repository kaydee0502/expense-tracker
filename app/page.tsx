'use client';

import { useState } from 'react';
import Header from './components/Header';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';

interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
  description: string;
}

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const handleAddExpense = (expenseData: Omit<Expense, 'id'>) => {
    const newExpense: Expense = {
      ...expenseData,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
    };
    
    setExpenses(prev => [newExpense, ...prev]);
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