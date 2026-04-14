const express = require('express');
const cors = require('cors');
const app = express();

const { login, register } = require('./auth');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running');
});

// Auth endpoints
app.post('/api/auth/login', login);
app.post('/api/auth/register', register);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
