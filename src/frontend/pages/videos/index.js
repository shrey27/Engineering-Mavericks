import './videos.css';
import { useState, useEffect, useRef } from 'react';
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
    state: { loading, more, data, filter, newVideo },
    dispatch,
    load,
    filterList
  } = useLandingCtx();
  const { token } = useAuthCtx();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(window.location.search);
  const search = queryParams.get('query');

  const [sort, setSort] = useState(false);
  const [submenuIndex, setSubmenuIndex] = useState(-1);
  const [modalOpen, setModalOpen] = useState(false);
  const [alteredList, setAlteredList] = useState([]);

  /***************Infinite Scrolling******************/

  const loader = useRef(load);
  const observer = useRef(
    new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          loader.current();
        }
      },
      { threshold: 1 }
    )
  );
  const [element, setElement] = useState(null);

  useEffect(() => {
    loader.current = load;
  }, [load]);

  useEffect(() => {
    const currentElement = element;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [element]);

  /******************************************************/

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let tempList = [...data];
    if (filter) {
      tempList = filterList(tempList);
    }
    if (search) {
      tempList = tempList.filter((e) =>
        e.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (sort) {
      tempList = tempList.sort((a, b) => b.videoDate - a.videoDate);
    }
    setAlteredList([...tempList]);
  }, [search, data, sort, filter, filterList, newVideo]);

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
        <Sidebar noVideos={alteredList ? false : true} />
        <div className='main'>
          <div className='flex-ct-st xs-s'>
            <button onClick={() => setSort(true)} className='btn btn--auth sb'>
              Show latest videos <i className='fa-solid fa-sort'></i>
            </button>
          </div>
          <Filters handleFilterChange={handleFilterChange} filter={filter} />
          <VideoGrid {...videoGridProps} />
          {loading && <Loader />}
          {!loading && more && (
            <div ref={setElement} style={{ background: 'transparent' }}></div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
