import './singlevideo.css';
import { useSingleVideo } from '../../context';
import { Footer, Navbar, Sidebar, Loader } from '../../components';
import { useParams } from 'react-router-dom';

function VideoPlayer({ source }) {
  return (
    <div className='video__container'>
      <iframe
        src={`${source}`}
        title='YouTube video player'
        frameBorder='0'
        allowFullScreen
        autoplay='1'
      ></iframe>
      <h1 className='video__title'>Clutch! How Does it Work?</h1>
      <h1 className='video__creator'>The Tech Guy</h1>
      <div className='video__buttons'>
        <button className='video__button'>
          <i class='fa-solid fa-thumbs-up'></i>Like
        </button>
        <button className='video__button'>
          <i class='fa-solid fa-clock'></i>Watch Later
        </button>
        <button className='video__button'>
          <i class='fa-solid fa-list'></i>Save to Playlist
        </button>
      </div>
    </div>
  );
}

export default function SingleVideo() {
  const { videoId } = useParams();
  const singleVideo = useSingleVideo(videoId);
  console.log('singleVideo', singleVideo);

  return (
    <div>
      <Navbar />
      <div className='main__grid'>
        <Sidebar videos={true} />
        <div className='main'>
          {!singleVideo ? (
            <Loader />
          ) : (
            <VideoPlayer source={singleVideo?.video} />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
