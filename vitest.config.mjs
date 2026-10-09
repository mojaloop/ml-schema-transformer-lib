import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      src: new URL('./src', import.meta.url).pathname,
      test: new URL('./test', import.meta.url).pathname,
    },
  },
  test: {
    globals: true,
    // The first validateBody() call loads and compiles the FSPIOP spec; under
    // coverage on CircleCI it runs close to the 10 s default and has timed out.
    testTimeout: 30000,
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
