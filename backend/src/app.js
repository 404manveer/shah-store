const express = require('express');
const authRoutes = require('./routers/auth.routers');
const cors = require('cors')
const cookieparser = require('cookie-parser')


const app = express();



app.use(express.json());
app.use(cookieparser())
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  
}));



 
app.use('/api/auth',authRoutes)   


module.exports = app; 