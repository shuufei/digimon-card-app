/* eslint-disable */
export default {
  displayName: 'api-get-credentials',

  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../../coverage/apps/api/get-credentials',
  testEnvironment: 'node',
  preset: '../../../jest.preset.js',
};
