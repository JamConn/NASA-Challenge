const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;
const NASA_API_KEY = 'J3wImE5b669bBhxmLQSMhqUeQ62IWcbayvgEXl3H';  // Use your API key

// Route to fetch APOD
app.get('/api/apod', async (req, res) => {
  try {
    const apodData = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`);
    res.json(apodData.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch APOD data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});