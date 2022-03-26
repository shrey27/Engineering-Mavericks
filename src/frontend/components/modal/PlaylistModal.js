import './modal.css';
import { useState } from 'react';
import { usePlaylistCtx } from '../../context';

export function PlaylistModal({ modalOpen, setModalOpen }) {
  const [editor, openEditor] = useState(false);
  const [playlistName, setPlaylistName] = useState('');
  const [error, setError] = useState(false);
  const {
    addPlaylistFunction,
    addVideoToPlaylistsFunction,
    state: { playlists, playlistId },
    dispatch
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
    dispatch({ type: 'REMOVE_VIDEO_ID' });
  };

  const handleCreatePlaylist = () => {
    addPlaylistFunction({ playlistName });
    handleCloseModal();
  };

  const handleVideoInPlaylist = (id) => {
    if (id) {
      dispatch({ type: 'ADD_PLAYLIST_ID', payload: id });
      addVideoToPlaylistsFunction(id);
    } else {
      dispatch({ type: 'REMOVE_PLAYLIST_ID' });    }
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
          const { _id, playlistName } = elem;
          return (
            <label className='playlist__option' key={_id}>
              <input
                type='checkbox'
                checked={playlistId === _id}
                onChange={(e) =>
                  handleVideoInPlaylist(e.target.checked ? _id : '')
                }
              />
              &nbsp;&nbsp; {playlistName}
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
