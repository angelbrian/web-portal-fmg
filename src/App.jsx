import { Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Button, Box } from '@mui/material';
import { UploadFile, Visibility, PersonAdd, AppRegistration, Login as LoginIcon, GroupWork } from '@mui/icons-material';

import FileUpload from './components/FileUpload';
import DataView from './components/Views';
import ApproveUsers from './components/auth/ApproveUsers';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import PrivateRoute from './components/PrivateRoute';
// import { AuthProvider, useAuth } from './context/AuthContext';
// import { useAuth } from './context/AuthContext';
import Agroups from './components/Agroups';
import { AwaitApprove } from './components/auth/AwaitApprove';
import { AuthProvider, useAuth } from './components/context/AuthContext';
import { useEffect, useState } from 'react';
import { firestore } from './helpers/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

const Navigation = () => {
  const { currentUser } = useAuth();
  const [approved, setApproved] = useState(false);

  useEffect(() => {

    const inDoc = async () => {

      const q = query(collection(firestore, 'pendingUsers')/*, where('approved', '==', false)*/);
      const querySnapshot = await getDocs(q);
      querySnapshot.docs.forEach((doc) => {
        if( doc.data().email === currentUser.email && doc.data().approved )
          setApproved( true );
      });

    }

    inDoc();

  }, [])

  return (
    <>
      {currentUser && approved && (
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
          <Button color="inherit" component={Link} to="/agrupaciones" startIcon={<GroupWork />}>
            Agrupaciones
          </Button>
        </>
      )}
      {!currentUser && (
        <>
          <Button color="inherit" component={Link} to="/registro" startIcon={<AppRegistration />}>
            Registro
          </Button>
          <Button color="inherit" component={Link} to="/login" startIcon={<LoginIcon />}>
            Iniciar sesión
          </Button>
          <Button color="inherit" component={Link} to="/agrupaciones" startIcon={<GroupWork />}>
            Agrupaciones
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
            <Route path="/aprobacion" element={<AwaitApprove />} />
            <Route path="/subir" element={<PrivateRoute><FileUpload /></PrivateRoute>} />
            <Route path="/ver" element={<PrivateRoute><DataView /></PrivateRoute>} />
            <Route path="/aprobar" element={<PrivateRoute><ApproveUsers /></PrivateRoute>} />
            <Route path="/agrupaciones" element={<PrivateRoute><Agroups /></PrivateRoute>} />
            <Route path="/" element={<PrivateRoute><DataView /></PrivateRoute>} />
          </Routes>
        </Box>
      </Container>
    </AuthProvider>
  );
};

export default App;
