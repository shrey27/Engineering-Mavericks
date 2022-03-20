import './Header.css';

export default function Header() {
  return (
    <div className='header'>
      <div className='header__nav'>
        <div className='flex-ct-st'>
          <img src='logo.png' className='header__nav__image' alt='logo' />
          <div className=''>
            <h1 className='header__nav__brand'>Engineering</h1>
            <h1 className='header__nav__brand'>Mavericks</h1>
          </div>
        </div>
        <button className='btn btn--auth--solid sb'>
          <span className='btn--auth--view'>Sign In</span>
          <i className='fa-solid fa-right-to-bracket'></i>
        </button>
      </div>
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
