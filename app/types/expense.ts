export interface Expense {
  id: number;
  title: string;
  amount: string;
  category: string;
  date: string;
  desc: string;
  created_at: string;
  updated_at: string;
}

export interface CategorySummary {
  category: string;
  count: number;
  total: number;
  percentage: number;
}

// For form submissions (without server-generated fields)
export interface CreateExpenseRequest {
  title: string;
  amount: string;
  category: string;
  date: string;
  desc: string;
}