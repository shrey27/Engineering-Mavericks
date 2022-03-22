import './sidebar.css';

export function Sidebar({ videos }) {
  return (
    <div className={`sidebar ${!videos?.length && 'sidefixed'}`}>
      <div className='sidebar__options selected'>
        <i className='fa-solid fa-video'></i>
        <span className='sidebar__options__span'>Videos</span>
      </div>
      <div className='sidebar__options'>
        <i className='fa-regular fa-circle-play'></i>
        <span className='sidebar__options__span'>Playlists</span>
      </div>
      <div className='sidebar__options'>
        <i className='fa-regular fa-clock'></i>
        <span className='sidebar__options__span'>Watch Later</span>
      </div>
      <div className='sidebar__options'>
        <i className='fa-regular fa-thumbs-up'></i>
        <span className='sidebar__options__span'>Liked Videos</span>
      </div>
      <div className='sidebar__options'>
        <i className='fa-solid fa-clock-rotate-left'></i>
        <span className='sidebar__options__span'>History</span>
      </div>
    </div>
  );
}
