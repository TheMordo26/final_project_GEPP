// assets/components/Auth/LoginForm.js

import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [csrfToken, setCsrfToken] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCsrfToken = async () => {
            try {
                const response = await axios.get('/api/csrf_token');
                setCsrfToken(response.data.csrfToken);
            } catch (err) {
                console.error('Error fetching CSRF token:', err);
                setError('Failed to load login form. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        fetchCsrfToken();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);

        if (!csrfToken) {
            setError('Security token not available. Cannot log in.');
            return;
        }

        try {
            const response = await axios.post('/login', {
                email,
                password,
                _csrf_token: csrfToken,
            }, {
                withCredentials: true, 
            });

            if (response.data && response.data.redirect) {
                window.location.href = response.data.redirect;
            } else {
                console.log('Login successful, but no redirect specified from backend. Redirecting to home by default.');
                window.location.href = '/';
            }

        } catch (err) {
            console.error('Error logging in:', err.response ? err.response.data : err.message);
            setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
        }
    };

    if (loading) {
        return <Container className="mt-5 text-center">Loading form...</Container>;
    }

    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <h2 className="text-center mb-4">Log In</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100">
                            Log In
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginForm;