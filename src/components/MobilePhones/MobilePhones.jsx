import Wrapper from '../../UI/Wrapper';
import { Link } from 'react-router-dom';
import HomePageCard from '../../UI/HomePageCard';
import useCategory from '../../Hooks/useCategory';
const MobilePhones = () => {
  const { products, loading, error } = useCategory('mobile-phones');

  return (
    <Wrapper>
      <section
        className='bg-white grid gap-6 md:gap-8 gap-y-12 p-4 grid-cols-3
        md:grid-cols-5 lg:grid-cols-6 
      '
      >
        {products?.map((product) => (
          <Link to={product.id} key={product.id}>
            <HomePageCard
              id={product.id}
              img={product.images[0]}
              price={product.price}
              title={product.title}
            />
          </Link>
        ))}
      </section>
    </Wrapper>
  );
};
export default MobilePhones;
