import NewProductCollectionSelect from './NewProductCollectionSelect';
import NewProductTitle from './NewProductTitle';
import NewProductDescription from './NewProductDescription';
import NewProductPrice from './NewProductPrice';
import CreateNewProductBtn from './CreateNewProductBtn';

import { uploadImages } from '../../../Utils/firebase-functions';
import ProductHighlights from './ProductHighlights';
import UploadGallery from './imges-grid/UploadGallery';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { v4 as uuidv4, v4 } from 'uuid';
import { collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../../../Utils/firebase';
import Tags from './Tags';
import ProductFeatures from './ProductFeatures';
import Wrapper from '../../../UI/Wrapper';

const NewProductForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    title,
    description,
    features,
    images,
    highlights,
    price,
    category,
    tags,
  } = useSelector((state) => state.newProductFormData);

  console.log(features);

  const productId = v4();

  const formSubmitHandler = async (e) => {
    setIsSubmitting(true);
    e.preventDefault();
    try {
      const imagesUrls = await uploadImages(images, category, productId);

      console.log('upload images successfully');

      const productData = {
        title,
        highlights,
        description,
        features,
        price: price,
        images: imagesUrls,
        tags,
        id: productId,
        timestamp: serverTimestamp(),
      };

      const productsCollectionRef = collection(
        db,
        'categories',
        category,
        'products'
      );
      const productDocRef = doc(productsCollectionRef, productId);

      await setDoc(productDocRef, productData);
      console.log('done added product');

      setIsSuccess(true);
      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
      setIsError(true);
    }
  };

  return (
    <div className='py-6'>
      <Wrapper className={'w-full max-w-[900px]'}>
        <form onSubmit={formSubmitHandler}>
          <div>
            <div className='flex flex-col gap-8 p-6 bg-white shadow-lg rounded-lg border'>
              <NewProductTitle />
              <ProductHighlights />
              <NewProductDescription />
              <ProductFeatures />
              <UploadGallery />
              <NewProductPrice />
              <NewProductCollectionSelect />
              <Tags />
            </div>
            {isError && (
              <div className='bg-red-200 p-2 py-4 mt-4 border-b-4 border-red-600'>
                Something went wrong!
              </div>
            )}

            {isSuccess && (
              <div className='bg-green-200 p-2 py-4 mt-4 border-b-4 border-green-600'>
                Product added successfully
              </div>
            )}
            <CreateNewProductBtn
              isError={isError}
              isSubmitting={isSubmitting}
              isSuccess={isSuccess}
            />
          </div>
        </form>
      </Wrapper>
    </div>
  );
};
export default NewProductForm;
