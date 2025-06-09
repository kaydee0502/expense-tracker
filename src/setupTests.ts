// Jest setup file for additional configuration
beforeEach(() => {
  // Reset modules before each test to ensure clean state
  jest.resetModules();
});

afterEach(() => {
  // Clean up any environment variable changes
  jest.restoreAllMocks();
});