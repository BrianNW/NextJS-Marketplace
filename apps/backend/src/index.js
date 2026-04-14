require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());


const { register, login } = require('./auth');

app.get('/', (req, res) => {
  res.send('API is running');
});

app.post('/api/auth/register', register);
app.post('/api/auth/login', login);

// Export for testing
module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
