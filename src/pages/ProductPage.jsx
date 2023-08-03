import DesktopProductPage from './DesktopProductPage';
import MobileProductPage from './MobileProductPage';
import isMobileOrTablet from '../Utils/isMobileOrTablet';

const ProductPage = () => {
  return isMobileOrTablet ? <MobileProductPage /> : <DesktopProductPage />;
};
export default ProductPage;
