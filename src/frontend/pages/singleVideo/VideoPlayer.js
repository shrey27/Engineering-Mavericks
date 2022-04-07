import './singlevideo.css';
import { useState, useEffect } from 'react';
import {
  useLikedCtx,
  useHistoryCtx,
  useWatchCtx,
  usePlaylistCtx
} from '../../context';
import Suggestions from './Suggestions';
import Comments from './Comments';
import ReactPlayer from 'react-player/youtube';

export default function VideoPlayer({ singleVideo, setModalOpen }) {
  const [liked, setLiked] = useState(false);
  const [watchlater, setWatchLater] = useState(false);
  const {
    _id,
    video: source,
    title,
    creator,
    description,
    viewCount
  } = singleVideo;
  const {
    addToLikedlist,
    state: { addedVideosId, likedLoader }
  } = useLikedCtx();
  const {
    state: { addedWatchLaterId },
    addToWatchlist
  } = useWatchCtx();

  const { addToHistorylist } = useHistoryCtx();
  const { dispatch } = usePlaylistCtx();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (addedVideosId && addedVideosId.includes(_id)) setLiked(true);
    else setLiked(false);
  }, [addedVideosId, _id]);

  useEffect(() => {
    if (addedWatchLaterId && addedWatchLaterId.includes(_id))
      setWatchLater(true);
    else setWatchLater(false);
  }, [_id, addedWatchLaterId]);

  const handleAddToLike = () => {
    if (!likedLoader) {
      addToLikedlist({ ...singleVideo });
    }
  };

  const handleAddToWatchLater = () => {
    addToWatchlist(singleVideo);
  };

  const handleAddToHistory = () => {
    addToHistorylist(singleVideo);
  };

  const handleModal = () => {
    setModalOpen(true);
    dispatch({ type: 'ADD_VIDEO_ID', payload: _id });
  };

  return (
    <div className='video__container'>
      <div className='video__iframe'>
        <ReactPlayer
          url={`https://www.youtube.com/embed/${source}`}
          controls
          width='100%'
          height='100%'
          onStart={handleAddToHistory}
        />
      </div>
      <div className='video__control'>
        <h1 className='video__title'>{title}</h1>
        <h1 className='video__creator'>{creator}</h1>
        <p className='video__description'>{description}</p>

        <div className='video__buttons'>
          <button
            className={`video__button ${liked && 'liked'}`}
            onClick={handleAddToLike}
          >
            <i className='fa-solid fa-thumbs-up'></i>
            {liked ? 'Liked' : 'Like'}
          </button>
          <button
            className={`video__button ${watchlater && 'liked'}`}
            onClick={handleAddToWatchLater}
          >
            <i className='fa-solid fa-clock'></i>
            {watchlater ? 'Saved for Later' : 'Watch Later'}
          </button>
          <button className='video__button' onClick={handleModal}>
            <i className='fa-solid fa-list'></i>Save to Playlist
          </button>
        </div>
        <Comments videoId={_id} viewCount={viewCount} />
        <Suggestions />
      </div>
    </div>
  );
}
