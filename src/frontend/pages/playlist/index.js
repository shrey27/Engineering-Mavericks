import './playlist.css';
import { useState, useEffect } from 'react';
import { useLikedCtx } from '../../context';
import { Footer, Navbar, Sidebar, Loader } from '../../components';
import PlaylistGrid from './PlaylistGrid';

export default function Playlist() {
  const {
    state: { loading, playlists }
  } = useLikedCtx();

  const [submenuIndex, setSubmenuIndex] = useState(-1);
  const [alteredList, setAlteredList] = useState([
    { _id: 'P1', title: 'Demo' },
    { _id: 'P2', title: 'Demo' },
    { _id: 'P3', title: 'Demo' }
  ]);

  // useEffect(() => {
  //   if (playlists) setAlteredList([...playlists]);
  // }, [playlists]);

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
        <Sidebar noVideos={playlists ? true : false} />
        <div className='main'>
          {loading ? <Loader /> : <PlaylistGrid {...videoGridProps} />}
        </div>
      </div>
      <Footer />
    </div>
  );
}
