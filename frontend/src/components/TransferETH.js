// TransferETH.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TransferETH() {
  const [sender, setSender] = useState('');
  const [receiver, setReceiver] = useState('');
  const [amount, setAmount] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/user') // Đổi cổng và đường dẫn đúng
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleTransfer = () => {
    if (!sender || !receiver || !amount) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    axios.post('http://localhost:5000/api/users/transfer', { 
      fromAddress: sender,
      toAddress: receiver,
      amount
    })
    .then(res => {
      alert("Giao dịch thành công!");
    })
    .catch(err => {
      console.error(err);
      alert("Giao dịch thất bại!");
    });
  };

  return (
    <div>
      <h2>Chuyển ETH</h2>
      <select value={sender} onChange={(e) => setSender(e.target.value)}>
        <option value="">Chọn người gửi</option>
        {users.map(user => (
          <option key={user._id} value={user.walletAddress}>{user.name}</option>
        ))}
      </select>
      <select value={receiver} onChange={(e) => setReceiver(e.target.value)}>
        <option value="">Chọn người nhận</option>
        {users.map(user => (
          <option key={user._id} value={user.walletAddress}>{user.name}</option>
        ))}
      </select>
      <input
        type="number"
        placeholder="Số lượng ETH"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleTransfer}>Chuyển</button>
    </div>
  );
}

export default TransferETH;
