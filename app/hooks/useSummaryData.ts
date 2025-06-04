'use client';

import { useMemo } from 'react';
import { useGetExpensesQuery } from '../store/api/expenseApi';
import { Expense, CategorySummary } from '../types/expense';

export function useSummaryData() {
  const { data: expenses = [], isLoading, error } = useGetExpensesQuery();

  const summaryData = useMemo(() => {
    const totalAmount = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
    const totalExpenses = expenses.length;

    // Group by category
    const categoryMap = new Map<string, { count: number; total: number }>();
    
    expenses.forEach(expense => {
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
    const categorySummary: CategorySummary[] = Array.from(categoryMap.entries()).map(([category, data]) => ({
      category,
      count: data.count,
      total: data.total,
      percentage: totalAmount > 0 ? (data.total / totalAmount) * 100 : 0
    })).sort((a, b) => b.total - a.total);

    return {
      expenses,
      categorySummary,
      totalExpenses,
      totalAmount,
      isLoading,
      error
    };
  }, [expenses, isLoading, error]);

  return summaryData;
}