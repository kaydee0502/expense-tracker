import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ExpenseForm from '../ExpenseForm';

// Mock the API hook
const mockCreateExpense = jest.fn();
const mockUseCreateExpenseMutation = jest.fn();

jest.mock('../../store/api/expenseApi', () => ({
  useCreateExpenseMutation: () => mockUseCreateExpenseMutation()
}));

const mockStore = configureStore({
  reducer: { api: () => ({}) }
});

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <Provider store={mockStore}>{children}</Provider>
);

describe('ExpenseForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Default mock setup
    mockUseCreateExpenseMutation.mockReturnValue([
      mockCreateExpense,
      { isLoading: false }
    ]);
    
    mockCreateExpense.mockReturnValue({
      unwrap: jest.fn().mockResolvedValue({})
    });
  });

  test('renders form elements correctly', () => {
    render(
      <TestWrapper>
        <ExpenseForm />
      </TestWrapper>
    );

    expect(screen.getByText('Add New Expense')).toBeInTheDocument();
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/amount/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add expense/i })).toBeInTheDocument();
  });

  test('has required attributes on form fields', () => {
    render(
      <TestWrapper>
        <ExpenseForm />
      </TestWrapper>
    );

    const titleInput = screen.getByLabelText(/title/i);
    const amountInput = screen.getByLabelText(/amount/i);
    const categorySelect = screen.getByLabelText(/category/i);

    expect(titleInput).toHaveAttribute('required');
    expect(amountInput).toHaveAttribute('required');
    expect(categorySelect).toHaveAttribute('required');
  });

  test('displays all category options', () => {
    render(
      <TestWrapper>
        <ExpenseForm />
      </TestWrapper>
    );

    const expectedCategories = [
      'Food & Dining',
      'Transportation',
      'Shopping',
      'Entertainment',
      'Bills & Utilities',
      'Healthcare',
      'Travel',
      'Other'
    ];

    expectedCategories.forEach(category => {
      expect(screen.getByRole('option', { name: category })).toBeInTheDocument();
    });
  });

  test('sets default date to today', () => {
    render(
      <TestWrapper>
        <ExpenseForm />
      </TestWrapper>
    );

    const dateInput = screen.getByLabelText(/date/i) as HTMLInputElement;
    const today = new Date().toISOString().split('T')[0];
    expect(dateInput.value).toBe(today);
  });

  test('updates form fields when user types', async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <ExpenseForm />
      </TestWrapper>
    );

    const titleInput = screen.getByLabelText(/title/i) as HTMLInputElement;
    const amountInput = screen.getByLabelText(/amount/i) as HTMLInputElement;
    const categorySelect = screen.getByLabelText(/category/i) as HTMLSelectElement;
    const descriptionTextarea = screen.getByLabelText(/description/i) as HTMLTextAreaElement;

    await user.type(titleInput, 'Coffee');
    await user.type(amountInput, '100');
    await user.selectOptions(categorySelect, 'Food & Dining');
    await user.type(descriptionTextarea, 'Morning coffee');

    expect(titleInput.value).toBe('Coffee');
    expect(amountInput.value).toBe('100');
    expect(categorySelect.value).toBe('Food & Dining');
    expect(descriptionTextarea.value).toBe('Morning coffee');
  });

  test('submits form with valid data', async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <ExpenseForm />
      </TestWrapper>
    );

    // Fill all required fields
    await user.type(screen.getByLabelText(/title/i), 'Coffee');
    await user.type(screen.getByLabelText(/amount/i), '100');
    await user.selectOptions(screen.getByLabelText(/category/i), 'Food & Dining');
    
    await user.click(screen.getByRole('button', { name: /add expense/i }));

    await waitFor(() => {
      expect(mockCreateExpense).toHaveBeenCalledWith({
        title: 'Coffee',
        amount: '100',
        category: 'Food & Dining',
        date: expect.any(String),
        desc: ''
      });
    });
  });

  test('submits form with description', async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <ExpenseForm />
      </TestWrapper>
    );

    await user.type(screen.getByLabelText(/title/i), 'Lunch');
    await user.type(screen.getByLabelText(/amount/i), '10');
    await user.selectOptions(screen.getByLabelText(/category/i), 'Food & Dining');
    await user.type(screen.getByLabelText(/description/i), 'Business lunch');
    
    await user.click(screen.getByRole('button', { name: /add expense/i }));

    await waitFor(() => {
      expect(mockCreateExpense).toHaveBeenCalledWith({
        title: 'Lunch',
        amount: '10',
        category: 'Food & Dining',
        date: expect.any(String),
        desc: 'Business lunch'
      });
    });
  });

  test('resets form after successful submission', async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <ExpenseForm />
      </TestWrapper>
    );

    const titleInput = screen.getByLabelText(/title/i) as HTMLInputElement;
    const amountInput = screen.getByLabelText(/amount/i) as HTMLInputElement;
    const categorySelect = screen.getByLabelText(/category/i) as HTMLSelectElement;
    const descriptionTextarea = screen.getByLabelText(/description/i) as HTMLTextAreaElement;

    // Fill form
    await user.type(titleInput, 'Test Expense');
    await user.type(amountInput, '20');
    await user.selectOptions(categorySelect, 'Shopping');
    await user.type(descriptionTextarea, 'Test description');
    
    // Verify form is filled
    expect(titleInput.value).toBe('Test Expense');
    expect(amountInput.value).toBe('20');
    expect(categorySelect.value).toBe('Shopping');
    expect(descriptionTextarea.value).toBe('Test description');
    
    await user.click(screen.getByRole('button', { name: /add expense/i }));

    // Wait for API call to complete and form to reset
    await waitFor(() => {
      expect(mockCreateExpense).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(titleInput.value).toBe('');
    }, { timeout: 3000 });

    expect(amountInput.value).toBe('');
    expect(categorySelect.value).toBe('');
    expect(descriptionTextarea.value).toBe('');
  });

  test('handles API error and shows alert', async () => {
    const user = userEvent.setup();
    const mockAlert = jest.fn();
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    // Mock window.alert
    const originalAlert = window.alert;
    window.alert = mockAlert;
    
    // Mock API to reject
    mockCreateExpense.mockReturnValue({
      unwrap: jest.fn().mockRejectedValue(new Error('API Error'))
    });

    render(
      <TestWrapper>
        <ExpenseForm />
      </TestWrapper>
    );

    await user.type(screen.getByLabelText(/title/i), 'Test');
    await user.type(screen.getByLabelText(/amount/i), '10');
    await user.selectOptions(screen.getByLabelText(/category/i), 'Other');
    
    await user.click(screen.getByRole('button', { name: /add expense/i }));

    await waitFor(() => {
      expect(mockAlert).toHaveBeenCalledWith('Failed to add expense. Please try again.');
    });

    // Restore
    window.alert = originalAlert;
    consoleSpy.mockRestore();
  });

  test('shows loading state when submitting', () => {
    // Mock loading state
    mockUseCreateExpenseMutation.mockReturnValue([
      mockCreateExpense,
      { isLoading: true }
    ]);

    render(
      <TestWrapper>
        <ExpenseForm />
      </TestWrapper>
    );

    // Check button shows "Adding..." text and is disabled
    const submitButton = screen.getByRole('button', { name: /adding/i });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
    
    // Check form fields are disabled
    const titleInput = screen.getByLabelText(/title/i);
    const amountInput = screen.getByLabelText(/amount/i);
    const categorySelect = screen.getByLabelText(/category/i);
    
    expect(titleInput).toBeDisabled();
    expect(amountInput).toBeDisabled();
    expect(categorySelect).toBeDisabled();
  });

  test('has correct input types and attributes', () => {
    render(
      <TestWrapper>
        <ExpenseForm />
      </TestWrapper>
    );

    const titleInput = screen.getByLabelText(/title/i);
    const amountInput = screen.getByLabelText(/amount/i);
    const dateInput = screen.getByLabelText(/date/i);

    expect(titleInput).toHaveAttribute('type', 'text');
    expect(titleInput).toHaveAttribute('placeholder', 'Enter expense title');

    expect(amountInput).toHaveAttribute('type', 'number');
    expect(amountInput).toHaveAttribute('step', '10');
    expect(amountInput).toHaveAttribute('min', '0');
    expect(amountInput).toHaveAttribute('placeholder', '0.00');

    expect(dateInput).toHaveAttribute('type', 'date');
  });

  test('clears individual form fields', async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <ExpenseForm />
      </TestWrapper>
    );

    const titleInput = screen.getByLabelText(/title/i) as HTMLInputElement;
    
    // Type and then clear
    await user.type(titleInput, 'Test');
    expect(titleInput.value).toBe('Test');
    
    await user.clear(titleInput);
    expect(titleInput.value).toBe('');
  });
});