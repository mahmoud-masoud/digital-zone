import Wrapper from '../../UI/Wrapper';

const ProductsSkeleton = () => {
  return (
    <Wrapper>
      <div className='flex justify-between gap-4 md:gap-8 w-full'>
        <div className='flex flex-col gap-4 w-40 md:w-56  animate-pulse flex-shrink-0'>
          <div className='img-placeholder w-full rounded-lg  h-40 md:h-56 bg-gray-200'></div>
          <div className='button-placeholder p-4 rounded-full w-24 bg-gray-200'></div>
          <div className='title flex flex-col gap-2 w-full'>
            <span className='w-full p-2 block rounded-md bg-gray-200'></span>
            <span className='w-full p-2 block rounded-md bg-gray-200'></span>
          </div>
        </div>
        <div className='flex flex-col gap-4 w-40 md:w-56  animate-pulse flex-shrink-0'>
          <div className='img-placeholder w-full rounded-lg  h-40 md:h-56 bg-gray-200'></div>
          <div className='button-placeholder p-4 rounded-full w-24 bg-gray-200'></div>
          <div className='title flex flex-col gap-2 w-full'>
            <span className='w-full p-2 block rounded-md bg-gray-200'></span>
            <span className='w-full p-2 block rounded-md bg-gray-200'></span>
          </div>
        </div>
        <div className='flex flex-col gap-4 w-40 md:w-56  animate-pulse flex-shrink-0'>
          <div className='img-placeholder w-full rounded-lg  h-40 md:h-56 bg-gray-200'></div>
          <div className='button-placeholder p-4 rounded-full w-24 bg-gray-200'></div>
          <div className='title flex flex-col gap-2 w-full'>
            <span className='w-full p-2 block rounded-md bg-gray-200'></span>
            <span className='w-full p-2 block rounded-md bg-gray-200'></span>
          </div>
        </div>
        <div className='hidden xl:flex flex-col gap-4 w-40 md:w-56 animate-pulse flex-shrink-0'>
          <div className='img-placeholder w-full rounded-lg  h-40 md:h-56 bg-gray-200'></div>
          <div className='button-placeholder p-4 rounded-full w-24 bg-gray-200'></div>
          <div className='title flex flex-col gap-2 w-full'>
            <span className='w-full p-2 block rounded-md bg-gray-200'></span>
            <span className='w-full p-2 block rounded-md bg-gray-200'></span>
          </div>
        </div>
        <div className='hidden lg:flex flex-col gap-4 w-40 md:w-56  animate-pulse flex-shrink-0'>
          <div className='img-placeholder w-full rounded-lg  h-40 md:h-56 bg-gray-200'></div>
          <div className='button-placeholder p-4 rounded-full w-24 bg-gray-200'></div>
          <div className='title flex flex-col gap-2 w-full'>
            <span className='w-full p-2 block rounded-md bg-gray-200'></span>
            <span className='w-full p-2 block rounded-md bg-gray-200'></span>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
export default ProductsSkeleton;
