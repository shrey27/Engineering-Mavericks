import './notfound.css';
import { Link } from 'react-router-dom';
import { Navbar, Footer } from '../../components';
import { LANDING } from '../../routes/routes';
import pic from '../../assets/notfound.gif';

export default function NotFound() {
  return (
    <div>
      <Navbar />
      <div className='notfound'>
        <h1 className='notfound__primary'>404 Error Found!</h1>
        <img src={pic} alt='404' className='notfound__banner' />
        <Link to={LANDING} className='btn btn--auth--solid md sb mg--full'>
          Go back to Homepage
          <i className='fa-solid fa-right-to-bracket'></i>
        </Link>
      </div>
      <Footer fixed={true} />
    </div>
  );
}
