import './watchlater.css';
import { useState, useEffect } from 'react';
import { useWatchCtx } from '../../context';
import {
  Footer,
  Navbar,
  PlaylistModal,
  Sidebar,
  Loader,
  VideoGrid
} from '../../components';

export default function History() {
  const {
    state: { watchloader, watchedLaterVideos }
  } = useWatchCtx();

  const [submenuIndex, setSubmenuIndex] = useState(-1);
  const [modalOpen, setModalOpen] = useState(false);
  const [alteredList, setAlteredList] = useState([]);

  useEffect(() => {
    setAlteredList(watchedLaterVideos);
  }, [watchedLaterVideos]);

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
    isWatchlater: true
  };

  return (
    <div>
      <Navbar />
      {modalOpen && <PlaylistModal setModalOpen={setModalOpen} />}
      <div className='main__grid'>
        <Sidebar noVideos={watchedLaterVideos ? false : true} />
        <div className='main'>
          {watchloader ? <Loader /> : <VideoGrid {...videoGridProps} />}
        </div>
      </div>
      <Footer />
    </div>
  );
}
