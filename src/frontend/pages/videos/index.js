import './videos.css';
import { useState, useEffect } from 'react';
import { useLandingCtx } from '../../context';
import {
  Footer,
  Navbar,
  Modal,
  Sidebar,
  Loader,
  VideoGrid,
  Filters
} from '../../components';

export default function VideoListing() {
  const {
    state: { filter },
    dispatch,
    filteredList
  } = useLandingCtx();

  const queryParams = new URLSearchParams(window.location.search);
  const search = queryParams.get('query');

  const [submenuIndex, setSubmenuIndex] = useState(-1);
  const [modalOpen, setModalOpen] = useState(false);
  const [alteredList, setAlteredList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (search) {
      const tempList = filteredList.filter((e) =>
        e.title.toLowerCase().includes(search.toLowerCase())
      );
      setAlteredList([...tempList]);
    } else {
      setAlteredList([...filteredList]);
    }
    setLoading(false);
  }, [search, filteredList]);

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
    videos: alteredList,
    showFilters: true,
    handleSubmenu,
    handleModal,
    submenuIndex
  };

  return (
    <div>
      <Navbar />
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} />
      <div className='main__grid'>
        <Sidebar noVideos={filteredList ? false : true} />
        <div className='main'>
          <Filters handleFilterChange={handleFilterChange} filter={filter} />
          {loading ? <Loader /> : <VideoGrid {...videoGridProps} />}
        </div>
      </div>
      <Footer />
    </div>
  );
}
