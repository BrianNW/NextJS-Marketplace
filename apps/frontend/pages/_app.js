import '../styles/Home.module.css';
import { AuthProvider } from '../context/AuthContext';
import Navbar from '../components/Navbar';

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Navbar />
      <Component {...pageProps} />
    </AuthProvider>
  );
}
