import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';  // Import axios

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Sử dụng axios để gọi API nếu cần
axios.get('/users')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error('Error fetching users:', error);
  });

// Nếu bạn muốn đo hiệu suất, có thể thêm reportWebVitals
reportWebVitals();
