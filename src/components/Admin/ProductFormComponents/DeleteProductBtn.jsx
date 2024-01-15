const DeleteProductBtn = ({ setIsModalOpen }) => {
  return (
    <button
      type='button'
      className='bg-red-600 hover:bg-red-700 transition py-2 px-6 
  text-white rounded-lg font-medium shadow shadow-red-800 
  active:shadow-inner active:shadow-red-800'
      onClick={() => setIsModalOpen(true)}
    >
      Delete product
    </button>
  );
};
export default DeleteProductBtn;
