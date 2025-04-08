const Web3 = require('web3');
const web3 = new Web3(process.env.RPC_URL);
const User = require('../models/Users');
const Transaction = require('../models/Transaction');

// Tạo user mới
exports.createUser = async (req, res) => {
  try {
    const { name, walletAddress, privateKey } = req.body;
    let account;

    if (walletAddress && privateKey) {
      account = { address: walletAddress, privateKey };
    } else {
      account = web3.eth.accounts.create();
    }

    const newUser = new User({
      name,
      walletAddress: account.address,
      privateKey: account.privateKey,
    });

    await newUser.save();

    res.status(201).json({
      message: 'Tạo user thành công',
      user: {
        name: newUser.name,
        walletAddress: newUser.walletAddress,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};

// Lấy danh sách user (ẩn privateKey)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-privateKey');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};

// Xoá user theo ID
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: 'Không tìm thấy user' });
    }

    res.status(200).json({ message: 'Xoá user thành công', user: deletedUser });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};

// Chuyển ETH
exports.transferEth = async (req, res) => {
  const { fromAddress, toAddress, amount } = req.body;

  try {
    const sender = await User.findOne({ walletAddress: fromAddress });
    if (!sender) {
      return res.status(404).json({ message: 'Người gửi không tồn tại' });
    }

    const balanceWei = await web3.eth.getBalance(fromAddress);
    const amountWei = web3.utils.toWei(amount, 'ether');
    const gasLimit = 21000;
    const gasPrice = await web3.eth.getGasPrice();
    const totalCostWei = BigInt(amountWei) + BigInt(gasLimit) * BigInt(gasPrice);

    if (BigInt(balanceWei) < totalCostWei) {
      return res.status(400).json({ message: 'Không đủ ETH để gửi.' });
    }

    const signedTx = await web3.eth.accounts.signTransaction(
      {
        from: fromAddress,
        to: toAddress,
        value: amountWei,
        gas: gasLimit,
        gasPrice,
      },
      sender.privateKey
    );

    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

    const feeWei = BigInt(receipt.gasUsed) * BigInt(gasPrice);
    const feeEth = web3.utils.fromWei(feeWei.toString(), 'ether');
    const amountEth = web3.utils.fromWei(amountWei, 'ether');

    await Transaction.create({
      from: fromAddress,
      to: toAddress,
      amount: amountEth + ' ETH',
      gasUsed: receipt.gasUsed,
      fee: feeEth + ' ETH',
    });

    res.status(200).json({
      message: 'Gửi ETH thành công',
      from: fromAddress,
      to: toAddress,
      amount: amountEth + ' ETH',
      gasUsed: receipt.gasUsed,
      fee: feeEth + ' ETH',
    });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};

// Lấy số dư
exports.getBalance = async (req, res) => {
  try {
    const { address } = req.params;
    const balance = await web3.eth.getBalance(address);
    res.status(200).json({
      address,
      balance: web3.utils.fromWei(balance, 'ether') + ' ETH',
    });
  } catch (error) {
    res.status(500).json({ message: 'Không lấy được số dư', error: error.message });
  }
};
