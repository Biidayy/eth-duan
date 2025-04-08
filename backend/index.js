require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const Web3 = require('web3');
const cors = require('cors');
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const userRoutes = require('./routes/user');

const app = express();
const PORT = process.env.PORT || 5000;

// Kết nối MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('✅ Kết nối MongoDB thành công'))
  .catch((err) => console.log('❌ Lỗi kết nối MongoDB:', err));

// Middleware
app.use(cors());
app.use(express.json());

// Sử dụng router
app.use('/api/users', userRoutes);

// Kết nối Web3
const web3 = new Web3(process.env.RPC_URL);
app.set('web3', web3);

// Khởi động server
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});
