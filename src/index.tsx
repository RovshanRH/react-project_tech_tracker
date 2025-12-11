import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Вариант 1: Добавьте "!" чтобы сказать TypeScript, что элемент существует
const rootElement = document.getElementById('root')!; // ← обратите внимание на "!"

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);