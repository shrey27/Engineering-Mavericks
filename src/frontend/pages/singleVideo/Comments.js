import { useState, useEffect } from 'react';
import { ToastMessage } from '../../components';
import { useLandingCtx } from '../../context';
import './singlevideo.css';

export default function Comments({ videoId, viewCount }) {
  const { updateCommentsOnVideo, getComments } = useLandingCtx();

  const [comment, setComment] = useState('');
  const [commentList, setCommentList] = useState([]);
  const [editComment, setEditComment] = useState({
    editIndex: -1,
    editCommentId: '',
    editCommentStatement: ''
  });

  useEffect(() => {
    setCommentList(getComments(videoId));
  }, [getComments, videoId]);

  const handleCommentsUpdate = (e) => {
    e.preventDefault();
    if (comment.trim().length) {
      updateCommentsOnVideo(videoId, '', comment, false);
      setComment('');
    } else {
      ToastMessage('Cannot send an empty comment', 'warning');
    }
  };

  const handleCommentDelete = (commentId, comment) => {
    updateCommentsOnVideo(videoId, commentId, comment, false);
  };

  const handleEditComment = (index, commentId, comment) => {
    setEditComment({
      editIndex: index,
      editCommentId: commentId,
      editCommentStatement: comment
    });
  };

  const handleEditCommentSubmit = (e) => {
    e.preventDefault();
    if (editComment.editCommentStatement.trim().length) {
      updateCommentsOnVideo(
        videoId,
        editComment.editCommentId,
        editComment.editCommentStatement,
        true
      );
      setEditComment({
        editIndex: -1,
        editCommentId: '',
        editCommentStatement: ''
      });
    } else {
      ToastMessage('Cannot send an empty comment', 'warning');
    }
  };

  return (
    <div className='comments'>
      <h1 className='comments__heading__tag'>
        {viewCount} {viewCount === 1 ? 'View' : 'Views'}
      </h1>
      <h1 className='comments__heading'>{commentList.length} Comments</h1>
      <form onSubmit={handleCommentsUpdate}>
        <input
          type='text'
          className='comments__input'
          placeholder='Add Comment'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          type='submit'
          className='btn btn--auth sb'
          disabled={!comment.trim().length}
        >
          Post
        </button>
      </form>
      <ul className='stack mg-full'>
        {commentList?.map((elem, index) => {
          const { _id: commentId, comment: savedComment } = elem;
          const { editIndex, editCommentStatement } = editComment;
          return index === editIndex ? (
            <form onSubmit={handleEditCommentSubmit} key={commentId}>
              <input
                type='text'
                className='comments__input'
                placeholder='Edit this Comment'
                value={editCommentStatement}
                onChange={(e) =>
                  setEditComment({
                    ...editComment,
                    editCommentStatement: e.target.value
                  })
                }
              />
              <button type='submit' className='btn btn--auth sb'>
                Update
              </button>
              <button
                type='reset'
                onClick={() =>
                  setEditComment({ ...editComment, editIndex: -1 })
                }
                className='btn btn--auth--solid sb'
              >
                Cancel
              </button>
            </form>
          ) : (
            <li
              key={commentId}
              className='stack__item'
              index={`${index % 2 !== 0 && 'odd'}`}
            >
              <span className='comments__statement'>{savedComment}</span>
              <div>
                <button
                  className='btn__trash'
                  onClick={handleEditComment.bind(
                    this,
                    index,
                    commentId,
                    savedComment
                  )}
                >
                  <i className='fa-solid fa-pen'></i>
                </button>
                <button
                  className='btn__trash'
                  onClick={handleCommentDelete.bind(
                    this,
                    commentId,
                    savedComment
                  )}
                >
                  <i className='fa-solid fa-trash'></i>
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
