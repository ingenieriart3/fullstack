import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Loader from './common/Loader';
import { AuthProvider } from './hooks/useAuthContext';
import AppRouter from './routes/AppRouter';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <AuthProvider>
        <AppRouter></AppRouter>
      </AuthProvider>
    </>
  );
}

export default App;
