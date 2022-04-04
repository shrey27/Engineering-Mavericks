import './videos.css';
import { useState, useEffect } from 'react';
import { useLandingCtx, useAuthCtx } from '../../context';
import {
  Footer,
  Navbar,
  PlaylistModal,
  Sidebar,
  Loader,
  VideoGrid,
  Filters
} from '../../components';
import { useNavigate } from 'react-router-dom';
import { SIGNIN } from '../../routes/routes';

export default function VideoListing() {
  const {
    state: { filter },
    dispatch,
    filteredList
  } = useLandingCtx();
  const { token } = useAuthCtx();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(window.location.search);
  const search = queryParams.get('query');

  const [sort, setSort] = useState(false);
  const [submenuIndex, setSubmenuIndex] = useState(-1);
  const [modalOpen, setModalOpen] = useState(false);
  const [alteredList, setAlteredList] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let tempList = [...filteredList];
    if (search) {
      tempList = tempList.filter((e) =>
        e.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (sort) {
      tempList = tempList.sort((a, b) => b.videoDate - a.videoDate);
    }
    setAlteredList([...tempList]);
  }, [search, filteredList, sort]);

  const handleModal = () => {
    if (token) {
      setSubmenuIndex(-1);
      setModalOpen(true);
    } else {
      navigate(SIGNIN);
    }
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
      {modalOpen && <PlaylistModal setModalOpen={setModalOpen} />}
      <div className='main__grid'>
        <Sidebar noVideos={filteredList ? false : true} />
        <div className='main'>
          <div className='flex-ct-st xs-s'>
            <button onClick={() => setSort(true)} className='btn btn--auth'>
              Show latest videos <i className='fa-solid fa-sort'></i>
            </button>
          </div>
          <Filters handleFilterChange={handleFilterChange} filter={filter} />
          {/* {loading ? <Loader /> : <VideoGrid {...videoGridProps} />} */}
          <VideoGrid {...videoGridProps} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
