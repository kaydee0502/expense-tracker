'use client';

interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
  description: string;
}

interface ExpenseListProps {
  expenses: Expense[];
  onDeleteExpense: (id: string) => void;
}

export default function ExpenseList({ expenses, onDeleteExpense }: ExpenseListProps) {
  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  if (expenses.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <p className="text-gray-500 text-lg">No expenses recorded yet.</p>
        <p className="text-gray-400 mt-2">Add your first expense using the form above.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Your Expenses</h2>
        <div className="text-right">
          <p className="text-sm text-gray-600">Total Amount</p>
          <p className="text-2xl font-bold text-blue-600">${totalAmount.toFixed(2)}</p>
        </div>
      </div>

      <div className="space-y-3">
        {expenses.map((expense) => (
          <div key={expense.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-medium text-gray-900">{expense.title}</h3>
                  <span className="text-xl font-semibold text-green-600">${expense.amount.toFixed(2)}</span>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {expense.category}
                  </span>
                  <span>{new Date(expense.date).toLocaleDateString()}</span>
                </div>
                
                {expense.description && (
                  <p className="text-gray-700 text-sm">{expense.description}</p>
                )}
              </div>
              
              <button
                onClick={() => onDeleteExpense(expense.id)}
                className="ml-4 text-red-500 hover:text-red-700 focus:outline-none"
                title="Delete expense"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}