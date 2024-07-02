// src/App.jsx
import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Button, Box } from '@mui/material';
import { UploadFile, Visibility } from '@mui/icons-material';

import FileUpload from './components/FileUpload';
import DataView from './components/Views';

const App = () => {
{/* <div>
<nav>
<ul>
<li>
<Link to="/upload">Upload File</Link>
</li>
<li>
<Link to="/view">View Data</Link>
</li>
</ul>
</nav>
<Routes>
<Route path="/upload" element={<FileUpload />} />
<Route path="/view" element={<DataView />} />
</Routes>
</div> */}
return (
  <>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Portal
        </Typography>
        <Button color="inherit" component={Link} to="/upload" startIcon={<UploadFile />}>
          Subir balanza
        </Button>
        <Button color="inherit" component={Link} to="/view" startIcon={<Visibility />}>
          Ver desglose
        </Button>
      </Toolbar>
    </AppBar>
    <Container>
      <Box mt={2}>
        <Routes>
          <Route path="/upload" element={<FileUpload />} />
          <Route path="/view" element={<DataView />} />
        </Routes>
      </Box>
    </Container>
  </>
)
}

export default App;