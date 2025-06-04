'use client';

import { useSummaryData } from '../hooks/useSummaryData';
import OverviewCards from '../components/summary/OverviewCards';
import CategoryList from '../components/summary/CategoryList';
import CategoryDistribution from '../components/summary/CategoryDistribution';
import RecentExpensesTable from '../components/summary/RecentExpensesTable';

export default function SummaryPage() {
  const { expenses, categorySummary, totalExpenses, totalAmount } = useSummaryData();

  return (
    <div className="h-screen bg-gray-50 py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Expense Summary</h1>
          <p className="text-gray-600 mt-2">Overview of your spending patterns</p>
        </div>

        {/* Overview Cards */}
        <OverviewCards 
          totalAmount={totalAmount}
          totalExpenses={totalExpenses}
          totalCategories={categorySummary.length}
        />

        {/* Category Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <CategoryList categorySummary={categorySummary} />
          <CategoryDistribution categorySummary={categorySummary} />
        </div>

        {/* Recent Expenses */}
        <RecentExpensesTable expenses={expenses} limit={5} />
      </div>
    </div>
  );
}