import Wrapper from '../../UI/Wrapper';
import { laptops } from '../../data';
import ProductCard from '../../UI/ProductCard';
import { Link } from 'react-router-dom';
import HomePageCard from '../../UI/HomePageCard';
import { useEffect, useState } from 'react';
import { getProductsByCategory } from '../../Utils/firebase-functions';
const Laptops = () => {
  const [products, setProducts] = useState(null);
  useEffect(() => {
    const getProducts = async () => {
      const productsDataResponse = await getProductsByCategory('laptops');
      setProducts(productsDataResponse);
    };
    getProducts();
  }, []);
  return (
    <Wrapper>
      <section
        className='bg-white grid gap-4 p-4 grid-cols-3 md:grid-cols-5 lg:grid-cols-6
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
export default Laptops;
