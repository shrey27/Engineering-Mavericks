import './videogrid.css';
import { Link } from 'react-router-dom';
import { VIDEOS } from '../../routes/routes';
import {
  useHistoryCtx,
  useLikedCtx,
  usePlaylistCtx,
  useWatchCtx
} from '../../context';
import { Empty } from '../../components';

export function VideoGrid(props) {
  const {
    videos,
    isWishlist,
    isHistory,
    isWatchlater,
    handleSubmenu,
    handleModal,
    submenuIndex
  } = props;

  const { deleteLikedFromList } = useLikedCtx();
  const { deleteFromHistoryList, clearHistoryList } = useHistoryCtx();
  const { clearWatchLaterList, deleteFromWatchLaterList, addToWatchlist } =
    useWatchCtx();
  const { dispatch } = usePlaylistCtx();

  const handleAddToWatchLater = (video) => {
    addToWatchlist(video);
    handleSubmenu(-1);
  };
  const handleDeleteLikedvideo = (id) => {
    deleteLikedFromList(id);
    handleSubmenu(-1);
  };
  const handleDeleteWatchedvideo = (id) => {
    deleteFromHistoryList(id);
    handleSubmenu(-1);
  };
  const handleDeleteWatchedLatervideo = (id) => {
    deleteFromWatchLaterList(id);
    handleSubmenu(-1);
  };

  const handleModalFunction = (id) => {
    handleModal();
    dispatch({ type: 'ADD_VIDEO_ID', payload: id });
  };

  return (
    <>
      {!videos.length ? (
        <Empty />
      ) : (
        <div>
          {(isHistory || isWatchlater) && (
            <div className='thumbnail__grid__header'>
              <h1 className='thumbnail__grid__title'>
                {isWatchlater ? 'Saved' : 'Watched'} Videos (
                {videos.length > 1
                  ? `${videos.length} videos`
                  : `${videos.length} video`}
                )
              </h1>
              <button
                className='btn btn--auth sb'
                onClick={isWatchlater ? clearWatchLaterList : clearHistoryList}
              >
                Clear All
              </button>
            </div>
          )}
          <div className='thumbnail__grid'>
            {videos.map((elem, index) => {
              const { _id, title, creator, video } = elem;
              return (
                <div className='thumbnail' key={_id}>
                  <Link to={`${VIDEOS}/${_id}`}>
                    <img
                      src={`https://i.ytimg.com/vi/${video}/hqdefault.jpg`}
                      alt={`thumbnail_${index + 1}`}
                      className='thumbnail__banner'
                    />
                  </Link>

                  <div className='thumbnail__info'>
                    <div className='thumbnail__title'>
                      <h1>{title}</h1>
                      <h1 className='thumbnail__description'>{creator}</h1>
                    </div>
                    <div className='thumbnail__info__icon'>
                      <i
                        className='fa-solid fa-ellipsis-vertical'
                        onClick={handleSubmenu.bind(this, index)}
                      ></i>
                    </div>
                    {index === submenuIndex && (
                      <div className='thumbnail__submenu'>
                        <h1
                          onClick={
                            isWatchlater
                              ? handleDeleteWatchedLatervideo.bind(this, _id)
                              : handleAddToWatchLater.bind(this, elem)
                          }
                          className={`${
                            isWatchlater && 'thumbnail__submenu__delete'
                          }`}
                        >
                          <i className='fa-regular fa-clock'></i>{' '}
                          {isWatchlater ? 'Remove the Video' : 'Watch Later'}
                        </h1>
                        <h1 onClick={handleModalFunction.bind(this, _id)}>
                          <i className='fa-regular fa-circle-play'></i>
                          Add to Playlist
                        </h1>
                        {isWishlist && (
                          <h1
                            onClick={handleDeleteLikedvideo.bind(this, _id)}
                            className='thumbnail__submenu__delete'
                          >
                            <i className='fa-solid fa-trash'></i>
                            Remove the video
                          </h1>
                        )}
                        {isHistory && (
                          <h1
                            onClick={handleDeleteWatchedvideo.bind(this, _id)}
                            className='thumbnail__submenu__delete'
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
        </div>
      )}
    </>
  );
}
