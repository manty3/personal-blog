const mongoose = require('mongoose')
const connectDB = async () => {
  try {
    mongoose.set('strictQuery',false);
    const conn = await mongoose.connect(process.env.MONGODB_URI,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // Timeout after 30s
      tlsAllowInvalidCertificates: true, // Allows invalid certificates (not recommended for production)
      tlsAllowInvalidHostnames: true,
    });
    console.log(`Database connected: ${conn.connection.host}`)
  }catch (err) {
    console.log(err)
  }
}

module.exports = connectDB
