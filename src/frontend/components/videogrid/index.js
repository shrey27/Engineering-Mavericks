import './videogrid.css';

export function VideoGrid(props) {
  const { videos, handleSubmenu, handleModal, submenuIndex } = props;

  return (
    <div className='thumbnail__grid'>
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
  );
}
