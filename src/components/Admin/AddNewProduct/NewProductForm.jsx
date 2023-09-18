import NewProductCollectionSelect from './NewProductCollectionSelect';
import NewProductTitle from './NewProductTitle';
import NewProductDescription from './NewProductDescription';
import NewProductPrice from './NewProductPrice';
import CreateNewProductBtn from './CreateNewProductBtn';

import { uploadImages } from '../../../Utils/firebase-functions';
import { addProduct } from '../../../Utils/firebase-functions';
import ProductHighlights from './ProductHighlights';
import UploadGallery from './imges-grid/UploadGallery';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { v4 as uuidv4, v4 } from 'uuid';
import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../../../Utils/firebase';

const NewProductForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { title, description, images, highlights, price, category } =
    useSelector((state) => state.newProductFormData);

  const productId = v4();
  console.log(price);
  const formSubmitHandler = async (e) => {
    setIsSubmitting(true);
    e.preventDefault();
    try {
      const imagesUrls = await uploadImages(images, category, title);

      console.log('upload images successfully');

      const productData = {
        title,
        highlights,
        description,
        price: price,
        images: imagesUrls,
        id: productId,
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
    <form className='my-20' onSubmit={formSubmitHandler}>
      <div>
        <div className='flex flex-col gap-4 shadow-lg rounded-lg border p-6 min-w-[500px]'>
          <NewProductTitle />
          <ProductHighlights />
          <NewProductDescription />
          <UploadGallery />
          <NewProductPrice />
          <NewProductCollectionSelect />
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
  );
};
export default NewProductForm;
