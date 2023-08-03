import Wrapper from '../../UI/Wrapper';
import { laptops } from '../../data';
import ProductCard from '../../UI/ProductCard';
import { Link } from 'react-router-dom';
const Laptops = () => {
  return (
    <Wrapper>
      <section
        className='bg-white grid gap-4 p-4 grid-cols-3 md:grid-cols-5 lg:grid-cols-6
      '
      >
        {laptops.map((product) => (
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
export default Laptops;
