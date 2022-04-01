import { useEffect } from 'react';
import { availableRoutes } from './frontend/routes/routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: 0 });
    }, 0);
  }, [pathname]);
  return null;
};

function App() {
  
  return (
    <div className=''>
      <ScrollToTop />
      {availableRoutes}
      <ToastContainer style={{ fontWeight: '500', fontSize: '1.25rem' }} />
    </div>
  );
}

export default App;
