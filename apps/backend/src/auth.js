const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const USER_ROLES = require('../../../packages/common/userRoles.js');

// Example User model (replace with DB integration)
const users = [];

const register = async (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password || !role) return res.status(400).json({ message: 'All fields required' });
  if (!Object.values(USER_ROLES).includes(role)) return res.status(400).json({ message: 'Invalid role' });
  if (password.length < 8) return res.status(400).json({ message: 'Password too short' });
  const hashed = await bcrypt.hash(password, 10);
  users.push({ username, password: hashed, role });
  res.status(201).json({ message: 'User registered' });
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};

module.exports = { register, login };
