import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { purpleTheme } from './';

export const AppTheme = ({ children }) => {
  return (
    <ThemeProvider theme={purpleTheme}>
      <CssBaseline />
      <Container
        sx={{
          maxWidth: '100%',
          padding: 0,
          '@media (min-width: 1200px)': {
            maxWidth: 'initial', // Cambia esto al valor que desees
          },
          '@media (min-width: 600px)': {
            maxWidth: 'initial', // Cambia esto al valor que desees
          },
        }}
      >
        {children}
      </Container>
    </ThemeProvider>
  );
};
