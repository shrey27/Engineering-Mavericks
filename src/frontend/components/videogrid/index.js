import './videogrid.css';
import { Link } from 'react-router-dom';
import { VIDEOS } from '../../routes/routes';
import { useLikedCtx } from '../../context';
import { Empty } from '../../components';

export function VideoGrid(props) {
  const {
    videos,
    isWishlist,
    isHistory,
    handleSubmenu,
    handleModal,
    submenuIndex
  } = props;
  const { deleteLikedFromList } = useLikedCtx();

  const handleDeleteLikedvideo = (video) => {
    deleteLikedFromList(video._id);
    handleSubmenu(-1);
  };

  return (
    <>
      {!videos.length ? (
        <Empty />
      ) : (
        <div className='thumbnail__grid'>
          {videos.map((elem, index) => {
            return (
              <div className='thumbnail' key={elem._id}>
                <Link to={`${VIDEOS}/${elem._id}`}>
                  <img
                    src={`https://i.ytimg.com/vi/${elem.video}/hqdefault.jpg`}
                    alt={`thumbnail_${index + 1}`}
                    className='thumbnail__banner'
                  />
                </Link>

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
                      {isWishlist && (
                        <h1 onClick={handleDeleteLikedvideo.bind(this, elem)}>
                          <i className='fa-solid fa-trash'></i>
                          Remove the video
                        </h1>
                      )}
                      {isHistory && (
                        <h1
                          onClick={handleDeleteLikedvideo.bind(this, elem)}
                          className='tag'
                        >
                          <i className='fa-solid fa-trash'></i>
                          Delete from History
                        </h1>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
