import Wrapper from '../../UI/Wrapper';
import { mobilePhones } from '../../data';
import ProductCard from '../../UI/ProductCard';
import { Link } from 'react-router-dom';
import HomePageCard from '../../UI/HomePageCard';
import { useEffect, useState } from 'react';
import { getProductsByCategory } from '../../Utils/firebase-functions';
const MobilePhones = () => {
  const [products, setProducts] = useState(null);
  useEffect(() => {
    const getProducts = async () => {
      const productsDataResponse = await getProductsByCategory('mobile-phones');
      setProducts(productsDataResponse);
    };
    getProducts();
  }, []);

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
