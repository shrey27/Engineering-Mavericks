import './videos.css';
import { useState } from 'react';
import { useLandingCtx } from '../../context';
import { Footer, Navbar, Modal, Sidebar, VideoGrid } from '../../components';

export default function VideoListing() {
  const {
    state: { filter },
    dispatch,
    filteredList
  } = useLandingCtx();

  const [submenuIndex, setSubmenuIndex] = useState(-1);
  const [modalOpen, setModalOpen] = useState(false);

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

  const handleFilterChange = (e) => {
    dispatch({ type: 'SET_FILTER', payload: e.target.value });
  };

  const videoGridProps = {
    videos: filteredList,
    showFilters: true,
    handleFilterChange,
    handleSubmenu,
    handleModal,
    filter,
    submenuIndex
  };

  return (
    <div>
      <Navbar />
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} />
      <div className='videogrid'>
        <Sidebar />
        <VideoGrid {...videoGridProps} />
      </div>
      <Footer />
    </div>
  );
}
