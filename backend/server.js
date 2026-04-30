const express = require('express');
const connectDB = require('./src/lib/db');

require('dotenv').config();

const app = express();

app.listen(process.env.PORT, () => {
  console.log('\n\n--------------------');
  console.log('⚡⚡ Server Running on PORT: ', process.env.PORT);
  console.log('--------------------');

  connectDB();
});