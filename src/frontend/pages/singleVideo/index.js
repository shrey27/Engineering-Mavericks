import './singlevideo.css';
import { useState, lazy, Suspense } from 'react';
import { useSingleVideo } from '../../helpers';
import { Footer, Navbar, Loader, PlaylistModal } from '../../components';
import { useParams } from 'react-router-dom';
const VideoPlayer = lazy(() => import('./VideoPlayer.js'));

export default function SingleVideo() {
  const [modalOpen, setModalOpen] = useState(false);
  const { videoId } = useParams();
  const singleVideo = useSingleVideo(videoId);

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
