module.exports = {
  scripts: {
    dev: 'next dev',
    build: 'next build',
    default: 'next start',
    typeCheck: 'tsc --pretty --noEmit',
    format: 'prettier --write .',
    lint: 'eslint . --ext ts --ext tsx --ext js',
    test: 'jest',
    testAll: 'yarn lint && yarn type-check && yarn test',
  },
}
