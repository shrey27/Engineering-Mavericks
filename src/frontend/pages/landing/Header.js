import './Header.css';
import { Navbar } from '../../components';
import { Link } from 'react-router-dom';
import { VIDEOS } from '../../routes/routes';
import pic from '../../assets/wallbanner.webp';

export default function Header() {
  return (
    <div className='header'>
      <Navbar hideSearchBar={true} />
      <div className='header__body'>
        <div className='header__body__info'>
          <h1 className='header__primary'>
            Intuitive way of learning for Mavericks of Engineering
          </h1>
          <h1 className='header__secondary'>
            Explore the world of engineering, in an interactive and creative
            manner
          </h1>
          <Link to={VIDEOS} className='header__cta btn--auth--solid sb'>
            Start Learning
          </Link>
        </div>
        <div className='header__body__banner'>
          <img src={pic} alt='banner' className='header__banner' />
        </div>
      </div>
    </div>
  );
}
