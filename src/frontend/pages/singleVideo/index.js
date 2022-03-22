import './singlevideo.css';
import { Fragment } from 'react';

export default function SingleVideo() {
  return (
    <Fragment>
      <div className='video__container'>
        <iframe
          title='single_video'
          width='1200'
          height='600'
          allow='fullscreen'
          allowfullscreen
          src='https://www.youtube.com/embed/tgbNymZ7vqY'
        ></iframe>
      </div>
    </Fragment>
  );
}
