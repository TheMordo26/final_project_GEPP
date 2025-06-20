import './styles/app.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import RegisterForm from './components/Auth/RegisterForm';

document.addEventListener('DOMContentLoaded', () => {
    const registerFormRoot = document.getElementById('react-register-form');
    if (registerFormRoot) {
        ReactDOM.createRoot(registerFormRoot).render(
            <React.StrictMode>
                <RegisterForm />
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
