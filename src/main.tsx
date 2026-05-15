import 'bootstrap/dist/css/bootstrap.min.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './css/informer.css';
import './css/tabs.css';
import './css/pages.css';
import './css/strips.css';
import './css/main.css';
import './css/about.css';
import './css/buttons.css';
import './css/text.css';
import './css/userCard.css';
import './css/reportGenerator.css';
import './css/userDetailCard.css';
import './css/editProfile.css';
import './css/profile.css';
import './css/feedback.css';
import './css/login.css';
import App from './App.tsx';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById('root')!).render(
  <StrictMode >
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    <App />
  </StrictMode>,
)
