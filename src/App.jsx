import { Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Button, Box } from '@mui/material';
import { UploadFile, Visibility, PersonAdd, AppRegistration, Login as LoginIcon } from '@mui/icons-material';

import FileUpload from './components/FileUpload';
import DataView from './components/Views';
import ApproveUsers from './components/auth/ApproveUsers';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import PrivateRoute from './components/PrivateRoute';
// import { AuthProvider, useAuth } from './context/AuthContext';
import { AuthProvider, useAuth } from './components/context/AuthContext';

const Navigation = () => {
  const { currentUser } = useAuth();

  return (
    <>
      {currentUser && (
        <>
          <Button color="inherit" component={Link} to="/subir" startIcon={<UploadFile />}>
            Subir balanza
          </Button>
          <Button color="inherit" component={Link} to="/ver" startIcon={<Visibility />}>
            Ver desglose
          </Button>
          <Button color="inherit" component={Link} to="/aprobar" startIcon={<PersonAdd />}>
            Aprobar usuarios
          </Button>
        </>
      )}
      {!currentUser && (
        <>
          <Button color="inherit" component={Link} to="/registro" startIcon={<AppRegistration />}>
            Registro
          </Button>
          <Button color="inherit" component={Link} to="/login" startIcon={<LoginIcon />}>
            Login
          </Button>
        </>
      )}
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Portal
          </Typography>
          <Navigation />
        </Toolbar>
      </AppBar>
      <Container>
        <Box mt={2}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Register />} />
            <Route path="/subir" element={<PrivateRoute><FileUpload /></PrivateRoute>} />
            <Route path="/ver" element={<PrivateRoute><DataView /></PrivateRoute>} />
            <Route path="/aprobar" element={<PrivateRoute><ApproveUsers /></PrivateRoute>} />
            <Route path="/" element={<PrivateRoute><DataView /></PrivateRoute>} />
            <Route path="*" element={<PrivateRoute><DataView /></PrivateRoute>} />
          </Routes>
        </Box>
      </Container>
    </AuthProvider>
  );
};

export default App;
