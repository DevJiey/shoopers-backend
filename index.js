require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./connection');
const verifyApiKey = require('./middleware/apiKey');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (err) {
        next(err);
    }
});

app.use('/auth', verifyApiKey, authRoutes);
app.use('/products', verifyApiKey, productRoutes);
app.use('/users', verifyApiKey, userRoutes);
app.use('/cart', verifyApiKey, cartRoutes);
app.use('/orders', verifyApiKey, orderRoutes);
app.use('/payments', verifyApiKey, paymentRoutes);
app.use(notFoundHandler);
app.use(errorHandler);

if (require.main === module) {
    connectDB().then(() => app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    })).catch((err) => {
        console.error('Failed to start server:', err);
        process.exit(1);
    });
}

module.exports = app;
