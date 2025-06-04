export interface Expense {
  id: string;
  title: string;
  amount: string;
  category: string;
  date: string;
  description: string;
}

export interface CategorySummary {
  category: string;
  count: number;
  total: number;
  percentage: number;
}