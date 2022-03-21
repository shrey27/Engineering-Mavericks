import './videogrid.css';
import { useState, useEffect } from 'react';
import { categoryList } from '../constants';
import Modal from './Modal';
import { Fragment } from 'react/cjs/react.production.min';
import { Loader } from '../Loader';

export function VideoGrid({ videos, showFilters }) {
  const [submenuIndex, setSubmenuIndex] = useState(-1);
  const [modalOpen, setModalOpen] = useState(false);
  const [videoList, setVideoList] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const tempList = [...videos];
    setVideoList(
      tempList.filter((e) => (filter === 'All' ? true : e.category === filter))
    );
  }, [filter, videos]);

  const handleSubmenu = (idx) => {
    if (idx === submenuIndex) {
      setSubmenuIndex(-1);
    } else {
      setSubmenuIndex(idx);
    }
  };

  const handleModal = () => {
    setSubmenuIndex(-1);
    setModalOpen(true);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <Fragment>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} />
      <div className='videogrid'>
        <div className={`sidebar ${!videos?.length && 'sidefixed'}`}>
          <div className='sidebar__options selected'>
            <i className='fa-solid fa-video'></i>
            <span className='sidebar__options__span'>Videos</span>
          </div>
          <div className='sidebar__options'>
            <i className='fa-regular fa-circle-play'></i>
            <span className='sidebar__options__span'>Playlists</span>
          </div>
          <div className='sidebar__options'>
            <i className='fa-regular fa-clock'></i>
            <span className='sidebar__options__span'>Watch Later</span>
          </div>
          <div className='sidebar__options'>
            <i className='fa-regular fa-thumbs-up'></i>
            <span className='sidebar__options__span'>Liked Videos</span>
          </div>
          <div className='sidebar__options'>
            <i className='fa-solid fa-clock-rotate-left'></i>
            <span className='sidebar__options__span'>History</span>
          </div>
        </div>
        <div className='main'>
          {showFilters && (
            <div className='filter'>
              {categoryList.map((elem,idx) => {
                return (
                  <label
                    key={idx}
                    className={`filter__option ${elem === filter && 'chosen'}`}
                    htmlFor={elem}
                  >
                    <input
                      type='radio'
                      className='filter__option__input'
                      id={elem}
                      name='filter'
                      value={elem}
                      onChange={handleFilterChange}
                    />
                    {elem}
                  </label>
                );
              })}
            </div>
          )}
          {!videoList.length ? (
            <Loader />
          ) : (
            <div className='main__grid'>
              {videoList.map((elem, index) => {
                return (
                  <div className='thumbnail'>
                    <img
                      key={elem._id}
                      src={elem.source}
                      alt={`thumbnail_${index + 1}`}
                      className='thumbnail__banner'
                    />
                    <div className='thumbnail__info'>
                      <div className='thumbnail__title'>
                        <h1>{elem.title}</h1>
                        <h1 className='thumbnail__description'>
                          {elem.creator}
                        </h1>
                      </div>
                      <div className='thumbnail__info__icon'>
                        <i
                          className='fa-solid fa-ellipsis-vertical'
                          onClick={handleSubmenu.bind(this, index)}
                        ></i>
                      </div>
                      {index === submenuIndex && (
                        <div className='thumbnail__submenu'>
                          <h1>
                            <i className='fa-regular fa-clock'></i> Watch Later
                          </h1>
                          <h1 onClick={handleModal}>
                            <i className='fa-regular fa-circle-play'></i>
                            Add to Playlist
                          </h1>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
}
