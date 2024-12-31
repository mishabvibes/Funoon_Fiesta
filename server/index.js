// server/index.js
const express = require('express');
const app = express();
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const resultRoute = require('./routes/result');
const { errorHandle } = require('./middlewares/errorHandle');
const connectDb = require('./config/db');
require('dotenv').config();

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});

// Middleware
app.use(cors());
app.use(compression());
app.use(helmet());
app.use(morgan('dev'));
app.use(limiter);
app.use(express.json());
app.use(express.static('public', {
    maxAge: '1d',
    etag: true,
    lastModified: true
}));

// Database connection
connectDb();

// Routes
app.use('/api/result', resultRoute);

// Handle 404
app.all('*', (req, res) => {
    res.status(404).json("This page does not exist");
});

// Error handling
app.use(errorHandle);

// Graceful shutdown
process.on('SIGTERM', () => {
    console.info('SIGTERM signal received.');
    server.close(() => {
        console.log('Server closed.');
        process.exit(0);
    });
});

const PORT = process.env.PORT || 3006;
const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});