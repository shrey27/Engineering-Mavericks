/* eslint-disable react/prop-types */
import './navbar.css';
import { Link } from 'react-router-dom';
import { useLandingCtx } from '../../context';
import { SIGNIN, LANDING } from '../../routes/routes';
import pic from '../../assets/logo.webp';

export function Navbar({ hideSearchBar }) {
  const { state, dispatch, handleSearchSubmit } = useLandingCtx();
  const { search } = state;

  const handleSearch = (e) => {
    dispatch({
      type: 'SET_SEARCH',
      payload: e.target.value
    });
  };

  const handleSearchClear = () => {
    dispatch({ type: 'SEARCH_CLEAR', payload: '' });
  };

  return (
    <div>
      <nav className='navbar xs-s border--btm'>
        <section className='start'>
          <Link to={LANDING} className='start link__style'>
            <img src={pic} className='header__nav__image' alt='logo' />
            <div className=''>
              <h1 className='header__nav__brand'>Engineering</h1>
              <h1 className='header__nav__brand'>Mavericks</h1>
            </div>
          </Link>
        </section>
        <section className='middle'>
          {!hideSearchBar && (
            <div className='search__ctr'>
              {!search && <i className='fas fa-search search__btn'></i>}
              {search && (
                <i
                  className='fa-solid fa-xmark search__btn'
                  onClick={handleSearchClear}
                ></i>
              )}
              <form onSubmit={handleSearchSubmit}>
                <input
                  type='text'
                  placeholder='Search'
                  className='input search__input no--bdr'
                  id='user-name'
                  name='user-name'
                  autoComplete='off'
                  value={search}
                  onChange={handleSearch}
                />
              </form>
            </div>
          )}
        </section>
        <section className='end'>
          <Link className='btn btn--auth--solid sb' to={SIGNIN}>
            <span className='btn--auth--view'>Sign In</span>
            <i className='fa-solid fa-right-to-bracket'></i>
          </Link>
        </section>
      </nav>
    </div>
  );
}
