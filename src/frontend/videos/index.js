import './videos.css';
import { useLandingCtx } from '../context';
import { Footer, Navbar, VideoGrid } from '../utility';

export default function VideoListing() {
  const {
    state: { videoList }
  } = useLandingCtx();

  return (
    <div>
      <Navbar />
      <VideoGrid videos={videoList} showFilters={true} />
      <Footer fixed={!videoList.length} />
    </div>
  );
}
