import './videos.css';
import { useLandingCtx } from '../context';
import { Footer, Navbar, VideoGrid } from '../utility';

export default function VideoListing() {
  const { filteredList } = useLandingCtx();

  return (
    <div>
      <Navbar />
      <VideoGrid videos={filteredList} showFilters={true} />
      <Footer fixed={!filteredList?.length} />
    </div>
  );
}
