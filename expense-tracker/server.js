const app = require('./src/app');
const connectDB = require('./src/config/database');
const config = require('./src/config/env');

connectDB();

const server = app.listen(config.PORT, () => {
    console.log(`Server running in ${config.NODE_ENV} mode on port ${config.PORT}`);
});

process.on('unhandledRejection', (err) => {
    console.error(`Unhandled Rejection: ${err.message}`);
    server.close(() => process.exit(1));
});