# 💰 Expense Tracker

A modern expense tracking application built with Next.js, TypeScript, and Redux Toolkit.

![CI](https://github.com/kaydee0502/expense-tracker/workflows/CI/badge.svg)

## 🚀 Setup

### Prerequisites
- Node.js 18+
- npm

### Installation

1. **Clone & Install**
   ```bash
   git clone https://github.com/kaydee0502/expense-tracker.git
   cd expense-tracker
   npm install
   ```

2. **Environment Variables**
   ```bash
   cp .env.example .env.local
   ```
   
   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8001/api
   V1_NEXT_PUBLIC_EXPENSE_API_ENDPOINT=/v1/expenses
   V1_NEXT_PUBLIC_USER_API_ENDPOINT=/v1/users
   V1_NEXT_PUBLIC_AUTH_API_ENDPOINT=/v1/auth
   ```

3. **Run**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:3000](http://localhost:3000)

## 🧪 Testing

```bash
npm test                    # Run tests
npm run test:coverage      # With coverage
npm run build             # Build for production
```

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **State**: Redux Toolkit + RTK Query
- **Testing**: Jest + React Testing Library

## 📁 Structure

```
app/
├── components/           # UI components
├── store/api/           # API slices
└── types/               # TypeScript types
src/config/              # API configuration
```

## 🚀 Deploy

**Vercel**: Connect repo → Set env vars → Deploy

**Docker**:
```bash
docker build -t expense-tracker .
docker run -p 3000:3000 expense-tracker
```

## 🤝 Contributing

1. Fork repo
2. Create feature branch
3. Add tests
4. Submit PR

## 📝 License

MIT
