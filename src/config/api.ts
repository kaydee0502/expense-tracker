const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8001/api',
  V1: {
    ENDPOINTS: {
        EXPENSES: process.env.V1_NEXT_PUBLIC_EXPENSE_API_ENDPOINT || '/v1/expenses',
        USERS: process.env.V1_NEXT_PUBLIC_USER_API_ENDPOINT || '/v1/users',
        AUTH: process.env.V1_NEXT_PUBLIC_AUTH_API_ENDPOINT || '/v1/auth',
    }
  }

} as const;

export const getApiUrl = (endpoint: keyof typeof API_CONFIG.V1.ENDPOINTS) => {
  return `${API_CONFIG.BASE_URL}${API_CONFIG.V1.ENDPOINTS[endpoint]}`;
};

export default API_CONFIG;