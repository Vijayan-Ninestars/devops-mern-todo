module.exports = {
	testEnvironment: 'node',
	roots: ['<rootDir>/tests'],
	setupFiles: ['<rootDir>/tests/setupEnv.js'],
	clearMocks: true,
	collectCoverageFrom: ['src/**/*.js', '!src/server.js'],
};
