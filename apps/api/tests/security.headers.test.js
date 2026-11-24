const request = require('supertest');
const app = require('../src/app');

// The site is served over plain HTTP (http://IP:5000). If these headers come back,
// browsers upgrade asset requests to https:// and the page renders blank.
describe('security headers (plain-HTTP deployment)', () => {
	test('CSP does not force https upgrades and HSTS is off', async () => {
		const res = await request(app).get('/health');
		const csp = res.headers['content-security-policy'];
		expect(csp).toBeDefined();
		expect(csp).not.toMatch(/upgrade-insecure-requests/);
		expect(res.headers['strict-transport-security']).toBeUndefined();
	});
});
