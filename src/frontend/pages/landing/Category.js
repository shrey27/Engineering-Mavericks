import './Category.css';
import { useLandingCtx } from '../../context';
import { Loader } from '../../components/Loader';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function Category() {
  const {
    state: { categoryList }
  } = useLandingCtx();

  return (
    <div className='category'>
      <h1 className='category__title'>Most Viewed Categories</h1>
      {categoryList?.map((elem, index) => {
        return (
          <div
            key={elem._id}
            className={`category__card ${index % 2 && 'float--right'}`}
          >
            <div className='category__header__card'>
              <h1>{elem.categoryName}</h1>
              <h2>{elem.description}</h2>
            </div>
            <LazyLoadImage
              src={`${elem.source}.webp`}
              alt='categoryImg'
              className='category__banner'
            />
          </div>
        );
      }) ?? <Loader />}
    </div>
  );
}
