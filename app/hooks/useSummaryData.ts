'use client';

import { useState, useEffect } from 'react';
import { Expense, CategorySummary } from '@/app/types/expense';

export function useSummaryData() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categorySummary, setCategorySummary] = useState<CategorySummary[]>([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  // Mock data - replace with actual data fetching
  useEffect(() => {
    const mockExpenses: Expense[] = [
      { id: '1', title: 'Groceries', amount: '150.00', category: 'Food & Dining', date: '2024-01-15', description: 'Weekly groceries' },
      { id: '2', title: 'Gas', amount: '45.00', category: 'Transportation', date: '2024-01-14', description: 'Fuel' },
      { id: '3', title: 'Movie tickets', amount: '25.00', category: 'Entertainment', date: '2024-01-13', description: 'Weekend movie' },
      { id: '4', title: 'Coffee', amount: '12.50', category: 'Food & Dining', date: '2024-01-12', description: 'Morning coffee' },
      { id: '5', title: 'Electricity bill', amount: '89.00', category: 'Bills & Utilities', date: '2024-01-11', description: 'Monthly bill' },
    ];
    
    setExpenses(mockExpenses);
    calculateSummary(mockExpenses);
  }, []);

  const calculateSummary = (expenseList: Expense[]) => {
    const total = expenseList.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
    setTotalAmount(total);
    setTotalExpenses(expenseList.length);

    // Group by category
    const categoryMap = new Map<string, { count: number; total: number }>();
    
    expenseList.forEach(expense => {
      const category = expense.category;
      const amount = parseFloat(expense.amount);
      
      if (categoryMap.has(category)) {
        const existing = categoryMap.get(category)!;
        categoryMap.set(category, {
          count: existing.count + 1,
          total: existing.total + amount
        });
      } else {
        categoryMap.set(category, { count: 1, total: amount });
      }
    });

    // Convert to array with percentages
    const summary: CategorySummary[] = Array.from(categoryMap.entries()).map(([category, data]) => ({
      category,
      count: data.count,
      total: data.total,
      percentage: total > 0 ? (data.total / total) * 100 : 0
    })).sort((a, b) => b.total - a.total);

    setCategorySummary(summary);
  };

  return {
    expenses,
    categorySummary,
    totalExpenses,
    totalAmount
  };
}