const express = require('express');
const authRoutes = require('./routers/auth.routers');
const adminproduct = require('./routers/admin/product.router')
const shopingproduct = require('./routers/shoping/product.router')
const cors = require('cors')
const cookieparser = require('cookie-parser')
const cartRoutes = require('./routers/shoping/cart.router');


const app = express();



app.use(express.json());
app.use(cookieparser())
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
}));



 
app.use('/api/auth',authRoutes)  
app.use('/api/admin/product',adminproduct) 
app.use('/api/shoping/product',shopingproduct) 
app.use('/api/shoping/cart',cartRoutes)



module.exports = app;  