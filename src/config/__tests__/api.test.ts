import API_CONFIG, { getApiUrl } from '../api';

// Mock environment variables
const mockEnv = (envVars: Record<string, string | undefined>) => {
  const originalEnv = process.env;
  process.env = { ...originalEnv, ...envVars };
  return () => {
    process.env = originalEnv;
  };
};

describe('API Configuration', () => {
  describe('API_CONFIG', () => {
    it('should use default BASE_URL when NEXT_PUBLIC_API_BASE_URL is not set', () => {
      const restoreEnv = mockEnv({ NEXT_PUBLIC_API_BASE_URL: undefined });
      
      jest.resetModules();
      const { default: freshConfig } = require('../api');
      
      expect(freshConfig.BASE_URL).toBe('http://localhost:8001/api');
      restoreEnv();
    });

    it('should use environment variable for BASE_URL when NEXT_PUBLIC_API_BASE_URL is set', () => {
      const testUrl = 'https://api.example.com';
      const restoreEnv = mockEnv({ NEXT_PUBLIC_API_BASE_URL: testUrl });
      
      jest.resetModules();
      const { default: freshConfig } = require('../api');
      
      expect(freshConfig.BASE_URL).toBe(testUrl);
      restoreEnv();
    });

    it('should use default EXPENSES endpoint when V1_NEXT_PUBLIC_EXPENSE_API_ENDPOINT is not set', () => {
      const restoreEnv = mockEnv({ V1_NEXT_PUBLIC_EXPENSE_API_ENDPOINT: undefined });
      
      jest.resetModules();
      const { default: freshConfig } = require('../api');
      
      expect(freshConfig.V1.ENDPOINTS.EXPENSES).toBe('/v1/expenses');
      restoreEnv();
    });

    it('should use environment variable for EXPENSES endpoint when V1_NEXT_PUBLIC_EXPENSE_API_ENDPOINT is set', () => {
      const testEndpoint = '/api/v2/expenses';
      const restoreEnv = mockEnv({ V1_NEXT_PUBLIC_EXPENSE_API_ENDPOINT: testEndpoint });
      
      jest.resetModules();
      const { default: freshConfig } = require('../api');
      
      expect(freshConfig.V1.ENDPOINTS.EXPENSES).toBe(testEndpoint);
      restoreEnv();
    });

    it('should use default USERS endpoint when V1_NEXT_PUBLIC_USER_API_ENDPOINT is not set', () => {
      const restoreEnv = mockEnv({ V1_NEXT_PUBLIC_USER_API_ENDPOINT: undefined });
      
      jest.resetModules();
      const { default: freshConfig } = require('../api');
      
      expect(freshConfig.V1.ENDPOINTS.USERS).toBe('/v1/users');
      restoreEnv();
    });

    it('should use environment variable for USERS endpoint when V1_NEXT_PUBLIC_USER_API_ENDPOINT is set', () => {
      const testEndpoint = '/api/v2/users';
      const restoreEnv = mockEnv({ V1_NEXT_PUBLIC_USER_API_ENDPOINT: testEndpoint });
      
      jest.resetModules();
      const { default: freshConfig } = require('../api');
      
      expect(freshConfig.V1.ENDPOINTS.USERS).toBe(testEndpoint);
      restoreEnv();
    });

    it('should use default AUTH endpoint when V1_NEXT_PUBLIC_AUTH_API_ENDPOINT is not set', () => {
      const restoreEnv = mockEnv({ V1_NEXT_PUBLIC_AUTH_API_ENDPOINT: undefined });
      
      jest.resetModules();
      const { default: freshConfig } = require('../api');
      
      expect(freshConfig.V1.ENDPOINTS.AUTH).toBe('/v1/auth');
      restoreEnv();
    });

    it('should use environment variable for AUTH endpoint when V1_NEXT_PUBLIC_AUTH_API_ENDPOINT is set', () => {
      const testEndpoint = '/api/v2/auth';
      const restoreEnv = mockEnv({ V1_NEXT_PUBLIC_AUTH_API_ENDPOINT: testEndpoint });
      
      jest.resetModules();
      const { default: freshConfig } = require('../api');
      
      expect(freshConfig.V1.ENDPOINTS.AUTH).toBe(testEndpoint);
      restoreEnv();
    });

    it('should have all required endpoint properties', () => {
      expect(API_CONFIG.V1.ENDPOINTS).toHaveProperty('EXPENSES');
      expect(API_CONFIG.V1.ENDPOINTS).toHaveProperty('USERS');
      expect(API_CONFIG.V1.ENDPOINTS).toHaveProperty('AUTH');
    });

    it('should have correct TypeScript readonly structure', () => {
      // Test that the config object has the expected structure and types
      expect(typeof API_CONFIG.BASE_URL).toBe('string');
      expect(typeof API_CONFIG.V1).toBe('object');
      expect(typeof API_CONFIG.V1.ENDPOINTS).toBe('object');
      expect(typeof API_CONFIG.V1.ENDPOINTS.EXPENSES).toBe('string');
      expect(typeof API_CONFIG.V1.ENDPOINTS.USERS).toBe('string');
      expect(typeof API_CONFIG.V1.ENDPOINTS.AUTH).toBe('string');
      
      // Verify the structure matches expected shape
      expect(API_CONFIG).toHaveProperty('BASE_URL');
      expect(API_CONFIG).toHaveProperty('V1');
      expect(API_CONFIG.V1).toHaveProperty('ENDPOINTS');
    });

    it('should be a const assertion object', () => {
      // Test that the object behaves as expected for a const assertion
      // (Note: `as const` provides compile-time immutability, not runtime)
      expect(API_CONFIG.BASE_URL).toBeDefined();
      expect(API_CONFIG.V1.ENDPOINTS.EXPENSES).toBeDefined();
      expect(API_CONFIG.V1.ENDPOINTS.USERS).toBeDefined();
      expect(API_CONFIG.V1.ENDPOINTS.AUTH).toBeDefined();
      
      // Test that all values are strings (as expected)
      expect(typeof API_CONFIG.BASE_URL).toBe('string');
      expect(typeof API_CONFIG.V1.ENDPOINTS.EXPENSES).toBe('string');
      expect(typeof API_CONFIG.V1.ENDPOINTS.USERS).toBe('string');
      expect(typeof API_CONFIG.V1.ENDPOINTS.AUTH).toBe('string');
    });
  });

  describe('getApiUrl function', () => {
    beforeEach(() => {
      jest.resetModules();
    });

    it('should return correct URL for EXPENSES endpoint', () => {
      const url = getApiUrl('EXPENSES');
      expect(url).toBe('http://localhost:8001/api/v1/expenses');
    });

    it('should return correct URL for USERS endpoint', () => {
      const url = getApiUrl('USERS');
      expect(url).toBe('http://localhost:8001/api/v1/users');
    });

    it('should return correct URL for AUTH endpoint', () => {
      const url = getApiUrl('AUTH');
      expect(url).toBe('http://localhost:8001/api/v1/auth');
    });

    it('should construct URL with custom base URL from environment', () => {
      const customBaseUrl = 'https://production-api.example.com';
      const restoreEnv = mockEnv({ NEXT_PUBLIC_API_BASE_URL: customBaseUrl });
      
      jest.resetModules();
      const { getApiUrl: freshGetApiUrl } = require('../api');
      
      const url = freshGetApiUrl('EXPENSES');
      expect(url).toBe(`${customBaseUrl}/v1/expenses`);
      restoreEnv();
    });

    it('should construct URL with custom endpoint from environment', () => {
      const customEndpoint = '/api/v3/custom-expenses';
      const restoreEnv = mockEnv({ V1_NEXT_PUBLIC_EXPENSE_API_ENDPOINT: customEndpoint });
      
      jest.resetModules();
      const { getApiUrl: freshGetApiUrl } = require('../api');
      
      const url = freshGetApiUrl('EXPENSES');
      expect(url).toBe(`http://localhost:8001/api${customEndpoint}`);
      restoreEnv();
    });

    it('should handle URLs with trailing/leading slashes correctly', () => {
      const baseUrlWithTrailingSlash = 'https://api.example.com/';
      const endpointWithoutLeadingSlash = 'v1/expenses';
      
      const restoreEnv = mockEnv({ 
        NEXT_PUBLIC_API_BASE_URL: baseUrlWithTrailingSlash,
        V1_NEXT_PUBLIC_EXPENSE_API_ENDPOINT: endpointWithoutLeadingSlash
      });
      
      jest.resetModules();
      const { getApiUrl: freshGetApiUrl } = require('../api');
      
      const url = freshGetApiUrl('EXPENSES');
      expect(url).toBe('https://api.example.com/v1/expenses');
      restoreEnv();
    });

    it('should work with all environment variables set', () => {
      const envVars = {
        NEXT_PUBLIC_API_BASE_URL: 'https://staging-api.example.com',
        V1_NEXT_PUBLIC_EXPENSE_API_ENDPOINT: '/v2/expenses',
        V1_NEXT_PUBLIC_USER_API_ENDPOINT: '/v2/users',
        V1_NEXT_PUBLIC_AUTH_API_ENDPOINT: '/v2/auth'
      };
      
      const restoreEnv = mockEnv(envVars);
      
      jest.resetModules();
      const { getApiUrl: freshGetApiUrl } = require('../api');
      
      expect(freshGetApiUrl('EXPENSES')).toBe('https://staging-api.example.com/v2/expenses');
      expect(freshGetApiUrl('USERS')).toBe('https://staging-api.example.com/v2/users');
      expect(freshGetApiUrl('AUTH')).toBe('https://staging-api.example.com/v2/auth');
      
      restoreEnv();
    });

    it('should return valid HTTP URLs', () => {
      const endpoints: Array<keyof typeof API_CONFIG.V1.ENDPOINTS> = ['EXPENSES', 'USERS', 'AUTH'];
      
      endpoints.forEach(endpoint => {
        const url = getApiUrl(endpoint);
        expect(url).toMatch(/^https?:\/\/.+/);
        expect(url).toContain('api');
      });
    });

    it('should handle base URL without protocol', () => {
      const baseUrlWithoutProtocol = 'api.example.com';
      const restoreEnv = mockEnv({ NEXT_PUBLIC_API_BASE_URL: baseUrlWithoutProtocol });
      
      jest.resetModules();
      const { getApiUrl: freshGetApiUrl } = require('../api');
      
      const url = freshGetApiUrl('EXPENSES');
      expect(url).toBe('api.example.com/v1/expenses');
      restoreEnv();
    });
  });

  describe('Type Safety', () => {
    it('should only accept valid endpoint keys', () => {
      // These should work (valid keys)
      expect(() => getApiUrl('EXPENSES')).not.toThrow();
      expect(() => getApiUrl('USERS')).not.toThrow();
      expect(() => getApiUrl('AUTH')).not.toThrow();
    });

    it('should return string type for all valid endpoints', () => {
      const endpoints: Array<keyof typeof API_CONFIG.V1.ENDPOINTS> = ['EXPENSES', 'USERS', 'AUTH'];
      
      endpoints.forEach(endpoint => {
        const result = getApiUrl(endpoint);
        expect(typeof result).toBe('string');
        expect(result.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Integration Tests', () => {
    it('should maintain consistency between config and getApiUrl function', () => {
      const endpoints = Object.keys(API_CONFIG.V1.ENDPOINTS) as Array<keyof typeof API_CONFIG.V1.ENDPOINTS>;
      
      endpoints.forEach(endpoint => {
        const expectedUrl = `${API_CONFIG.BASE_URL}${API_CONFIG.V1.ENDPOINTS[endpoint]}`;
        const actualUrl = getApiUrl(endpoint);
        expect(actualUrl).toBe(expectedUrl);
      });
    });

    it('should handle empty string environment variables', () => {
      const restoreEnv = mockEnv({
        NEXT_PUBLIC_API_BASE_URL: '',
        V1_NEXT_PUBLIC_EXPENSE_API_ENDPOINT: '',
        V1_NEXT_PUBLIC_USER_API_ENDPOINT: '',
        V1_NEXT_PUBLIC_AUTH_API_ENDPOINT: ''
      });
      
      jest.resetModules();
      const { default: freshConfig, getApiUrl: freshGetApiUrl } = require('../api');
      
      // Should fall back to defaults when env vars are empty strings
      expect(freshConfig.BASE_URL).toBe('http://localhost:8001/api');
      expect(freshConfig.V1.ENDPOINTS.EXPENSES).toBe('/v1/expenses');
      expect(freshGetApiUrl('EXPENSES')).toBe('http://localhost:8001/api/v1/expenses');
      
      restoreEnv();
    });

    it('should handle undefined environment variables gracefully', () => {
      const restoreEnv = mockEnv({
        NEXT_PUBLIC_API_BASE_URL: undefined,
        V1_NEXT_PUBLIC_EXPENSE_API_ENDPOINT: undefined,
        V1_NEXT_PUBLIC_USER_API_ENDPOINT: undefined,
        V1_NEXT_PUBLIC_AUTH_API_ENDPOINT: undefined
      });
      
      jest.resetModules();
      const { default: freshConfig } = require('../api');
      
      expect(freshConfig.BASE_URL).toBe('http://localhost:8001/api');
      expect(freshConfig.V1.ENDPOINTS.EXPENSES).toBe('/v1/expenses');
      expect(freshConfig.V1.ENDPOINTS.USERS).toBe('/v1/users');
      expect(freshConfig.V1.ENDPOINTS.AUTH).toBe('/v1/auth');
      
      restoreEnv();
    });

    it('should work in different environment scenarios', () => {
      const scenarios = [
        {
          name: 'development',
          env: {
            NEXT_PUBLIC_API_BASE_URL: 'http://localhost:3000/api'
          },
          expected: 'http://localhost:3000/api/v1/expenses'
        },
        {
          name: 'staging',
          env: {
            NEXT_PUBLIC_API_BASE_URL: 'https://staging-api.example.com'
          },
          expected: 'https://staging-api.example.com/v1/expenses'
        },
        {
          name: 'production',
          env: {
            NEXT_PUBLIC_API_BASE_URL: 'https://api.example.com'
          },
          expected: 'https://api.example.com/v1/expenses'
        }
      ];

      scenarios.forEach(scenario => {
        const restoreEnv = mockEnv(scenario.env);
        
        jest.resetModules();
        const { getApiUrl: freshGetApiUrl } = require('../api');
        
        const url = freshGetApiUrl('EXPENSES');
        expect(url).toBe(scenario.expected);
        restoreEnv();
      });
    });
  });
});