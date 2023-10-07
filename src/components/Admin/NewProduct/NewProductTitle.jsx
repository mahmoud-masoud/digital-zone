import { useDispatch } from 'react-redux';
import { newProductFormDataActions } from '../../../store/newProductFormData';

const NewProductTitle = () => {
  const dispatch = useDispatch();

  const enteredTitleHandler = (e) => {
    dispatch(newProductFormDataActions.addTitle(e.target.value));
  };

  return (
    <div className='flex flex-col gap-2'>
      <label htmlFor='title'>Title</label>
      <input
        type='text'
        id='title'
        placeholder='iPhone 14 pro max'
        onChange={enteredTitleHandler}
        className='border border-black rounded-lg p-2'
      />
    </div>
  );
};
export default NewProductTitle;
