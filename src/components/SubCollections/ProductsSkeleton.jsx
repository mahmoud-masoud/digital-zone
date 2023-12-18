import Wrapper from "../../UI/Wrapper";

const ProductsSkeleton = () => {
  return (
    <Wrapper>
      <div className="flex w-full justify-between gap-4 md:gap-8">
        <div className="flex w-40 flex-shrink-0 animate-pulse flex-col  gap-4 md:w-56">
          <div className="img-placeholder h-40 w-full  rounded-lg bg-gray-200 md:h-56"></div>
          <div className="button-placeholder w-24 rounded-full bg-gray-200 p-4"></div>
          <div className="title flex w-full flex-col gap-2">
            <span className="block w-full rounded-md bg-gray-200 p-2"></span>
            <span className="block w-full rounded-md bg-gray-200 p-2"></span>
          </div>
        </div>
        <div className="flex w-40 flex-shrink-0 animate-pulse flex-col  gap-4 md:w-56">
          <div className="img-placeholder h-40 w-full  rounded-lg bg-gray-200 md:h-56"></div>
          <div className="button-placeholder w-24 rounded-full bg-gray-200 p-4"></div>
          <div className="title flex w-full flex-col gap-2">
            <span className="block w-full rounded-md bg-gray-200 p-2"></span>
            <span className="block w-full rounded-md bg-gray-200 p-2"></span>
          </div>
        </div>
        <div className="flex w-40 flex-shrink-0 animate-pulse flex-col  gap-4 md:w-56">
          <div className="img-placeholder h-40 w-full  rounded-lg bg-gray-200 md:h-56"></div>
          <div className="button-placeholder w-24 rounded-full bg-gray-200 p-4"></div>
          <div className="title flex w-full flex-col gap-2">
            <span className="block w-full rounded-md bg-gray-200 p-2"></span>
            <span className="block w-full rounded-md bg-gray-200 p-2"></span>
          </div>
        </div>
        <div className="hidden w-40 flex-shrink-0 animate-pulse flex-col gap-4 md:w-56 xl:flex">
          <div className="img-placeholder h-40 w-full  rounded-lg bg-gray-200 md:h-56"></div>
          <div className="button-placeholder w-24 rounded-full bg-gray-200 p-4"></div>
          <div className="title flex w-full flex-col gap-2">
            <span className="block w-full rounded-md bg-gray-200 p-2"></span>
            <span className="block w-full rounded-md bg-gray-200 p-2"></span>
          </div>
        </div>
        <div className="hidden w-40 flex-shrink-0 animate-pulse flex-col gap-4  md:w-56 lg:flex">
          <div className="img-placeholder h-40 w-full  rounded-lg bg-gray-200 md:h-56"></div>
          <div className="button-placeholder w-24 rounded-full bg-gray-200 p-4"></div>
          <div className="title flex w-full flex-col gap-2">
            <span className="block w-full rounded-md bg-gray-200 p-2"></span>
            <span className="block w-full rounded-md bg-gray-200 p-2"></span>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
export default ProductsSkeleton;
