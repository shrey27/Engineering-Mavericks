import './notfound.css';
import { Link } from 'react-router-dom';
import { Navbar, Footer } from '../../components';
import { LANDING } from '../../routes/routes';
import pic from '../../assets/404.webp';

export default function NotFound() {
  return (
    <div>
      <Navbar />
      <div className='notfound'>
        <img src={pic} alt='404' className='notfound__banner' />
        <Link to={LANDING} className='btn btn--auth--solid md sb mg--full'>
          Start learning
          <i className='fa-solid fa-right-to-bracket'></i>
        </Link>
      </div>
      <Footer fixed={true} />
    </div>
  );
}
