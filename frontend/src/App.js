import React from 'react';
import RegisterUser from './components/RegisterUser';
import UserList from './components/UserList';
import TransferETH from './components/TransferETH'; 

function App() {
  return (
    <div className="App">
      <h1>Ví Điện Tử Ethereum</h1>
      <RegisterUser />
      <UserList /> {/* hiển thị danh sách người dùng */}
      <TransferETH /> {/* hiển thị giao diện chuyển ETH */}
    </div>
  );
}

export default App;
