import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import TaskPage from './pages/TaskPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setToken(token);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
  };

  const handleAiRequest = async (request) => {
    // Logic to handle AI requests
  };

  return (
    <Router>
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<HomePage token={token} onAiRequest={handleAiRequest} />} />
          <Route path="/tasks" element={<TaskPage token={token} />} />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/register" element={<RegisterPage onRegister={handleLogin} />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
