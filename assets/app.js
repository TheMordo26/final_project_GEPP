import './styles/app.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import RegisterForm from './components/Auth/RegisterForm';
import LoginForm from './components/Auth/LoginForm';
import TemplateForm from './components/Template/TemplateForm';
import TemplateList from './components/Template/TemplateList';

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

    const templateFormRoot = document.getElementById('react-template-form');
    if (templateFormRoot) {
        ReactDOM.createRoot(templateFormRoot).render(
            <React.StrictMode>
                <TemplateForm />
            </React.StrictMode>
        );
    }

    const templateListRoot = document.getElementById('react-template-list');
    if (templateListRoot) {
        ReactDOM.createRoot(templateListRoot).render(
            <React.StrictMode>
                <TemplateList />
            </React.StrictMode>
        );
    }
});


console.log('This log comes from assets/app.js - welcome to AssetMapper! 🎉');
