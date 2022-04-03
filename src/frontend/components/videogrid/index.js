import './videogrid.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { VIDEOS } from '../../routes/routes';
import {
  useAuthCtx,
  useHistoryCtx,
  useLikedCtx,
  usePlaylistCtx,
  useWatchCtx
} from '../../context';
import { Empty } from '../../components';
import { emptyStatments } from '../../utility/constants';
import { ToastMessage } from '../toast';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export function VideoGrid(props) {
  const {
    videos,
    isWishlist,
    isHistory,
    isWatchlater,
    isPlaylist,
    playlistId,
    handleSubmenu,
    handleModal,
    submenuIndex
  } = props;

  const { token } = useAuthCtx();
  const { deleteLikedFromList } = useLikedCtx();
  const { deleteFromHistoryList, clearHistoryList } = useHistoryCtx();
  const { clearWatchLaterList, deleteFromWatchLaterList, addToWatchlist } =
    useWatchCtx();
  const { dispatch, deleteVideoFromPlaylistsFunction } = usePlaylistCtx();
  const [statement, setStatement] = useState(false);

  const handleAddToWatchLater = (video) => {
    if (!token) {
      ToastMessage('Please Sign In to explore the entire webpage', 'warning');
    } else {
      addToWatchlist(video);
    }
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
    if (!token) {
      ToastMessage('Please Sign In to explore the entire webpage', 'warning');
    } else {
      handleModal();
      dispatch({ type: 'ADD_VIDEO_ID', payload: id });
    }
    handleSubmenu(-1);
  };

  const handleVideoDeleteFromPlaylist = (id) => {
    deleteVideoFromPlaylistsFunction(playlistId, id);
    dispatch({ type: 'REMOVE_PLAYLIST_ID', payload: playlistId });
    handleSubmenu(-1);
  };

  useEffect(() => {
    if (isHistory) setStatement(emptyStatments('history'));
    if (isPlaylist) setStatement(emptyStatments('playlistvideos'));
    if (isWishlist) setStatement(emptyStatments('like'));
    if (isWatchlater) setStatement(emptyStatments('watchlater'));
  }, [isHistory, isPlaylist, isWatchlater, isWishlist]);

  return (
    <>
      {!videos?.length ? (
        <Empty statement={statement} />
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
                    <LazyLoadImage
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
                        {!isHistory && (
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
                            {isWatchlater ? (
                              <i className='fa-solid fa-trash'></i>
                            ) : (
                              <i className='fa-regular fa-clock'></i>
                            )}
                            {isWatchlater ? 'Remove the Video' : 'Watch Later'}
                          </h1>
                        )}
                        {
                          <h1
                            onClick={
                              isPlaylist
                                ? handleVideoDeleteFromPlaylist.bind(this, _id)
                                : handleModalFunction.bind(this, _id)
                            }
                          >
                            {!isPlaylist ? (
                              <i className='fa-regular fa-circle-play'></i>
                            ) : (
                              <i className='fa-solid fa-trash'></i>
                            )}
                            {isPlaylist
                              ? 'Remove from Playlist'
                              : 'Add to Playlist'}
                          </h1>
                        }
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
