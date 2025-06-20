import './styles/app.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import RegisterForm from './components/Auth/RegisterForm';

import LoginForm from './components/Auth/LoginForm';

document.addEventListener('DOMContentLoaded', () => {
    const registerFormRoot = document.getElementById('react-register-form');
    if (registerFormRoot) {
        ReactDOM.createRoot(registerFormRoot).render(
            <React.StrictMode>
                <RegisterForm />
            </React.StrictMode>
        );
    }

    const loginFormRoot = document.getElementById('react-login-form');
    if (loginFormRoot) {
        ReactDOM.createRoot(loginFormRoot).render(
            <React.StrictMode>
                <LoginForm />
            </React.StrictMode>
        );
    }

    // const appRoot = document.getElementById('react-root');
    // if (appRoot) {
    //     ReactDOM.createRoot(appRoot).render(
    //         <React.StrictMode>
    //             <App />
    //         </React.StrictMode>
    //     );
    // }
});


console.log('This log comes from assets/app.js - welcome to AssetMapper! 🎉');
