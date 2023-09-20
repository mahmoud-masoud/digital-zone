import { Link } from 'react-router-dom';
import Category from './Category';
import Wrapper from '../../UI/Wrapper';
const Categories = () => {
  return (
    <section className='px-4 pt-8 md:pt-12'>
      <Wrapper
        className={
          'grid grid-cols-2 md:grid-cols-4 gap-4 justify-center items-center '
        }
      >
        <Link to={'ct/laptops'}>
          <Category img={'/images/Categories/laptop.png'} title={'Laptops'} />
        </Link>

        <Link to={'ct/headphones'}>
          <Category
            img={'/images/Categories/headphone.jpg'}
            title={'Headphones'}
          />
        </Link>

        <Link to={'ct/mobile-phones'}>
          <Category
            img={'/images/Categories/phone.jpg'}
            title={'Mobile Phones'}
          />
        </Link>

        <Link to={'ct/smart-watches'}>
          <Category
            img={'/images/Categories/smart-watch.png'}
            title={'Smart Watches'}
          />
        </Link>
      </Wrapper>
    </section>
  );
};
export default Categories;
