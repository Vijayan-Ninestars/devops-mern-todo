require('express-async-errors');
const path = require('path');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const morgan = require('morgan');

const env = require('./config/env');
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');
const routes = require('./routes');

const app = express();

app.use(helmet());
app.use(cors({ origin: env.clientUrl, credentials: true }));
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
