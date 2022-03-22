import './videogrid.css';
import { useState } from 'react';

export default function Modal({ modalOpen, setModalOpen }) {
  const [editor, openEditor] = useState(false);
  const [playlistName, setPlaylistName] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!playlistName) {
      setError(true);
    }
  };

  return (
    <div className={`modal ${modalOpen && 'modal__open'} flex-ct-ct`} wide='40'>
      <div
        className='modal__background'
        onClick={() => setModalOpen(false)}
      ></div>
      <div className='modal__content md-s'>
        <h1 className='md sb mg-half'>Save To</h1>
        <hr />
        <label className='playlist__option'>
          <input type='checkbox' />
          &nbsp;&nbsp; Lorem Ipsum 1
        </label>
        <label className='playlist__option'>
          <input type='checkbox' />
          &nbsp;&nbsp; Lorem Ipsum 2
        </label>
        <label className='playlist__option'>
          <input type='checkbox' />
          &nbsp;&nbsp; Lorem Ipsum 3
        </label>
        <hr />
        {!editor ? (
          <h1 className='md sb mg-half' onClick={() => openEditor(true)}>
            <i className='fa-solid fa-arrow-down-short-wide'></i>
            &nbsp;&nbsp;Create Playlist
          </h1>
        ) : (
          <div>
            <form onSubmit={handleSubmit} className='mg--half'>
              <input
                type='text'
                autoComplete='off'
                placeholder='Enter Playlist Name'
                className='playlist__input'
                value={playlistName}
                onChange={(e) => setPlaylistName(e.target.value)}
                onBlur={() => setError(false)}
              />
              {error && (
                <h1 className='playlist__error'>
                  Playlist name cannot be blank
                </h1>
              )}

              <button
                type='submit'
                className='btn btn--auth--solid btn--wide mg--full'
              >
                Create Playlist
              </button>
            </form>
          </div>
        )}
      </div>
      <span className='modal__close' onClick={() => setModalOpen(false)}>
        <i className='fas fa-times-circle'></i>
      </span>
    </div>
  );
}
