const express = require('express');
const cors = require('cors');
require('dotenv').config();

const itemsRoutes = require("./Routers/Items");
const usersRoutes = require("./Routers/User");
const authRoutes = require("./Routers/Auth");
const { errorHandler } = require("./Middleware/Error");

const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
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

