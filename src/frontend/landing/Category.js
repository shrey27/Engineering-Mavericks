import './Category.css';
import { categoryList } from '../utility/constants';

export default function Category() {
  return (
    <div className='category'>
      <h1 className='category__title'>MOST EXPLORED CATEGORIES</h1>
      {categoryList.map((elem, index) => {
        return (
          <div className={`category__card ${index % 2 && 'float--right'}`}>
            <div className='category__header__card'>
              <h1>{elem.categoryName}</h1>
              <h2>{elem.description}</h2>
            </div>
            <img
              src={elem.source}
              alt='categoryImg'
              className='category__banner'
            />
          </div>
        );
      })}
    </div>
  );
}
