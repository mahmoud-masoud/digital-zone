import { Link } from 'react-router-dom';
import Wrapper from '../../UI/Wrapper';
import Product from '../../components/Admin/Products/Product';
import ProductsList from '../../components/Admin/Products/ProductsList';

const Products = () => {
  return (
    <div className='py-6 px-4'>
      <Wrapper>
        <div className='flex justify-between'>
          <h1 className='text-xl font-bold text-fontColor'>Products</h1>
          <Link to={'new'}>
            <div
              className='py-2 px-4 bg-gray-600 text-sm font-medium text-white
          hover:bg-gray-700 transition
           rounded-lg'
            >
              <span>Add Product</span>
            </div>
          </Link>
        </div>
        <ProductsList />
      </Wrapper>
    </div>
  );
};
export default Products;
