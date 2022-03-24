import './singlevideo.css';
import { useState } from 'react';
import { useSingleVideo } from '../../context';
import { Footer, Navbar, Sidebar, Loader, PlaylistModal } from '../../components';
import { useParams } from 'react-router-dom';

function VideoPlayer({ source, setModalOpen }) {
  return (
    <div className='video__container'>
      <iframe
        src={`${source}`}
        title='YouTube video player'
        frameBorder='0'
        allowFullScreen
        autoPlay='1'
      ></iframe>
      <h1 className='video__title'>Clutch! How Does it Work?</h1>
      <h1 className='video__creator'>The Tech Guy</h1>
      <div className='video__buttons'>
        <button className='video__button'>
          <i className='fa-solid fa-thumbs-up'></i>Like
        </button>
        <button className='video__button'>
          <i className='fa-solid fa-clock'></i>Watch Later
        </button>
        <button className='video__button' onClick={() => setModalOpen(true)}>
          <i className='fa-solid fa-list'></i>Save to Playlist
        </button>
      </div>
    </div>
  );
}

export default function SingleVideo() {
  const [modalOpen, setModalOpen] = useState(false);
  const { videoId } = useParams();
  const singleVideo = useSingleVideo(videoId);
  
  return (
    <div>
      <Navbar />
      <PlaylistModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
      <div className='main__grid'>
        <Sidebar videos={true} />
        <div className='main'>
          {!singleVideo ? (
            <Loader />
          ) : (
            <VideoPlayer
              source={singleVideo?.video}
              setModalOpen={setModalOpen}
            />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
