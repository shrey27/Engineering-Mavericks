import './notfound.css';
import { Link } from 'react-router-dom';
import { Navbar, Footer } from '../../components';
import { LANDING } from '../../routes/routes';

export default function NotFound() {
  return (
    <div>
      <Navbar />
      <div className='notfound'>
        <Link to={LANDING} className='btn btn--auth--solid'>
          Start learning
        </Link>
      </div>
      <Footer fixed={true} />
    </div>
  );
}
