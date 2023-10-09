import { useState } from 'react';

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
import { useFieldArray, useForm } from 'react-hook-form';
import { TiDelete } from 'react-icons/ti';

const ProductForm = () => {
  const productId = v4();

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  return (
    <div className='p-6'>
      <Wrapper className={'w-full max-w-[900px]'}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col gap-8 p-6 bg-white shadow-lg rounded-lg border'>
            <ProductTitle register={register('title')} />
            <ProductHighlights setValue={setValue} />
            <ProductDescription register={register('description')} />
            <ProductFeatures setValue={setValue} />
            <ProductImages setValue={setValue} />
            <ProductPrice register={register('price')} />
            <ProductCategory register={register('category')} />
            <Tags setValue={setValue} />
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
  );
};
export default ProductForm;
