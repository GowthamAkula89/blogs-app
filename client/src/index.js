import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PayPalScriptProvider
      options={{
        "client-id":
          "AV0B1prcW0Rz40Bp4MLPOc4FtZoWysCNumcJxdPjJyL2ey1PPjBId4uT6919YwysDqfGt41YJlgvH7Ou",
      }}
    >
      <App />
    </PayPalScriptProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
