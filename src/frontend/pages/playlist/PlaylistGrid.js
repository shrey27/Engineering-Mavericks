import './playlist.css';
import { Empty } from '../../components';
import { Fragment } from 'react/cjs/react.production.min';
import { usePlaylistCtx } from '../../context';

export default function PlaylistGrid(props) {
  const { playlists, handleSubmenu, submenuIndex } = props;
  const { deletePlaylistFunction } = usePlaylistCtx();

  const handleDeletePlaylist = (id) => {
    deletePlaylistFunction(id);
    handleSubmenu(-1);
  };

  return (
    <Fragment>
      {!playlists?.length ? (
        <Empty />
      ) : (
        <div className='thumbnail__grid'>
          {playlists.map((elem, index) => {
            return (
              <div className='thumbnail' key={elem._id}>
                <div className='playlist__banner'>
                  <img
                    src='back.jpg'
                    alt={`thumbnail_${index + 1}`}
                    className='playlist__banner'
                  />
                  <div className='playlist__banner__cover'>
                    <h1>1</h1>
                    <i className='fa-solid fa-arrow-down-short-wide'></i>
                  </div>
                </div>

                <div className='thumbnail__info'>
                  <div className='thumbnail__title'>
                    <h1>{elem.playlistName}</h1>
                  </div>
                  <div className='thumbnail__info__icon'>
                    <i
                      className='fa-solid fa-ellipsis-vertical'
                      onClick={handleSubmenu.bind(this, index)}
                    ></i>
                  </div>
                  {index === submenuIndex && (
                    <div className='thumbnail__submenu playlist'>
                      <h1
                        className='thumbnail__submenu__delete'
                        onClick={handleDeletePlaylist.bind(this, elem._id)}
                      >
                        <i className='fa-solid fa-trash'></i>
                        Delete this Playlist
                      </h1>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Fragment>
  );
}
