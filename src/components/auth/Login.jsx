// src/components/auth/Login.js
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Container, TextField, Button, Box, Typography } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await login(email, password);
      location.href = '/ver';
    } catch (error) {
      console.error('Error iniciando sesión:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          startIcon={<LoginIcon />}
          onClick={handleLogin}
        >
          Login
        </Button>
        <Box mt={2}>
          <Typography variant="body2">
            ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;