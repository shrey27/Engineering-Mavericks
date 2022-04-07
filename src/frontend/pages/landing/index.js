import { lazy, Suspense } from 'react';
import './landing.css';
import { Loader, Footer } from '../../components';
import { useLandingCtx } from '../../context';
import { useEffect } from 'react';

const Header = lazy(() => import('./Header.js'));
const Category = lazy(() => import('./Category.js'));

export default function Landing() {
  const { dispatch } = useLandingCtx();

  useEffect(() => {
    dispatch({ type: 'SET_FILTER', payload: 'All' });
  }, [dispatch]);

  return (
    <Suspense fallback={<Loader />}>
      <div>
        <Header />
        <Category />
        <Footer />
      </div>
    </Suspense>
  );
}
