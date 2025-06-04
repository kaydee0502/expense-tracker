import { CategorySummary } from '@/app/types/expense';

interface CategoryListProps {
  categorySummary: CategorySummary[];
}

export default function CategoryList({ categorySummary }: CategoryListProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getCategoryColor = (index: number) => {
    const colors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-yellow-500',
      'bg-red-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-gray-500'
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Spending by Category</h2>
      <div className="space-y-4">
        {categorySummary.map((category, index) => (
          <div key={category.category} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <div className={`w-4 h-4 rounded-full ${getCategoryColor(index)} mr-3`}></div>
              <div>
                <p className="font-medium text-gray-900">{category.category}</p>
                <p className="text-sm text-gray-600">{category.count} expense{category.count !== 1 ? 's' : ''}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-900">{formatCurrency(category.total)}</p>
              <p className="text-sm text-gray-600">{category.percentage.toFixed(1)}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}