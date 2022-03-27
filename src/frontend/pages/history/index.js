import './history.css';
import { useState, useEffect } from 'react';
import { useHistoryCtx } from '../../context';
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
    state: { historyLoader, watchedVideos }
  } = useHistoryCtx();

  const [submenuIndex, setSubmenuIndex] = useState(-1);
  const [modalOpen, setModalOpen] = useState(false);
  const [alteredList, setAlteredList] = useState([]);

  useEffect(() => {
    setAlteredList(watchedVideos);
  }, [watchedVideos]);

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
    isHistory: true
  };

  return (
    <div>
      <Navbar />
      {modalOpen && <PlaylistModal setModalOpen={setModalOpen} />}
      <div className='main__grid'>
        <Sidebar noVideos={watchedVideos ? false : true} />
        <div className='main'>
          {historyLoader ? <Loader /> : <VideoGrid {...videoGridProps} />}
        </div>
      </div>
      <Footer />
    </div>
  );
}
