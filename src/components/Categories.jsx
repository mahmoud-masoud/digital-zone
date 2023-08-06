import { Link } from 'react-router-dom';
import Category from './Category';

const Categories = () => {
  return (
    <section className='container mx-auto flex justify-around pt-10 pb-16 gap-4'>
      <Link to={'laptops'}>
        <Category img={'/images/Categories/laptop.png'} title={'Laptops'} />
      </Link>

      <Link to={'headphones'}>
        <Category
          img={'/images/Categories/headphone.jpg'}
          title={'Headphones'}
        />
      </Link>

      <Link to={'mobile-phones'}>
        <Category
          img={'/images/Categories/pixel.jpg'}
          title={'Mobile Phones'}
        />
      </Link>

      <Link to={'smart-watches'}>
        <Category
          img={'/images/Categories/smart-watch.png'}
          title={'Smart Watches'}
        />
      </Link>
    </section>
  );
};
export default Categories;
