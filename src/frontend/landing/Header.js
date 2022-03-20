import './Header.css';
import { Navbar } from '../utility';
export default function Header() {
  return (
    <div className='header'>
      <Navbar />
      <div className='header__body'>
        <div className='header__body__info'>
          <h1 className='header__primary'>
            Intuitive way of learning for Mavericks of Engineering
          </h1>
          <h1 className='header__secondary'>
            Explore the world of engineering, in an interactive and creative
            manner
          </h1>
          <button className='header__cta btn--auth--solid sb'>
            Start Learning
          </button>
        </div>
        <div className='header__body__banner'>
          <img src='banner.png' alt='banner' className='header__banner' />
        </div>
      </div>
    </div>
  );
}
