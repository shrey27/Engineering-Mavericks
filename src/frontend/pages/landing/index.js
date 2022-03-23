import './landing.css';
import Header from './Header';
import Category from './Category';
import { Footer } from '../../components';
import { useLandingCtx } from '../../context';
import { useEffect } from 'react';

export default function Landing() {
  const { dispatch } = useLandingCtx();
  
  useEffect(() => {
    dispatch({ type: 'SET_FILTER', payload: 'All' });
  }, [dispatch]);

  return (
    <div>
      <Header />
      <Category />
      <Footer />
    </div>
  );
}
