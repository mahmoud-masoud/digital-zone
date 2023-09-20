import Wrapper from '../../UI/Wrapper';
import { bestSellers } from '../../tempData.js';
import ProductsCarousel from './ProductsCarousel';
const Gaming = () => {
  return (
    <section className=' text-fontColor '>
      <Wrapper
        className={
          'flex flex-col py-8 md:py-12 px-4 border-b-2 border-gray-100'
        }
      >
        <h1 className='mb-8 text-xl md:text-3xl font-bold'>All Gaming</h1>
        <div className='rounded-lg md:rounded-xl overflow-hidden mb-12'>
          <img src='/images/new/gaming-banner.png' alt='' />
        </div>

        <div className=''>
          <ProductsCarousel data={bestSellers} />
        </div>
      </Wrapper>
    </section>
  );
};
export default Gaming;
