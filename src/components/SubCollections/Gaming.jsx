import Wrapper from '../../UI/Wrapper';
import { bestSellers } from '../../tempData.js';
import ProductsCarousel from './ProductsCarousel';
const Gaming = () => {
  return (
    <section className=' text-fontColor px-4 my-4 md:my-8 '>
      <Wrapper className={'pb-8 bb-2 flex flex-col '}>
        <h1 className='text-xl md:text-3xl font-bold mb-4 md:mb-8'>
          All Gaming
        </h1>
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
