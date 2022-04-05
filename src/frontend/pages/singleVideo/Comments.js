import { useState, useEffect } from 'react';
import { useLandingCtx } from '../../context';
import './singlevideo.css';

export default function Comments({ videoId }) {
  const { updateCommentsOnVideo, getComments } = useLandingCtx();
  const [comment, setComment] = useState('');
  const [commentList, setCommentList] = useState([]);

  useEffect(() => {
    setCommentList(getComments(videoId));
  }, [getComments, videoId]);

  const handleCommentsUpdate = (e) => {
    e.preventDefault();
    updateCommentsOnVideo(videoId, comment);
    setComment('');
  };

  const handleCommentDelete = (videoId, comment) => {
    updateCommentsOnVideo(videoId, comment);
  };

  return (
    <div className='comments'>
      <h1 className='comments__heading'>{commentList.length} comments</h1>
      <form onSubmit={handleCommentsUpdate}>
        <input
          type='text'
          className='comments__input'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </form>
      {commentList?.map((elem, index) => {
        return (
          <div key={index}>
            <span className='comments__statement'>{elem}</span>
            <button
              className='btn btn--round'
              onClick={handleCommentDelete.bind(this, videoId, elem)}
            >
              <i className='fa-solid fa-trash'></i>
            </button>
          </div>
        );
      })}
    </div>
  );
}
