import Carousel from '../components/BannersCarousel/Carousel';
import Categories from '../components/CategoriesBar/Categories';
import Footer from '../components/Footer/Footer';
import BestSellers from '../components/SubCollections/BestSellers';
import Gaming from '../components/SubCollections/Gaming';
import NewArrivals from '../components/SubCollections/NewArrivals';

const Home = () => {
  return (
    <>
      <Carousel />
      <Categories />
      <BestSellers />
      <NewArrivals />
      <Gaming />
      <Footer />
    </>
  );
};
export default Home;
