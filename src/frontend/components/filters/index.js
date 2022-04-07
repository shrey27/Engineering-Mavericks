import './filters.css';
import { useRef, useState } from 'react';
import { useLandingCtx } from '../../context';
const scrollingOffset = 250;

export function Filters({ handleFilterChange, filter }) {
  const filterRef = useRef(null);
  const [scrollValue, setScrollValue] = useState(0);

  const scrollRight = () => {
    filterRef.current.scrollLeft += scrollingOffset;
    setScrollValue((e) => e + scrollingOffset);
  };

  const scrollLeft = () => {
    filterRef.current.scrollLeft -= scrollingOffset;
    setScrollValue((e) => e - scrollingOffset);
  };

  const {
    state: { savedFilterList, data }
  } = useLandingCtx();

  return (
    <div className='filter'>
      <button
        className={`filter_btn ${scrollValue > 0 && 'btn_left'}`}
        onClick={scrollLeft}
      >
        <i className='fa-solid fa-chevron-left'></i>
      </button>
      <div className='filter_ctr' ref={filterRef}>
        {savedFilterList?.map((elem, idx) => {
          return (
            data.some((item) => item.category === elem || elem === 'All') && (
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
            )
          );
        })}
      </div>
      <button
        className={`filter_btn ${
          scrollValue < filter.length * scrollingOffset && 'btn_right'
        }`}
        onClick={scrollRight}
      >
        <i className='fa-solid fa-chevron-right'></i>
      </button>
    </div>
  );
}
