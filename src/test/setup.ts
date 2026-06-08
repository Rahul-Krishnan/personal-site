// Registers @testing-library/jest-dom matchers (toBeInTheDocument,
// toHaveTextContent, toHaveValue, ...) on Vitest's expect. Loaded via
// test.setupFiles in vite.config.ts. Harmless for node-environment tests that
// don't use DOM matchers.
import '@testing-library/jest-dom/vitest';
