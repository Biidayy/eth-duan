import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserList() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/user');
        setUsers(response.data);
      } catch (err) {
        setError('❌ Lỗi khi tải danh sách user');
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Danh sách User</h2>
      {error && <p>{error}</p>}
      {users.map((user, index) => (
        <div key={index} style={{ marginBottom: '20px' }}>
          <p><strong>Tên:</strong> {user.name}</p>
          <p><strong>Địa chỉ ví:</strong> {user.walletAddress}</p>
          <p><strong>Private Key:</strong> {user.privateKey}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default UserList;
