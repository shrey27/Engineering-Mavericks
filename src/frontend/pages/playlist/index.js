import './playlist.css';
import { useState, useEffect } from 'react';
import { usePlaylistCtx } from '../../context';
import { Footer, Navbar, Sidebar, Loader } from '../../components';
import PlaylistGrid from './PlaylistGrid';

export default function Playlist() {
  const {
    state: { playloaderLoader, playlists }
  } = usePlaylistCtx();

  const [submenuIndex, setSubmenuIndex] = useState(-1);
  const [alteredList, setAlteredList] = useState([]);

  useEffect(() => {
    setAlteredList([...playlists]);
  }, [playlists]);

  const handleSubmenu = (idx) => {
    if (idx === submenuIndex) {
      setSubmenuIndex(-1);
    } else {
      setSubmenuIndex(idx);
    }
  };

  const videoGridProps = {
    playlists: alteredList,
    handleSubmenu,
    submenuIndex
  };

  return (
    <div>
      <Navbar />
      <div className='main__grid'>
        <Sidebar noVideos={playlists ? false : true} />
        <div className='main'>
          {playloaderLoader ? <Loader /> : <PlaylistGrid {...videoGridProps} />}
        </div>
      </div>
      <Footer />
    </div>
  );
}
