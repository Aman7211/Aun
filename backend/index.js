// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./Config/database');
const authRoutes = require('./Routes/AuthRoutes');
const productRoutes = require('./Routes/ProductRoutes');
const cartRoutes = require('./Routes/CartRout');
const addressRoutes = require('./Routes/AddressRout');
const paymentRouter = require('./Routes/OrderRoute')

const app = express();

const PORT = process.env.PORT || 5000;
connectDB();


// Middleware for body parser
app.use(express.json());

app.use(
    cors({
        origin: '*',
    })
);

app.get('/', (req, res) => {
    res.send('Hello, Aun Herbal');
  });

// Routes
app.use('/api', authRoutes);
app.use('/payment', paymentRouter);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes); // Add this line
app.use('/api', addressRoutes);



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
