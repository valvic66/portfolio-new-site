import React, { useRef } from 'react';

export const PostSearch = (props) => {
  const monthRef = useRef();
  const yearRef = useRef();

  const handleClick = (event) => {
    event.preventDefault();

    props.onSearch(monthRef.current.value, yearRef.current.value);
  };

  return (
    <>
      <div>PostSearch</div>
      <div>
        <input ref={monthRef} />
      </div>
      <div>
        <input ref={yearRef} />
      </div>
      <button onClick={handleClick}>Submit</button>
    </>
  );
};
