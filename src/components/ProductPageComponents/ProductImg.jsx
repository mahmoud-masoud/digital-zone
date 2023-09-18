import { useState } from 'react';
import ImagePlaceHolder from '../../UI/ImagePlaceHolder';

const ProductImg = ({ url }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imageDownloadingHandler = () => {
    setIsLoaded(true);
  };

  console.log(isLoaded);

  return (
    <>
      <img
        src={url}
        alt='product image'
        onLoad={imageDownloadingHandler}
        loading='lazy'
        className={`${isLoaded ? 'block' : 'hidden'} `}
      />
      <ImagePlaceHolder className={`${isLoaded ? 'hidden' : 'block'}`} />
    </>
  );
};
export default ProductImg;
