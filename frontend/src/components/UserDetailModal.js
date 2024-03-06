import React, { useState } from 'react';
import { createUserProfile } from '../services/apiservice';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Select, MenuItem, InputLabel, FormControl, createTheme, ThemeProvider } from '@mui/material';

const modalTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#BB86FC',
    },
    background: {
      default: '#121212',
      paper: '#121212',
    },
    text: {
      primary: '#FFFFFF',
    },
  },
});

function UserDetailModal({ onClose, onUserCreated }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '', 
    risk_preference: '',
    annual_earnings: '',
    investment_focus: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
        const response = await createUserProfile(formData);
        if (response && response.id) {
            onUserCreated(response.id); 
            onClose(); 
        }
    } catch (error) {
        console.error("Error creating user profile:", error);
    }
  };

  return (
    <ThemeProvider theme={modalTheme}>
      <Dialog open={true} onClose={onClose} aria-labelledby="form-dialog-title" PaperProps={{ style: { backgroundColor: '#121212' } }}>
        <DialogTitle id="form-dialog-title" style={{ color: '#FFFFFF' }}>User Details</DialogTitle>
        <DialogContent>
          <DialogContentText style={{ color: '#FFFFFF' }}>
          Put User Details To generate Graph
            </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
          name="name"
          fullWidth
          value={formData.name}
          onChange={handleChange}
        />
        <TextField 
          margin="dense"
          id="email"
          label="Email Address"
          type="email"
          name="email"
          fullWidth
          value={formData.email}
          onChange={handleChange}
        />
        <FormControl fullWidth margin="dense">
          <InputLabel id="risk_preference-label">Risk Preference</InputLabel>
          <Select
            labelId="risk_preference-label"
            id="risk_preference"
            name="risk_preference"
            value={formData.risk_preference}
            onChange={handleChange}
            label="Risk Preference"
          >
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="High">High</MenuItem>
          </Select>
        </FormControl>
        <TextField
          margin="dense"
          id="annual_earnings"
          label="Annual Earnings"
          type="number"
          name="annual_earnings"
          fullWidth
          value={formData.annual_earnings}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          id="investment_focus"
          label="Investment Focus"
          type="text"
          name="investment_focus"
          fullWidth
          value={formData.investment_focus}
          onChange={handleChange}
        />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}

export default UserDetailModal;
