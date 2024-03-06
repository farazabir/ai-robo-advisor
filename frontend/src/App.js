import React, { useState, useEffect } from 'react';
import { ThemeProvider, CssBaseline, Box, IconButton } from '@mui/material';
import { darkTheme, lightTheme } from './theme'; 
import UserDetailModal from './components/UserDetailModal';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Dashboard from './components/Dashboard';
import { getInvestmentAdvice } from './services/apiservice';

function App() {
  const [userId, setUserId] = useState(null);
  const [showModal, setShowModal] = useState(false); 
  const [portfolioData, setPortfolioData] = useState([]);
  const [useDarkTheme, setUseDarkTheme] = useState(true);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId); 
      const storedData = localStorage.getItem(`portfolioData_${storedUserId}`);
      if (storedData) {
        setPortfolioData(JSON.parse(storedData));
      } else {
        setShowModal(true); 
      }
    } else {
      setShowModal(true);
    }
  }, []);

  useEffect(() => {
    const fetchAdvice = async () => {
      if (userId) {
        const storedData = localStorage.getItem(`portfolioData_${userId}`);
        if (!storedData) { 
          try {
            const adviceData = await getInvestmentAdvice(userId);
            setPortfolioData(adviceData);
            localStorage.setItem(`portfolioData_${userId}`, JSON.stringify(adviceData));
          } catch (error) {
            console.error("Failed to fetch portfolio advice:", error);
          }
        }
      }
    };

    fetchAdvice();
  }, [userId]);

  const onUserCreated = (newUserId) => {
    localStorage.setItem('userId', newUserId); 
    setUserId(newUserId);
    setShowModal(false);
  };

  const toggleColorMode = () => {
    setUseDarkTheme(!useDarkTheme);
  };
  const theme = useDarkTheme ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          height: '100vh',
          overflow: 'auto',
          bgcolor: 'background.default',
          color: 'text.primary',
          position: 'relative', 
        }}
      >
        <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
          {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>

        {showModal && (
          <UserDetailModal
            onClose={() => setShowModal(false)}
            onUserCreated={onUserCreated}
          />
        )}
        <Dashboard adviceData={portfolioData} />
      </Box>
    </ThemeProvider>
  );
}

export default App;
