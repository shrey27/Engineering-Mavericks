import './playlist.css';
import { useState, useEffect } from 'react';
import {
  Footer,
  Navbar,
  PlaylistModal,
  Sidebar,
  Loader,
  VideoGrid
} from '../../components';
import { useSinglePlaylistVideos } from '../../helpers';
import { useParams } from 'react-router-dom';
import { usePlaylistCtx } from '../../context';

export default function SinglePlaylistVideos() {
  const {
    state: { playloaderLoader }
  } = usePlaylistCtx();
  const { playlistId } = useParams();
  const videos = useSinglePlaylistVideos(playlistId);

  const [submenuIndex, setSubmenuIndex] = useState(-1);
  const [modalOpen, setModalOpen] = useState(false);
  const [alteredList, setAlteredList] = useState([]);

  useEffect(() => {
    setAlteredList(videos);
  }, [videos]);

  const handleModal = () => {
    setSubmenuIndex(-1);
    setModalOpen(true);
  };

  const handleSubmenu = (idx) => {
    if (idx === submenuIndex) {
      setSubmenuIndex(-1);
    } else {
      setSubmenuIndex(idx);
    }
  };

  const videoGridProps = {
    videos: alteredList,
    showFilters: false,
    handleSubmenu,
    handleModal,
    submenuIndex,
    playlistId,
    isPlaylist: true
  };

  return (
    <div>
      <Navbar />
      {modalOpen && <PlaylistModal setModalOpen={setModalOpen} />}
      <div className='main__grid'>
        <Sidebar noVideos={alteredList ? false : true} />
        <div className='main'>
          {playloaderLoader ? <Loader /> : <VideoGrid {...videoGridProps} />}
        </div>
      </div>
      <Footer />
    </div>
  );
}
