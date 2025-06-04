import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Expense, CreateExpenseRequest } from '../../types/expense';
import { getApiUrl } from '../../../src/config/api';

export const expenseApi = createApi({
  reducerPath: 'expenseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: getApiUrl('EXPENSES'),
  }),
  tagTypes: ['Expense'],
  endpoints: (builder) => ({
    getExpenses: builder.query<Expense[], void>({
      query: () => '',
      providesTags: ['Expense'],
    }),
    createExpense: builder.mutation<Expense, CreateExpenseRequest>({
      query: (expense) => ({
        url: '',
        method: 'POST',
        body: expense,
      }),
      invalidatesTags: ['Expense'],
    }),
    updateExpense: builder.mutation<Expense, { id: number; expense: Partial<CreateExpenseRequest> }>({
      query: ({ id, expense }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: expense,
      }),
      invalidatesTags: ['Expense'],
    }),
    deleteExpense: builder.mutation<void, number>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Expense'],
    }),
  }),
});

export const {
  useGetExpensesQuery,
  useCreateExpenseMutation,
  useUpdateExpenseMutation,
  useDeleteExpenseMutation,
} = expenseApi;