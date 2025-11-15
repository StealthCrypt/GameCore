module.exports = {
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',   // <-- makes "@/stuff/prisma" work
  },
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  }
};
