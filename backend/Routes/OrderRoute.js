const express = require('express');
const Router = express.Router();
const { checkout }=require('../Controllers/Ordercontroller')


Router.post('/checkout', checkout)
// payment.post('/verification', verification)

module.exports = Router;
// other