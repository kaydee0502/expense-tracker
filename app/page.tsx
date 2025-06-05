'use client';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import { useSummaryData } from './hooks/useSummaryData';
import { useDeleteExpenseMutation } from './store/api/expenseApi';


export default function Home() {
  const { expenses, isLoading, error } = useSummaryData();
  const [deleteExpense, { isLoading: isDeleting }] = useDeleteExpenseMutation();

  const handleDeleteExpense = async (id: number) => {
    if (!confirm('Are you sure you want to delete this expense?')) {
      return;
    }

    try {
      await deleteExpense(id).unwrap();
      alert('Expense deleted successfully!');
    } catch (error) {
      console.error('Failed to delete expense:', error);
      alert('Failed to delete expense. Please try again.');
    }
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