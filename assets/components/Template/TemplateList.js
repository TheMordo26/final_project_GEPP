import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Alert, Spinner, Table, Button } from 'react-bootstrap';
import axios from 'axios';

const TemplateList = () => {
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                const response = await axios.get('/api/templates', {
                    withCredentials: true,
                });
                setTemplates(response.data);
            } catch (err) {
                console.error('Error fetching templates:', err.response ? err.response.data : err.message);
                setError('Failed to load templates. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchTemplates();
    }, []);

    if (loading) {
        return (
            <Container className="mt-5 text-center">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading templates...</span>
                </Spinner>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="mt-5">
                <Alert variant="danger">{error}</Alert>
            </Container>
        );
    }

    return (
        <Container className="mt-5">
            <Row className="mb-4">
                <Col>
                    <h2 className="text-center">My Templates</h2>
                    <Button variant="success" href="/templates/new">Create New Template</Button>
                </Col>
            </Row>
            {templates.length === 0 ? (
                <Alert variant="info" className="text-center">You haven't created any templates yet. Click "Create New Template" to get started!</Alert>
            ) : (
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Topic</th>
                            <th>Public</th>
                            <th>Created At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {templates.map((template) => (
                            <tr key={template.id}>
                                <td>{template.title}</td>
                                <td>{template.description ? template.description.substring(0, 50) + (template.description.length > 50 ? '...' : '') : 'N/A'}</td>
                                <td>{template.topic}</td>
                                <td>{template.isPublic ? 'Yes' : 'No'}</td>
                                <td>{new Date(template.createdAt.date).toLocaleDateString()}</td>
                                <td>
                                    <Button variant="info" size="sm" className="me-2">View</Button>
                                    <Button variant="warning" size="sm" className="me-2">Edit</Button>
                                    <Button variant="danger" size="sm">Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Container>
    );
};

export default TemplateList;