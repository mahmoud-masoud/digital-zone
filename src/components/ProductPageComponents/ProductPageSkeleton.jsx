import Loading from '../../UI/Loading';
import Wrapper from '../../UI/Wrapper';

const ProductPageSkeleton = () => {
  return (
    <Wrapper className={'my-40'}>
      <div className='flex justify-between'>
        <div className='flex flex-col gap-4'>
          <Loading className={'rounded-md w-24 h-24'} />
          <Loading className={'rounded-md w-24 h-24'} />
          <Loading className={'rounded-md w-24 h-24'} />
          <Loading className={'rounded-md w-24 h-24'} />
        </div>

        <Loading className={'rounded-md w-[350px] h-[350px]'} />

        <Loading className={'rounded-md w-[350px] h-[430px]'} />
      </div>
      <div className='mt-20'>
        <Loading className={'rounded-md w-40 h-6'} />
        <Loading className={'rounded-md w-[350px] h-[430px]'} />
      </div>
    </Wrapper>
  );
};
export default ProductPageSkeleton;
