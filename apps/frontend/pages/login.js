import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const result = await login(form);
    if (result.success) {
      setMessage('Login successful!');
      // Redirect based on role
      const user = JSON.parse(localStorage.getItem('user'));
      if (user?.role === 'buyer') router.push('/dashboard/buyer');
      else if (user?.role === 'seller') router.push('/dashboard/seller');
      else if (user?.role === 'admin') router.push('/dashboard/admin');
      else if (user?.role === 'superadmin') router.push('/dashboard/superadmin');
      else router.push('/');
    } else {
      setMessage(result.message);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '40px auto', background: '#fff', padding: 24, borderRadius: 8 }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" value={form.username} onChange={handleChange} style={{ width: '100%', marginBottom: 8 }} />
        <div style={{ textAlign: 'center', margin: '8px 0' }}>or</div>
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} style={{ width: '100%', marginBottom: 8 }} />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required style={{ width: '100%', marginBottom: 16 }} />
        <button type="submit" style={{ width: '100%', padding: 10, background: '#febd69', border: 'none', borderRadius: 4, fontWeight: 'bold' }}>Login</button>
      </form>
      <p style={{ color: message.includes('success') ? 'green' : 'red', marginTop: 12 }}>{message}</p>
    </div>
  );
}
