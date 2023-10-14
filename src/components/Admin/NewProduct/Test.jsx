import { useState } from 'react';

const Test = (props) => {
  const [val, setVal] = useState(props.value || '');
  console.log(val);
  return (
    <div>
      <input
        type='text'
        name={props.name}
        id='test'
        value={val}
        className='border border-black p-2'
        onChange={(e) => {
          setVal(e.target.value);
          props.onChange && props.onChange(e);
        }}
      />
    </div>
  );
};
export default Test;
