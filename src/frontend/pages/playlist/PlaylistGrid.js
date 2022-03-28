import './playlist.css';
import { Fragment } from 'react';
import { Empty } from '../../components';
import { usePlaylistCtx } from '../../context';
import { useNavigate } from 'react-router-dom';
import pic from '../../assets/back.webp';
import { PLAYLIST } from '../../routes/routes';
import { emptyStatments } from '../../utility/constants';

export default function PlaylistGrid(props) {
  const { playlists, handleSubmenu, submenuIndex, setModalOpen } = props;
  const { deletePlaylistFunction } = usePlaylistCtx();
  const navigate = useNavigate();

  const handleDeletePlaylist = (id) => {
    deletePlaylistFunction(id);
    handleSubmenu(-1);
  };

  const handlePlaylistVideos = (id) => {
    navigate(`${PLAYLIST}/${id}`);
  };

  return (
    <Fragment>
      <div className='thumbnail__grid__header'>
        <h1 className='thumbnail__grid__title'>
          Current Playlists: ({playlists?.length} Playlists)
        </h1>
        <button className='btn btn--auth sb' onClick={() => setModalOpen(true)}>
          Create a Playlist
        </button>
      </div>
      <Fragment>
        {!playlists?.length ? (
          <Empty statement={emptyStatments('playlist')} />
        ) : (
          <div className='thumbnail__grid'>
            {playlists.map((elem, index) => {
              const { _id, videos, playlistName } = elem;
              return (
                <div className='thumbnail' key={_id}>
                  <div
                    className='playlist__banner'
                    onClick={handlePlaylistVideos.bind(this, _id)}
                  >
                    <img
                      src={
                        `https://i.ytimg.com/vi/${videos[0]?.video}/hqdefault.jpg` ??
                        pic
                      }
                      alt={`thumbnail_${index + 1}`}
                      className='playlist__banner'
                    />
                    <div className='playlist__banner__cover'>
                      <h1>{videos.length}</h1>
                      <i className='fa-solid fa-arrow-down-short-wide'></i>
                    </div>
                  </div>

                  <div className='thumbnail__info'>
                    <div className='thumbnail__title'>
                      <h1>{playlistName}</h1>
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
                          onClick={handleDeletePlaylist.bind(this, _id)}
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
    </Fragment>
  );
}
