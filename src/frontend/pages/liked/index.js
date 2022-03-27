import './liked.css';
import { useState, useEffect } from 'react';
import { useLikedCtx } from '../../context';
import {
  Footer,
  Navbar,
  PlaylistModal,
  Sidebar,
  Loader,
  VideoGrid
} from '../../components';

export default function Liked() {
  const { state } = useLikedCtx();
  const { likedList, likedLoader } = state;

  const [submenuIndex, setSubmenuIndex] = useState(-1);
  const [modalOpen, setModalOpen] = useState(false);
  const [alteredList, setAlteredList] = useState([]);

  useEffect(() => {
    setAlteredList([...likedList]);
  }, [likedList]);

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
    isWishlist: true
  };

  return (
    <div>
      <Navbar />
      {modalOpen && <PlaylistModal setModalOpen={setModalOpen} />}
      <div className='main__grid'>
        <Sidebar noVideos={likedList ? false : true} />
        <div className='main'>
          {likedLoader ? <Loader /> : <VideoGrid {...videoGridProps} />}
        </div>
      </div>
      <Footer />
    </div>
  );
}
