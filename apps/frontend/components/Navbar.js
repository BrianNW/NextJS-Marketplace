import styles from '../styles/Home.module.css';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';

export default function Navbar() {
  const { user, logout } = useAuth();

  const getDashboard = (role) => {
    if (role === 'buyer') return '/dashboard/buyer';
    if (role === 'seller') return '/dashboard/seller';
    if (role === 'admin') return '/dashboard/admin';
    if (role === 'superadmin') return '/dashboard/superadmin';
    return '/';
  };

  return (
    <header className={styles.header}>
      <Link href={user ? getDashboard(user.role) : '/'} className={styles.logo} style={{ textDecoration: 'none', color: '#febd69' }}>ShopEase</Link>
      <input className={styles.searchBar} type="text" placeholder="Search for products, brands and more..." />
      <nav className={styles.nav}>
        <a href="#">Today's Deals</a>
        <a href="#">Categories</a>
        {user ? (
          <>
            <Link href={getDashboard(user.role)} style={{ color: '#fff', marginLeft: 16 }}>Dashboard</Link>
            <button onClick={logout} style={{ marginLeft: 16, background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>Logout</button>
          </>
        ) : (
          <>
            <Link href="/login" style={{ color: '#fff', marginLeft: 16 }}>Sign In</Link>
            <Link href="/register" style={{ color: '#fff', marginLeft: 16 }}>Register</Link>
          </>
        )}
        <a href="#">Cart</a>
      </nav>
    </header>
  );
}
