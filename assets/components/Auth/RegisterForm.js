import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';

import axios from 'axios';

const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setError('The password do not match.');
            return;
        }

        setError(null);
        setSuccess(false);

        try {
            const response = await axios.post('/api/register', { 
                email,
                password,
            });

            if (response.status === 201) {
                setSuccess(true);
                setEmail('');
                setPassword('');
                setConfirmPassword('');
               
                console.log('User successfully registered:', response.data);
            }
        } catch (err) {
            console.error('Error registering user:', err.response ? err.response.data : err.message);
            setError(err.response?.data?.message || 'Error registering. Please try again');
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <h2 className="text-center mb-4">User registration</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {success && <Alert variant="success">¡Registration successfull! You can now log in.</Alert>}
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

                        <Form.Group className="mb-3" controlId="formConfirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirm password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100">
                            Registrarse
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default RegisterForm;