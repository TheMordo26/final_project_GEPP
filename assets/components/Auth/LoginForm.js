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
                console.error('Error getting token CSRF:', err);
                setError('The login form could not be loaded. Try again.');
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
            setError('Security token not available. Try again.');
            return;
        }

        try {
            const response = await axios.post('/login', {
                email,
                password,
                _csrf_token: csrfToken,
            });

            console.log('Successful login:', response);

        } catch (err) {
            console.error('Login error:', err.response ? err.response.data : err.message);
            setError(err.response?.data?.message || 'Invalid credentials. Try again.');
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
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Email"
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
                            Iniciar Sesión
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginForm;