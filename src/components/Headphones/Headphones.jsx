import Wrapper from '../../UI/Wrapper';
import { headphones } from '../../data';
import ProductCard from '../../UI/ProductCard';
import { Link } from 'react-router-dom';
import HomePageCard from '../../UI/HomePageCard';
import { useEffect, useState } from 'react';
import { getProductsByCategory } from '../../Utils/firebase-functions';
const Headphones = () => {
  const [products, setProducts] = useState(null);
  useEffect(() => {
    const getProducts = async () => {
      const productsDataResponse = await getProductsByCategory('headphones');
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
            {/* <ProductCard
              img={product.image}
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
export default Headphones;
