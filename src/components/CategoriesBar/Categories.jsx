import { Link } from 'react-router-dom';
import Category from './Category';

const Categories = () => {
  return (
    <section className='container mx-auto flex justify-around py-4 mt-10 mb-14 gap-4 bg-light rounded-3xl'>
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
    </section>
  );
};
export default Categories;
