import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
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
