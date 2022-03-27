import './Empty.css';
import { Link } from 'react-router-dom';
import { VIDEOS } from '../../routes/routes';
import pic from '../../assets/empty.webp';

export function Empty() {
  return (
    <div className='empty'>
      <img src={pic} className='empty__image' alt='empty' />
      <h1 className='empty__title'>This folder is empty!</h1>
      <Link to={VIDEOS} className='btn btn--auth--solid sb'>
        Start Learning
      </Link>
    </div>
  );
}
