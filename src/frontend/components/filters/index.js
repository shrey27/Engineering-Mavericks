import './filters.css';
import { useRef } from 'react';
import { useLandingCtx } from '../../context';

export function Filters({ handleFilterChange, filter }) {
  const filteRef = useRef();
  const {
    state: { savedFilterList, data }
  } = useLandingCtx();
  return (
    <div className='filter'>
      <div className='filter_ctr' ref={filteRef}>
        {savedFilterList?.map((elem, idx) => {
          return (
            (data.some((item) => item.category === elem || elem === 'All') && (
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
            ))
          );
        })}
      </div>
    </div>
  );
}
