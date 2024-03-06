import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:8000/api/v1';

export const createUserProfile = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/advisor/user/`, userData);
    console.log('createUserProfile data:', response.data);
    return response.data;
  } catch (error) {
    console.error('createUserProfile error:', error.response ? error.response.data : error);
    throw error; 
  }
};

export const getUserProfile = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/advisor/user/${userId}/`);
    console.log('getUserProfile data:', response.data);
    return response.data;
  } catch (error) {
    console.error('getUserProfile error:', error.response ? error.response.data : error);
    throw error; 
  }
};

export const getInvestmentAdvice = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/advisor/user/${userId}/advice/`);
    console.log('getInvestmentAdvice data:', response.data);
    return response.data;
  } catch (error) {
    console.error('getInvestmentAdvice error:', error.response ? error.response.data : error);
    throw error;
  }
};

export const getPortfolioAdvice = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/advisor/portfolio-advice/${userId}/`);
    console.log('getPortfolioAdvice data:', response.data);
    return response.data;
  } catch (error) {
    console.error('getPortfolioAdvice error:', error.response ? error.response.data : error);
    throw error; 
  }
};
