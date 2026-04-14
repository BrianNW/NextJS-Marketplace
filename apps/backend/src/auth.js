const bcrypt = require('bcrypt');

const USER_ROLES = {
	BUYER: 'buyer',
	SELLER: 'seller',
	ADMIN: 'admin',
	SUPERADMIN: 'superadmin',
};

// In-memory user store
const users = [
	{
		username: 'buyer1',
		email: 'buyer1@example.com',
		password: bcrypt.hashSync('buyerpass', 10),
		firstName: 'Buyer',
		lastName: 'One',
		dob: '1990-01-01',
		shippingAddress: '123 Buyer St',
		billingAddress: '123 Buyer St',
		profilePicture: '',
		role: USER_ROLES.BUYER,
	},
	{
		username: 'seller1',
		email: 'seller1@example.com',
		password: bcrypt.hashSync('sellerpass', 10),
		firstName: 'Seller',
		lastName: 'One',
		dob: '1985-02-02',
		shippingAddress: '456 Seller Ave',
		billingAddress: '456 Seller Ave',
		profilePicture: '',
		role: USER_ROLES.SELLER,
	},
	{
		username: 'admin1',
		email: 'admin1@example.com',
		password: bcrypt.hashSync('adminpass', 10),
		firstName: 'Admin',
		lastName: 'One',
		dob: '1980-03-03',
		shippingAddress: '789 Admin Blvd',
		billingAddress: '789 Admin Blvd',
		profilePicture: '',
		role: USER_ROLES.ADMIN,
	},
	{
		username: 'superadmin1',
		email: 'superadmin1@example.com',
		password: bcrypt.hashSync('superadminpass', 10),
		firstName: 'Super',
		lastName: 'Admin',
		dob: '1975-04-04',
		shippingAddress: '101 Superadmin Rd',
		billingAddress: '101 Superadmin Rd',
		profilePicture: '',
		role: USER_ROLES.SUPERADMIN,
	},
];

// Registration endpoint
async function register(req, res) {
	const { username, email, password, firstName, lastName, dob, shippingAddress, billingAddress, profilePicture, role } = req.body;
	if (!username || !email || !password || !firstName || !lastName || !dob || !shippingAddress || !billingAddress || !role) {
		return res.status(400).json({ message: 'All fields are required' });
	}
	if (password.length < 8) {
		return res.status(400).json({ message: 'Password must be at least 8 characters' });
	}
	if (!Object.values(USER_ROLES).includes(role)) {
		return res.status(400).json({ message: 'Invalid role' });
	}
	if (users.find(u => u.username === username || u.email === email)) {
		return res.status(400).json({ message: 'Username or email already exists' });
	}
	const hashed = await bcrypt.hash(password, 10);
	users.push({ username, email, password: hashed, firstName, lastName, dob, shippingAddress, billingAddress, profilePicture, role });
	res.status(201).json({ message: 'User registered' });
}

// Login endpoint (username or email)
async function login(req, res) {
	const { username, email, password } = req.body;
	if ((!username && !email) || !password) {
		return res.status(400).json({ message: 'Username/email and password required' });
	}
	const user = users.find(u => (u.username === username || u.email === email));
	if (!user) return res.status(401).json({ message: 'Invalid credentials' });
	const valid = await bcrypt.compare(password, user.password);
	if (!valid) return res.status(401).json({ message: 'Invalid credentials' });
	// For demo, just return user info (no JWT yet)
	const { password: pw, ...userInfo } = user;
	res.json({ user: userInfo });
}

module.exports = { register, login };
