// index.js
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());

// Kết nối MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('✅ Kết nối MongoDB thành công');
    app.listen(PORT, () => {
      console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Lỗi kết nối MongoDB:', err);
  });

// Routes
app.use('/api/user', require('./routes/user'));
app.use('/api/test', require('./routes/test'));

const cors = require('cors');

// Cấu hình CORS
app.use(cors({
  origin: 'http://localhost:3000', // Cho phép frontend truy cập
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Các phương thức được phép
  credentials: true // Nếu cần gửi cookie hoặc thông tin xác thực
}));
const express = require('express');
const cors = require('cors'); // <--- thêm dòng này

app.use(cors()); // <--- thêm dòng này

// các dòng khác
app.use(express.json());
