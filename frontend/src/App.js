import React from 'react';
import RegisterUser from './components/RegisterUser';
import UserList from './components/UserList';
import TransferETH from './components/TransferETH';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Ví Điện Tử Ethereum</h1>
      <RegisterUser />
      <UserList />
      <TransferETH />
    </div>
  );
}

export default App;
