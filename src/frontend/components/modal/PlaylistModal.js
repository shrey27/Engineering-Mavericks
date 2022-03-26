import './modal.css';
import { useState } from 'react';
import { usePlaylistCtx } from '../../context';

export function PlaylistModal({ modalOpen, setModalOpen }) {
  const [editor, openEditor] = useState(false);
  const [playlistName, setPlaylistName] = useState('');
  const [error, setError] = useState(false);
  const {
    addPlaylistFunction,
    state: { playlists }
  } = usePlaylistCtx();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!playlistName) {
      setError(true);
    }
  };

  const handleCloseModal = () => {
    setError(false);
    setPlaylistName('');
    openEditor(false);
    setModalOpen(false);
  };

  const handleCreatePlaylist = () => {
    const objectToadd = { playlistName };
    addPlaylistFunction(objectToadd);
    handleCloseModal();
  };

  return (
    <div className={`modal ${modalOpen && 'modal__open'} flex-ct-ct`} wide='40'>
      <div
        className='modal__background'
        onClick={() => setModalOpen(false)}
      ></div>
      <div className='modal__content modal__content__playlist md-s'>
        <h1 className='md sb mg-half'>Save To</h1>
        <hr />
        {playlists?.map((elem) => {
          return (
            <label className='playlist__option' key={elem.playlistName}>
              <input type='checkbox' />
              &nbsp;&nbsp; {elem.playlistName}
            </label>
          );
        })}

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
                onClick={handleCreatePlaylist}
              >
                Create Playlist
              </button>
            </form>
          </div>
        )}
      </div>
      <span className='modal__close' onClick={handleCloseModal}>
        <i className='fas fa-times-circle'></i>
      </span>
    </div>
  );
}
