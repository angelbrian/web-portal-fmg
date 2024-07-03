// src/components/auth/Register.js
import { useState } from 'react';
import { useAuth } from '../../components/context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Container, TextField, Button, Box, Typography } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await register(email, password);
      navigate('/ver');
    } catch (error) {
      console.error('Error registrando:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" component="h1" gutterBottom>
          Registro
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
          startIcon={<PersonAddIcon />}
          onClick={handleRegister}
        >
          Registro
        </Button>
        <Box mt={2}>
          <Typography variant="body2">
            ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;