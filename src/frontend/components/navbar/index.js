/* eslint-disable react/prop-types */
import './navbar.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLandingCtx } from '../../context';
import { SIGNIN, LANDING } from '../../routes/routes';
import pic from '../../assets/logo.webp';

export function Navbar({ hideSearchBar }) {
  const { dispatch } = useLandingCtx();
  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch({
      type: 'SET_SEARCH',
      payload: search
    });
  };

  const handleSearchClear = () => {
    dispatch({ type: 'SEARCH_CLEAR' });
    setSearch('');
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
              <form onSubmit={handleSearch}>
                <input
                  type='text'
                  placeholder='Search'
                  className='input search__input no--bdr'
                  id='user-name'
                  name='user-name'
                  autoComplete='off'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
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
