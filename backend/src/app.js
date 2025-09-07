const express = require('express');
const authRoutes = require('./routers/auth.routers');
const cors = require('cors')


const app = express();



app.use(express.json());

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))





app.use('/api/auth',authRoutes)


module.exports = app;