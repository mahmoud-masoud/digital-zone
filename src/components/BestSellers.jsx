import { Link } from 'react-router-dom';
import GridCard from '../UI/GridCard';
import { bestSellers } from '../data';
const BestSellers = () => {
  return (
    <section className='container mx-auto p-4 bg-light rounded-xl '>
      <h3 className='mb-8 text-xl font-semibold text-fontColor'>
        Best Sellers
      </h3>
      <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-y-6 gap-x-3 md:gap-x-6 md:gap-y-5  '>
        {bestSellers.map((product) => (
          <Link to={product.id} key={product.id}>
            <GridCard
              title={product.title}
              img={product.image}
              price={`$${product.price}`}
            />
          </Link>
        ))}
      </div>
    </section>
  );
};
export default BestSellers;
