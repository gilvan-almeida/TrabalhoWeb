const express = require('express');
const cors = require('cors');
require('dotenv').config();

const itemsRoutes = require('./routes/items');
const usersRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({ message: 'API Achados e Perdidos' });
});

app.use('/api/items', itemsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/auth', authRoutes);

app.use(errorHandler);

module.exports = app;