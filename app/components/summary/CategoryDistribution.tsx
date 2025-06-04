import { CategorySummary } from '@/app/types/expense';

interface CategoryDistributionProps {
  categorySummary: CategorySummary[];
}

export default function CategoryDistribution({ categorySummary }: CategoryDistributionProps) {
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
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Category Distribution</h2>
      <div className="space-y-3">
        {categorySummary.map((category, index) => (
          <div key={category.category}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-700">{category.category}</span>
              <span className="text-gray-600">{category.percentage.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full ${getCategoryColor(index)}`}
                style={{ width: `${category.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}