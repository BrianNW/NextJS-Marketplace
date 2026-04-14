import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Register() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    dob: '',
    shippingAddress: '',
    billingAddress: '',
    profilePicture: '',
    role: 'buyer',
  });
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === 'profilePicture') {
      setForm(f => ({ ...f, profilePicture: files[0] ? URL.createObjectURL(files[0]) : '' }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', form);
      setMessage('Registration successful!');
      // Redirect based on role
      if (form.role === 'buyer') router.push('/dashboard/buyer');
      else if (form.role === 'seller') router.push('/dashboard/seller');
      else if (form.role === 'admin') router.push('/dashboard/admin');
      else if (form.role === 'superadmin') router.push('/dashboard/superadmin');
      else router.push('/');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: '40px auto', background: '#fff', padding: 24, borderRadius: 8 }}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" value={form.username} onChange={handleChange} required style={{ width: '100%', marginBottom: 8 }} />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required style={{ width: '100%', marginBottom: 8 }} />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required style={{ width: '100%', marginBottom: 8 }} />
        <input name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} required style={{ width: '100%', marginBottom: 8 }} />
        <input name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} required style={{ width: '100%', marginBottom: 8 }} />
        <input name="dob" type="date" placeholder="Date of Birth" value={form.dob} onChange={handleChange} required style={{ width: '100%', marginBottom: 8 }} />
        <input name="shippingAddress" placeholder="Shipping Address" value={form.shippingAddress} onChange={handleChange} required style={{ width: '100%', marginBottom: 8 }} />
        <input name="billingAddress" placeholder="Billing Address" value={form.billingAddress} onChange={handleChange} required style={{ width: '100%', marginBottom: 8 }} />
        <input name="profilePicture" type="file" accept="image/*" onChange={handleChange} style={{ width: '100%', marginBottom: 8 }} />
        <select name="role" value={form.role} onChange={handleChange} style={{ width: '100%', marginBottom: 16 }}>
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
          <option value="admin">Admin</option>
          <option value="superadmin">Super Admin</option>
        </select>
        <button type="submit" style={{ width: '100%', padding: 10, background: '#febd69', border: 'none', borderRadius: 4, fontWeight: 'bold' }}>Register</button>
      </form>
      <p style={{ color: message.includes('success') ? 'green' : 'red', marginTop: 12 }}>{message}</p>
    </div>
  );
}
