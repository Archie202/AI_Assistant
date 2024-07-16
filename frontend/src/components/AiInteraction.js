import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const AiInteraction = ({ onAiRequest }) => {
  const [request, setRequest] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAiRequest(request);
  };

  return (
    <div>
      <h2>Ask AI</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Control type="text" value={request} onChange={(e) => setRequest(e.target.value)} placeholder="Ask something..." required />
        </Form.Group>
        <Button variant="primary" type="submit">Submit</Button>
      </Form>
    </div>
  );
};

export default AiInteraction;
