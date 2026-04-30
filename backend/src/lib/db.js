const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connetionReq = await mongoose.connect(process.env.MONGODB_URI);
    console.log('\n--------------------');
    console.log('🎉🎉 MongoDB Database Connected ~ ', connetionReq.connection.host);
    console.log('--------------------');
  } catch(error) {
    console.log('\n\n--------------------\n');
    console.log('😱😱 Error connecting to MongoDB Database: ', error);
    console.log('\n--------------------');
  }
} 

module.exports = connectDB;