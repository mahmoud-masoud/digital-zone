import { FaReact, FaArrowRotateLeft } from 'react-icons/fa6';
import HeartIcon from '../../../UI/HeartIcon';
import { FaShippingFast } from 'react-icons/fa';
import AddToCartBtn from './AddToCartBtn';
import ProductColors from './ProductColors';

import AddToFavoritesBtn from '../../../UI/AddToFavoritesBtn';
import { useParams } from 'react-router-dom';

const ProductInfo = ({ title, price, id, image, quantity }) => {
  const productID = useParams().productId;

  return (
    <div
      className='bg-white mb-4 w-full md:w-auto self-start xl:w-[30%] md:rounded-lg 
    md:shadow-card-shadow md:p-4 md:sticky top-24'
    >
      <div className='mb-6'>
        <AddToFavoritesBtn
          id={productID}
          price={price}
          title={title}
          image={image}
          fetchedQuantity={quantity}
        />
      </div>
      <h2 className='font-bold text-lg'>{title}</h2>
      <div
        className='flex justify-between items-center fixed bottom-0 right-0
       bg-white shadow-card-shadow w-full p-4 md:static md:block md:shadow-[0] md:p-0 md:bb-2 md:py-4 '
      >
        <span className='font-bold text-xl mb-2 block'>{`$${price}`}</span>
        <AddToCartBtn title={title} price={price} id={id} image={image} />
      </div>
      <ProductColors />

      <div className='flex flex-col gap-4 pb-4'>
        <div className='shipping flex items-center gap-3 text-gray-700 '>
          <FaShippingFast />
          <p className='text-sm'>
            Free shipping arrives by
            <span className='font-semibold'> Tomorrow</span>
          </p>
        </div>

        <div className='Sold flex items-center gap-3 text-gray-700 '>
          <FaReact />
          <p className='text-sm'>Sold and shipped by React.com</p>
        </div>

        <div className='returning flex items-center gap-3 text-gray-700 '>
          <FaArrowRotateLeft className='bg-primary w-5 h-5 p-1 rounded-full text-white' />
          <p className='text-sm'>Free 14-day returns</p>
        </div>
      </div>
    </div>
  );
};
export default ProductInfo;
