import './singlevideo.css';
import { useState, lazy, Suspense, useEffect } from 'react';
import { useSingleVideo } from '../../helpers';
import { Footer, Navbar, Loader, PlaylistModal } from '../../components';
import { useParams, useNavigate } from 'react-router-dom';
import { VIDEOS } from '../../routes/routes';

const VideoPlayer = lazy(() => import('./VideoPlayer.js'));

export default function SingleVideo() {
  const [modalOpen, setModalOpen] = useState(false);
  const { videoId } = useParams();
  const singleVideo = useSingleVideo(videoId);
  const navigate = useNavigate();

  useEffect(() => {
    if (!singleVideo) {
      navigate(VIDEOS);
    }
  }, [navigate, singleVideo]);

  return (
    <div>
      <Navbar />
      {modalOpen && <PlaylistModal setModalOpen={setModalOpen} />}
      <div>
        <div className='main'>
          <Suspense fallback={<Loader />}>
            <VideoPlayer
              singleVideo={singleVideo}
              setModalOpen={setModalOpen}
            />
          </Suspense>
        </div>
      </div>
      <Footer />
    </div>
  );
}
