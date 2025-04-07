const createUser = async (req, res) => {
  try {
    const { name, walletAddress, privateKey } = req.body;

    if (!name || !walletAddress || !privateKey) {
      return res.status(400).json({ error: 'Vui lòng nhập đầy đủ thông tin' });
    }

    const existing = await User.findOne({ walletAddress });
    if (existing) {
      return res.status(400).json({ error: 'Ví đã được đăng ký' });
    }

    const newUser = new User({ name, walletAddress, privateKey });
    await newUser.save();

    res.status(200).json({ message: 'Tạo user thành công', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Lỗi server' });
  }
};
