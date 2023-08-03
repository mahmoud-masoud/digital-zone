import Wrapper from '../../UI/Wrapper';
import { mobilePhones } from '../../data';
import ProductCard from '../../UI/ProductCard';
import { Link } from 'react-router-dom';
const MobilePhones = () => {
  return (
    <Wrapper>
      <section
        className='bg-white grid gap-6 md:gap-8 gap-y-12 p-4 grid-cols-3
        md:grid-cols-5 lg:grid-cols-6 
      '
      >
        {mobilePhones.map((product) => (
          <Link to={product.id} key={product.id}>
            <ProductCard
              img={product.image}
              title={product.title}
              price={product.price}
            />
          </Link>
        ))}
      </section>
    </Wrapper>
  );
};
export default MobilePhones;
