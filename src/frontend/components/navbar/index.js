/* eslint-disable react/prop-types */
import './navbar.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLandingCtx, useAuthCtx } from '../../context';
import { SIGNIN, LANDING, VIDEOS } from '../../routes/routes';
import pic from '../../assets/logo.webp';
import { SignoutModal } from '../modal/SignoutModal';

export function Navbar({ hideSearchBar }) {
  const [signoutModal, setSignoutModal] = useState(false);
  const { state, dispatch, handleSearchSubmit } = useLandingCtx();
  const { token, handleSignOut, username } = useAuthCtx();
  const { search } = state;

  const handleSearch = (e) => {
    dispatch({
      type: 'SET_SEARCH',
      payload: e.target.value
    });
  };

  const handleSearchClear = () => {
    dispatch({ type: 'SEARCH_CLEAR' });
  };

  return (
    <div>
      {signoutModal && (
        <SignoutModal
          setSignoutModal={setSignoutModal}
          handleSignOut={handleSignOut}
        />
      )}
      <nav className='navbar xs-s border--btm'>
        <section className='begin'>
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
          {token ? (
            <div className='menu'>
              <Link to={VIDEOS} className='menu__icon'>
                <i className='fa-solid fa-house'></i>
              </Link>
              <i className='far fa-user-circle menu__icon'></i>
              <div className='submenu'>
                <h1 className='md sb cen'>Hey {username.split(' ')[0]}</h1>
                <hr className='mg--full' />
                <button
                  className='end__btn btn btn--auth--solid sb'
                  onClick={() => setSignoutModal(true)}
                >
                  <span className='end__span'>SIGN OUT</span>
                  <i className='fa-solid fa-right-to-bracket'></i>
                </button>
              </div>
            </div>
          ) : (
            <Link className='end__btn btn btn--auth--solid sb' to={SIGNIN}>
              <span className='end__span'>SIGN IN</span>
              <i className='fa-solid fa-right-to-bracket'></i>
            </Link>
          )}
        </section>
      </nav>
    </div>
  );
}
