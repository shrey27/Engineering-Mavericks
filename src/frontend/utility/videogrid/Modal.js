import './videogrid.css';

export default function Modal({ modalOpen, setModalOpen }) {
  return (
    <div className={`modal ${modalOpen && 'modal__open'} flex-ct-ct`} wide='40'>
      <div
        className='modal__background'
        onClick={() => setModalOpen(false)}
      ></div>
      <div className='modal__content md-s'></div>
      <span className='modal__close' onClick={() => setModalOpen(false)}>
        <i className='fas fa-times-circle'></i>
      </span>
    </div>
  );
}
