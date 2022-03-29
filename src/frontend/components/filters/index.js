import './filters.css';
import { categoryList } from '../../utility/constants';
import { useRef } from 'react';

export function Filters({ handleFilterChange, filter }) {
  const filteRef = useRef();

  // useEffect(() => {
  //   if (filteRef.scrollX === 0) {
  //     setLeftBtnHide(true);
  //   }
  //   if (filteRef.scrollX === 1000) {
  //     setRightBtnHide(true);
  //   }
  // }, []);

  const scrollLeftHandler = () => {
    filteRef.current.scrollLeft -= 60;
  };
  const scrollRightHandler = () => {
    filteRef.current.scrollLeft += 60;
  };

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
      <div className='filter_btn_ctr '>
        <button className='btn filter_btn shadow' onClick={scrollLeftHandler}>
          <i class='fa-solid fa-chevron-left'></i>
        </button>
        <button className='btn filter_btn shadow' onClick={scrollRightHandler}>
          <i class='fa-solid fa-chevron-right'></i>
        </button>
      </div>
    </div>
  );
}
