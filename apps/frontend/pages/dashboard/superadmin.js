import { useAuth } from '../../context/AuthContext';

export default function SuperAdminDashboard() {
  const { user } = useAuth();
  if (!user || user.role !== 'superadmin') return <div style={{padding:40}}>Access denied.</div>;
  return (
    <div style={{maxWidth:800,margin:'40px auto',background:'#fff',padding:32,borderRadius:8}}>
      <h2>Super Admin Dashboard</h2>
      <p>Welcome, {user.firstName}!</p>
      <ul>
        <li>All admin permissions</li>
        <li>Manage Stripe and payment settings</li>
        <li>Set platform commission fee</li>
      </ul>
    </div>
  );
}
