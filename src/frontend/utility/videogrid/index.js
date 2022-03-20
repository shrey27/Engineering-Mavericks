import './videogrid.css';
import { videoList, categoryList } from '../constants';

export function VideoGrid() {
  return (
    <div className='videogrid'>
      <div className='sidebar'>
        <div className='sidebar__options selected'>
          <i class='fa-solid fa-video'></i>
          <span>Videos</span>
        </div>
        <div className='sidebar__options'>
          <i class='fa-regular fa-circle-play'></i>
          <span>Playlists</span>
        </div>
        <div className='sidebar__options'>
          <i class='fa-regular fa-clock'></i>
          <span>Watch Later</span>
        </div>
        <div className='sidebar__options'>
          <i class='fa-regular fa-thumbs-up'></i>
          <span>Liked Videos</span>
        </div>
        <div className='sidebar__options'>
          <i class='fa-solid fa-clock-rotate-left'></i>
          <span>History</span>
        </div>
      </div>
      <div className='main'>
        <div className='filter'>
          {categoryList.map((elem, index) => {
            return (
              <span
                key={elem + index}
                className={`filter__option ${index === 0 && 'chosen'}`}
              >
                {elem}
              </span>
            );
          })}
        </div>
        <div className='main__grid'>
          {videoList.map((elem, index) => {
            return (
              <div className='thumbnail'>
                <img
                  key={elem + index}
                  src={elem}
                  alt={`thumbnail_${index + 1}`}
                  className='thumbnail__banner'
                />
                <div>
                  <h1>
                    Lorem Ipsum Lorem Ipsum Lorem Ipsum{' '}
                    <i class='fa-solid fa-ellipsis-vertical'></i>
                  </h1>
                </div>

                <h1>Lorem Ipsum Lorem Ipsum Lorem Ipsum</h1>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
