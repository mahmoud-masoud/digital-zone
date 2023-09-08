import Wrapper from '../../UI/Wrapper';
import { smartWatches } from '../../data';
import ProductCard from '../../UI/ProductCard';
import { Link } from 'react-router-dom';
import { getProductsByCategory } from '../../Utils/firebase-functions';
import { useEffect, useState } from 'react';
import HomePageCard from '../../UI/HomePageCard';

const SmartWatches = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      const productsDataResponse = await getProductsByCategory('smart-watches');
      setProducts(productsDataResponse);
    };
    getProducts();
  }, []);

  return (
    <Wrapper>
      <section
        className='bg-white grid gap-10 p-4 grid-cols-3 md:grid-cols-5 lg:grid-cols-6
      '
      >
        {products?.map((product) => (
          <Link to={product.id} key={product.id}>
            {/* <ProductCard
              img={product.images[0]}
              title={product.title}
              price={product.price}
            /> */}
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
export default SmartWatches;
