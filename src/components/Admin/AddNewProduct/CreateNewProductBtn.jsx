import LoadingSpinner from '../../../UI/LoadingSpinner';

const CreateNewProductBtn = ({ isError, isSubmitting, isSuccess }) => {
  return (
    <div className='flex mt-6'>
      <button
        type='submit'
        className='bg-primary py-2 px-6 text-white rounded-md ml-auto'
      >
        <div className='flex gap-4 font-semibold'>
          <span>Save</span> {isSubmitting && <LoadingSpinner />}
        </div>
      </button>
    </div>
  );
};
export default CreateNewProductBtn;
