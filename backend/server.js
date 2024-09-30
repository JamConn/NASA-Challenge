require('dotenv').config();

const express = require('express');
const axios = require('axios');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


const NASA_API_KEY = process.env.NASA_API_KEY;

app.get('/api/apod', async (req, res) => {
  try {
      const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`);
      res.json(response.data);
  } catch (error) {
      console.error("Error fetching APOD data: ", error);
      res.status(500).json({ error: 'Error fetching APOD data' });
  }
});


app.get('/api/near-miss', async (req, res) => {
  const startDate = new Date();
  const endDate = new Date();
  endDate.setDate(startDate.getDate() + 7);

  try {
      const response = await axios.get(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate.toISOString().split('T')[0]}&end_date=${endDate.toISOString().split('T')[0]}&api_key=${NASA_API_KEY}`);
      res.json(response.data);
  } catch (error) {
      console.error("Error fetching NEO data: ", error);
      res.status(500).json({ error: 'Error fetching NEO data' });
  }
});


app.get('/api/epic-images', async (req, res) => {
  try {
    const response = await axios.get(`https://api.nasa.gov/EPIC/api/natural/images?api_key=${NASA_API_KEY}`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching EPIC images:', error.message);
    res.status(error.response ? error.response.status : 500).json({ error: 'Error fetching EPIC images' });
  }
});


app.get('/api/mars-rover-images', async (req, res) => {
  try {
    const response = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${NASA_API_KEY}`);
    res.json(response.data.photos);
  } catch (error) {
    console.error('Error fetching Mars Rover images:', error.message);
    res.status(error.response ? error.response.status : 500).json({ error: 'Error fetching Mars Rover images' });
  }
});


app.get('/api/space-images', async (req, res) => {
  try {
    const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`);
    res.json([response.data]); 
  } catch (error) {
    console.error('Error fetching Space images:', error.message);
    res.status(error.response ? error.response.status : 500).json({ error: 'Error fetching Space images' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});