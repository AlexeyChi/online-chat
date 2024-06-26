import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import init from './init';

const app = async () => {
  const vdom = await init();
  const root = ReactDOM.createRoot(document.getElementById('chat'));
  root.render(<React.StrictMode>{vdom}</React.StrictMode>);
};

app();
