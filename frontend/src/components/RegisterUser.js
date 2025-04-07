import React, { useState } from 'react';
import axios from 'axios';

function RegisterUser() {
  const [name, setName] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('/api/user/create', {
        name,
        walletAddress,
        privateKey,
      });
      setMessage(`✅ Đăng ký thành công!`);
      setName('');
      setWalletAddress('');
      setPrivateKey('');
    } catch (error) {
      setMessage(`❌ Lỗi: ${error.response?.data?.error || 'Không thể đăng ký'}`);
    }
  };

  return (
    <div>
      <h2>Đăng ký User</h2>
      <div style={{ marginBottom: '3px' }}>
        <input
          type="text"
          placeholder="Tên người dùng"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: '200px', padding: '5px' }}
        />
      </div>
      <div style={{ marginBottom: '3px' }}>
        <input
          type="text"
          placeholder="Địa chỉ ví (ID)"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
          style={{ width: '400px', padding: '5px' }}
        />
      </div>
      <div style={{ marginBottom: '3px' }}>
        <input
          type="text"
          placeholder="Private Key"
          value={privateKey}
          onChange={(e) => setPrivateKey(e.target.value)}
          style={{ width: '400px', padding: '5px' }}
        />
      </div>
      <button onClick={handleRegister}>Tạo ví</button>
      <br />
      {message && <p>{message}</p>}
    </div>
  );
}

export default RegisterUser;
