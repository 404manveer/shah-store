const mongoose = require('mongoose');
require('dotenv').config();

 async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGOOSE_URL)
        console.log('Database connected successfully');
        
    } catch (error) {
        console.error('Database connection error:', error);
        
    }
}


module.exports = connectDB;
