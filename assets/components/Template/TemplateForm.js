import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';

const TemplateForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [topic, setTopic] = useState('Other');
    const [isPublic, setIsPublic] = useState(true);
    const [csrfToken, setCsrfToken] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCsrfToken = async () => {
            try {
                const response = await axios.get('/api/csrf_token');
                setCsrfToken(response.data.csrfToken);
            } catch (err) {
                console.error('Error fetching CSRF token:', err);
                setError('Failed to load form. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        fetchCsrfToken();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        setSuccess(false);

        if (!csrfToken) {
            setError('Security token not available. Cannot create template.');
            return;
        }

        try {
            const response = await axios.post('/api/templates', {
                title,
                description,
                topic,
                isPublic,
                _csrf_token: csrfToken,
            }, {
                withCredentials: true,
            });

            if (response.status === 201) {
                setSuccess(true);
                setTitle('');
                setDescription('');
                setTopic('Other');
                setIsPublic(true);
                console.log('Template created successfully:', response.data);
            }
        } catch (err) {
            console.error('Error creating template:', err.response ? err.response.data : err.message);
            setError(err.response?.data?.message || 'Error creating template. Please try again.');
        }
    };

    if (loading) {
        return <Container className="mt-5 text-center">Loading template form...</Container>;
    }

    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md={8}>
                    <h2 className="text-center mb-4">Create New Template</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {success && <Alert variant="success">Template created successfully!</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="templateTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter template title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="templateDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter template description (optional)"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="templateTopic">
                            <Form.Label>Topic</Form.Label>
                            <Form.Select value={topic} onChange={(e) => setTopic(e.target.value)}>
                                <option value="Education">Education</option>
                                <option value="Quiz">Quiz</option>
                                <option value="Poll">Poll</option>
                                <option value="Other">Other</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="templateIsPublic">
                            <Form.Check
                                type="checkbox"
                                label="Public Template (Accessible to all authenticated users)"
                                checked={isPublic}
                                onChange={(e) => setIsPublic(e.target.checked)}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100 mt-3">
                            Create Template
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default TemplateForm;