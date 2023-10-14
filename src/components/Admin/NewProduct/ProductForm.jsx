import { useEffect, useState } from 'react';

import Wrapper from '../../../UI/Wrapper';
import ProductCategory from './ProductCategory';
import ProductTitle from './ProductTitle';
import ProductDescription from './ProductDescription';
import ProductPrice from './ProductPrice';
import ProductHighlights from './ProductHighlights';
import ProductImages from './imges-grid/ProductImages';
import ProductFeatures from './ProductFeatures';
import Tags from './Tags';
import { v4 as uuidv4, v4 } from 'uuid';
import { collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { uploadImages } from '../../../Utils/firebase-functions';
import { db } from '../../../Utils/firebase';
import { useForm, Controller, FormProvider, set } from 'react-hook-form';
import { TiDelete } from 'react-icons/ti';
import Loading from '../../../UI/Loading';
import useProduct from '../../../Hooks/useProduct';
import Test from './Test';

const ProductForm = () => {
  const { product, isLoading, hasError } = useProduct();

  const {
    control,
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (product) {
    setValue('title', product.title);
    setValue('description', product.description);
    setValue('price', product.price);
    setValue('category', product.category);
  }

  const onSubmit = (data) => {
    console.log('Submitted data:', data);
  };

  return (
    <>
      {isLoading && <Loading />}

      {product && (
        <div className='p-6'>
          <Wrapper className={'w-full max-w-[900px]'}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='flex flex-col gap-8 p-6 bg-white shadow-lg rounded-lg border'>
                <ProductTitle register={register('title')} />

                <ProductHighlights
                  setValue={setValue}
                  serverHighlights={product.highlights}
                />

                <ProductDescription register={register('description')} />
                <ProductFeatures
                  setValue={setValue}
                  serverFeatures={product.features}
                />
                <ProductImages
                  setValue={setValue}
                  serverImages={product.images}
                />
                <ProductPrice register={register('price')} />
                <ProductCategory register={register('category')} />
                <Tags setValue={setValue} serverTags={product.tags} />
              </div>

              <button
                type='submit'
                className='bg-primary hover:bg-after transition py-2 px-6 mt-6 ml-auto block text-white rounded-md'
              >
                <div className='flex gap-4 font-semibold'>Save</div>
              </button>
            </form>
          </Wrapper>
        </div>
      )}
    </>
  );
};
export default ProductForm;
