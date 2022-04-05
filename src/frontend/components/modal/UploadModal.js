import './modal.css';
import '../../pages/authentication/authentication.css';
import { useState } from 'react';
import { useLandingCtx } from '../../context';

export function UploadModal({ setuploadModal }) {
  const [newVideo, setNewVideo] = useState({
    url: '',
    category: '',
    creator: '',
    title: '',
    description: '',
    videoDate: ''
  });
  const [error, setError] = useState(false);
  const { addNewVideo } = useLandingCtx();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { url, category, creator, title, description, videoDate } = newVideo;
    if (
      !url?.trim().length ||
      !category?.trim().length ||
      !creator?.trim().length ||
      !title?.trim().length ||
      !description?.trim().length ||
      !videoDate.length
    )
      setError(true);
    else {
      addNewVideo(newVideo);
      setError(false);
      setuploadModal(false);
    }
  };

  const handleFormCancel = (e) => {
    e.preventDefault();
    setuploadModal(false);
  };

  return (
    <div className='modal modal__open flex-ct-ct' wide='40'>
      <div
        className='modal__background'
        onClick={() => setuploadModal(false)}
      ></div>
      <div className='modal__content modal__content__signout'>
        <h1 className='primary cen md mg-half'>UPLOAD A VIDEO</h1>
        <hr />
        {error && (
          <h1 className='tag cen md mg-full'>
            Please Fill all the fields correctly
          </h1>
        )}
        <form onSubmit={handleFormSubmit} onReset={handleFormCancel}>
          <div className='authentication__input'>
            <label htmlFor='url' className='label'>
              YouTube Video URL
            </label>
            <input
              className='input sm-s'
              type='text'
              name='url'
              id='url'
              value={newVideo?.url}
              onChange={(e) =>
                setNewVideo({ ...newVideo, url: e.target.value })
              }
              onFocus={() => setError(false)}
            />
          </div>
          <div>
            <label htmlFor='videoTitle' className='label'>
              Title
            </label>
            <input
              className='input sm-s'
              type='text'
              name='videoTitle'
              id='videoTitle'
              value={newVideo?.title}
              onChange={(e) =>
                setNewVideo({ ...newVideo, title: e.target.value })
              }
              onFocus={() => setError(false)}
            />
          </div>
          <div className='authentication__input'>
            <label htmlFor='creator' className='label'>
              Creator Name
            </label>
            <input
              className='input sm-s'
              type='text'
              name='creator'
              id='creator'
              value={newVideo?.creator}
              onChange={(e) =>
                setNewVideo({ ...newVideo, creator: e.target.value })
              }
              onFocus={() => setError(false)}
            />
          </div>
          <div className='authentication__input'>
            <label htmlFor='category' className='label'>
              Category
            </label>
            <input
              className='input sm-s'
              type='text'
              name='category'
              id='category'
              value={newVideo?.category}
              onChange={(e) =>
                setNewVideo({ ...newVideo, category: e.target.value })
              }
              onFocus={() => setError(false)}
            />
          </div>
          <div className='authentication__input'>
            <label htmlFor='videoDate' className='label'>
              Date of Upload
            </label>
            <input
              className='input sm-s'
              type='date'
              name='videoDate'
              id='videoDate'
              value={newVideo?.videoDate}
              onChange={(e) =>
                setNewVideo({ ...newVideo, videoDate: e.target.value })
              }
              onFocus={() => setError(false)}
            />
          </div>
          <div className='authentication__input'>
            <label htmlFor='description' className='label'>
              Description
            </label>
            <textarea
              className='textarea sm-s'
              type='text'
              name='description'
              id='description'
              value={newVideo?.description}
              onChange={(e) =>
                setNewVideo({ ...newVideo, description: e.target.value })
              }
              onFocus={() => setError(false)}
            ></textarea>
          </div>
          <button type='submit' className='btn btn--auth--solid'>
            Upload
          </button>
          <button type='reset' className='btn btn--auth'>
            Cancel
          </button>
        </form>
      </div>
      <span className='modal__close' onClick={() => setuploadModal(false)}>
        <i className='fas fa-times-circle'></i>
      </span>
    </div>
  );
}
