import Wrapper from '../../UI/Wrapper';
import { Link, useParams } from 'react-router-dom';
import HomePageCard from '../../UI/HomePageCard';
import Loading from '../../UI/Loading';
import useCategory from '../../Hooks/useCategory';

const Category = () => {
  const category = useParams().category;
  const { products, loading, error } = useCategory(category);
  return (
    <>
      {loading && <Loading />}
      {error && <p>Something went wrong, refresh the page</p>}
      {!loading && !error && (
        <Wrapper>
          <section
            className='bg-white grid gap-10 p-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4
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
      )}
    </>
  );
};
export default Category;
