import './videogrid.css';
import { categoryList } from '../../utility/constants';
import { Loader } from '../../utility/Loader';

export function VideoGrid(props) {
  const {
    videos,
    showFilters,
    handleFilterChange,
    handleSubmenu,
    handleModal,
    filter,
    submenuIndex
  } = props;
  
  return (
    <div className='main'>
      {showFilters && (
        <div className='filter'>
          {categoryList.map((elem, idx) => {
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
      {!videos.length ? (
        <Loader />
      ) : (
        <div className='main__grid'>
          {videos.map((elem, index) => {
            return (
              <div className='thumbnail' key={elem._id}>
                <img
                  src={elem.source}
                  alt={`thumbnail_${index + 1}`}
                  className='thumbnail__banner'
                />
                <div className='thumbnail__info'>
                  <div className='thumbnail__title'>
                    <h1>{elem.title}</h1>
                    <h1 className='thumbnail__description'>{elem.creator}</h1>
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
  );
}
