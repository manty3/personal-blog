const mongoose = require('mongoose')
const connectDB = async () => {
  try {
    mongoose.set('strictQuery',false);
    const conn = await mongoose.connect(process.env.MONGODB_URI,{
      useNewUrlParser: true, // Use the new URL parser
      useUnifiedTopology: true, // Use the new server discovery and monitoring engine
      serverSelectionTimeoutMS: 30000, // Timeout after 30s instead of 10s
    });
    console.log(`Database connected: ${conn.connection.host}`)
  }catch (err) {
    console.log(err)
  }
}

module.exports = connectDB
