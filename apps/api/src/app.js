require('express-async-errors');
const path = require('path');
const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');

const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');
const routes = require('./routes');

const app = express();

// The app is served over plain HTTP (http://IP:5000). Helmet's defaults would force
// every asset request to https:// (upgrade-insecure-requests) and add HSTS, which
// leaves a blank page when the server has no TLS. Remove both; put the site behind
// an HTTPS proxy (e.g. Caddy/Nginx) later and re-enable them.
app.use(
	helmet({
		contentSecurityPolicy: { useDefaults: true, directives: { 'upgrade-insecure-requests': null } },
		hsts: false,
	})
);
app.use(compression());
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

app.get('/health', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));
app.use('/api', routes);

// Serves apps/web's production build (npm run build -> dist/) from this process.
const WEB_DIST_DIR = path.resolve(__dirname, '../../web/dist');
app.use(express.static(WEB_DIST_DIR, { index: false, maxAge: '1y' }));
app.get('*', (req, res, next) => {
	if (req.path.startsWith('/api')) return next();
	res.sendFile(path.join(WEB_DIST_DIR, 'index.html'), (err) => err && next());
});

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
