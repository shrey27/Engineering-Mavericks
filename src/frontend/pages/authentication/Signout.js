import { Navbar, Footer } from '../../components';
import { LANDING } from '../../routes/routes';
import { Link } from 'react-router-dom';

export default function Signout() {
  return (
    <div>
      <Navbar />
      <div className='flex-ct-ct'>
        <Link className='btn  btn--auth--solid sb' to={LANDING}>
          Go To HomePage
        </Link>
      </div>
      <Footer fixed={true} />
    </div>
  );
}
