/* eslint-disable react/prop-types */
import './navbar.css';
// import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SIGNIN, LANDING } from '../../../routes';

export function Navbar() {
  //   const [search, setSearch] = useState('');
  //   const handleSearch = (e) => {
  //     e.preventDefault();
  //     const { value } = e.target;
  //     setSearch(value);
  //     dispatch({
  //       type: 'NAVBAR_ITEM_SEARCH',
  //       payload: value.toLowerCase()
  //     });
  //   };

  //   const handleSearchClear = () => {
  //     dispatch({ type: 'NAVBAR_SEARCH_CLEAR' });
  //     setSearch('');
  //   };

  return (
    <div>
      <nav className='navbar xs-s border--btm'>
        <section className='start'>
          <Link to={LANDING} className='start link__style'>
            <img src='logo.png' className='header__nav__image' alt='logo' />
            <div className=''>
              <h1 className='header__nav__brand'>Engineering</h1>
              <h1 className='header__nav__brand'>Mavericks</h1>
            </div>
          </Link>
        </section>
        <section className='middle'>
          <div className='search__ctr'>
            {/* {!search && <i className='fas fa-search search--btn'></i>} */}
            <i className='fas fa-search search__btn'></i>
            {/* <i className='fa-solid fa-xmark search__btn'></i> */}
            <input
              type='text'
              placeholder='Search'
              className='input search__input no--bdr'
              id='user-name'
              name='user-name'
              autoComplete='off'
              // value={search}
              // onChange={handleSearch}
            />
            {/* {search && (
                <i
                  className='fa-solid fa-xmark search--btn'
                  onClick={handleSearchClear}
                ></i>
              )} */}
          </div>
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
