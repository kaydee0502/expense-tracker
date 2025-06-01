export default function Header() {
  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-center">
          Expense Tracker
        </h1>
        <p className="text-center text-blue-100 mt-2">
          Track and manage your expenses
        </p>
      </div>
    </header>
  );
}