import {React,useState} from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Typography, Paper, Box, Container, Grid,  LinearProgress,IconButton } from '@mui/material';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import prepareChartData from '../services/processservice';


function Dashboard({ adviceData }) {
  let pieChartData = [];
  let lineChartData = [];
  const [highlightedText, setHighlightedText] = useState('');

  if (adviceData) {
    const preparedData = prepareChartData(adviceData);
    pieChartData = preparedData.pieChartData;
    lineChartData = preparedData.lineChartData;
  }

  const COLORS = ['#BB86FC', '#03DAC5', '#CF6679', '#FFDE03'];
   
  const speakText = (text, rate = 1) => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel(); 
      setHighlightedText(''); 
      return; 
    }
  
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    const words = text.split(/(\s+)/);
    let currentIndex = 0;
  
    utterance.onboundary = (event) => {
      if (event.name === 'word') {
        const highlighted = words.slice(0, currentIndex + 1).join('');
        setHighlightedText(highlighted); 
        currentIndex += 2;
      }
    };
  
    utterance.onend = () => {
      setHighlightedText(''); 
    };
  
    window.speechSynthesis.speak(utterance);
  };
  

  

  return (
      <Container>
        {!adviceData ? (
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <LinearProgress style={{ width: '100%' }} color="primary" />
          </Box>
        ) : (
          <Box sx={{ mt: 4, bgcolor: 'background.default', color: 'text.primary' }}>
            <Grid container spacing={2}>
              {/* Pie Chart */}
              <Grid item xs={12} sm={6}>
                <Paper elevation={1} sx={{ p: 2, bgcolor: 'background.paper', color: 'text.primary' }}>
                  <Typography variant="h6" gutterBottom color="textPrimary">
                    Investment Portfolio Distribution
                  </Typography>
                  <PieChart width={400} height={400}>
                    <Pie data={pieChartData} cx="50%" cy="50%" outerRadius={100} dataKey="value" nameKey="name" label>
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Paper elevation={1} sx={{ p: 2, bgcolor: 'background.paper', color: 'text.primary' }}>
                  <Typography variant="h6" gutterBottom color="textPrimary">
                    Equity Percentage Over Time
                  </Typography>
                  <LineChart width={400} height={400} data={lineChartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="name" stroke="#ccc" />
                    <YAxis stroke="#ccc" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="Equity" stroke="#BB86FC" />
                  </LineChart>
                </Paper>
              </Grid>
            </Grid>
            {/* Displaying the advice details */}
            <Paper elevation={1} sx={{ mt: 2, p: 2, bgcolor: 'background.paper', color: 'text.primary' }}>
      <Typography style={{ whiteSpace: 'pre-line', color: 'text.primary', position: 'relative' }}>
      <IconButton 
      onClick={() => speakText(adviceData.advice_details)} 
      color="primary"
      sx={{ position: 'absolute', top: 0, right: 0 }}
    >
      <PlayCircleFilledWhiteIcon />
    </IconButton>
        {adviceData.advice_details}
      </Typography>
    </Paper>
          </Box>
        )}
      </Container>
  );
}

export default Dashboard;
