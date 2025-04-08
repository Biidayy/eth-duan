const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const Transaction = require('../models/Transaction');

// Tạo user
router.post('/create', userController.createUser);

// Lấy danh sách user
router.get('/', userController.getAllUsers);

// Xoá user
router.delete('/:id', userController.deleteUser);

// Chuyển ETH
router.post('/transfer', userController.transferEth);

// Lấy số dư
router.get('/balance/:address', userController.getBalance);

// Lấy lịch sử giao dịch
router.get('/transactions', async (req, res) => {
  try {
    const txs = await Transaction.find().sort({ timestamp: -1 });
    res.status(200).json(txs);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy giao dịch', error: error.message });
  }
});

module.exports = router;
