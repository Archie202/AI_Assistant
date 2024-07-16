import React from 'react';
import AiInteraction from '../components/AiInteraction';

const HomePage = ({ token, onAiRequest }) => (
  <div>
    <h1>Welcome to AI Personal Assistant</h1>
    <AiInteraction onAiRequest={onAiRequest} />
  </div>
);

export default HomePage;
