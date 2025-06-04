'use client';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import { useSummaryData } from './hooks/useSummaryData';


export default function Home() {
  const { expenses, categorySummary, totalExpenses, totalAmount, isLoading, error } = useSummaryData();

  const handleDeleteExpense = (id: number) => {
    // Implement your delete logic here
  };

  return (
    <div className="h-screen bg-gray-50 py-32 overflow-y-auto">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your expenses</p>
        </div>
        
        <ExpenseForm />
        
        <ExpenseList 
          expenses={expenses} 
          onDeleteExpense={handleDeleteExpense}
        />
      </div>
    </div>
  );
}