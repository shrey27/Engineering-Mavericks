import './filters.css';
import { categoryList } from '../../utility/constants';
import { useRef } from 'react';

export function Filters({ handleFilterChange, filter }) {
  const filteRef = useRef();
  return (
    <div className='filter'>
      <div className='filter_ctr' ref={filteRef}>
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
