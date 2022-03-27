import pic from '../assets/loader.gif';
export function Loader() {
  return (
    <div className='flex-ct-ct mg--full'>
      <img src={pic} alt='loader' className='mg--full' />
    </div>
  );
}
