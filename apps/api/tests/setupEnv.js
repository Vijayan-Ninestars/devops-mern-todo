process.env.NODE_ENV = 'test';
// Dummy values for DB-free unit tests; real values (CI / local) take precedence.
process.env.DB_USER ??= 'test';
process.env.DB_PASSWORD ??= 'test';
process.env.DB_NAME ??= 'test';
