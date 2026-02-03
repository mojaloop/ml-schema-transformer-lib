import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src'),
      test: path.resolve(__dirname, './test'),
    },
  },
  test: {
    globals: true,
    testTimeout: 12000,
    coverage: {
      provider: 'v8', // or 'istanbul' ( requires @vitest/coverage-istanbul )
      include: ['src/**/*.ts'],
      reporter: ['text', 'json', 'html', 'clover'],
      thresholds: {
        perFile: true,
        lines: 90,
        statements: 90,
        functions: 90,
        branches: 90
      }
    }
  },
})
