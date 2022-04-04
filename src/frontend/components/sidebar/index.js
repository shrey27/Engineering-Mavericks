import { useState, Fragment } from 'react';
import './sidebar.css';
import { NavLink } from 'react-router-dom';
import { navlinks } from '../../utility/constants';
import { UploadModal } from '../../components/modal/UploadModal';
import { useAuthCtx } from '../../context';
import { ToastMessage } from '../toast';

const backgroundStyle = ({ isActive }) => {
  return isActive ? `sidebar__options selected` : `sidebar__options`;
};

export function Sidebar({ noVideos }) {
  const [uploadModal, setuploadModal] = useState(false);
  const { token } = useAuthCtx();

  const handleUploadModal = () => {
    if (token) {
      setuploadModal(true);
    } else {
      ToastMessage('You need to sign in first', 'warning');
    }
  };
  return (
    <Fragment>
      {uploadModal && <UploadModal setuploadModal={setuploadModal} />}
      <div className={`sidebar ${noVideos && 'sidefixed'}`}>
        {navlinks.map((elem) => {
          return (
            <NavLink to={elem?.path} key={elem.id} className={backgroundStyle}>
              <i className={elem.class}></i>
              <span className='sidebar__options__span'>{elem.name}</span>
            </NavLink>
          );
        })}
        <span className='sidebar__options' onClick={handleUploadModal}>
          <i className='fa-solid fa-upload'></i>
          <span className='sidebar__options__span'>Upload a Video</span>
        </span>
      </div>
    </Fragment>
  );
}
