import './singlevideo.css';
import '../../components/videogrid/videogrid.css';
import { suggestedVideos } from '../../utility/constants';
import { Link } from 'react-router-dom';
import { VIDEOS } from '../../routes/routes';

function SuggestionCard({ _id, video, title, creator, index }) {
  return (
    <div className='thumbnail'>
      <Link to={`${VIDEOS}/${_id}`}>
        <img
          src={`https://i.ytimg.com/vi/${video}/hqdefault.jpg`}
          alt={`thumbnail_${index + 1}`}
          className='thumbnail__banner'
        />
      </Link>
      <div className='thumbnail__info'>
        <div className='thumbnail__title'>
          <h1>{title}</h1>
          <h1 className='thumbnail__description'>{creator}</h1>
        </div>
      </div>
    </div>
  );
}

export default function Suggestions() {
  return (
    <div className='thumbnail__grid'>
      {suggestedVideos.map((elem) => {
        return <SuggestionCard {...elem} key={elem._id} />;
      })}
    </div>
  );
}
