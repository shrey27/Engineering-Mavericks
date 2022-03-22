import './filters.css';
import { categoryList } from '../../utility/constants';

export function Filters({ handleFilterChange, filter }) {
  return (
    <div className='filter'>
      <div className='mg--half'>
        {categoryList.map((elem, idx) => {
          return (
            <label
              key={idx}
              className={`filter__option ${elem === filter && 'chosen'}`}
              htmlFor={elem}
            >
              <input
                type='radio'
                className='filter__option__input'
                id={elem}
                name='filter'
                value={elem}
                onChange={handleFilterChange}
              />
              {elem}
            </label>
          );
        })}
      </div>
    </div>
  );
}
