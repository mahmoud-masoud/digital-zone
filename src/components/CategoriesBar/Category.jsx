const Category = ({ img, title }) => {
  return (
    <div
      className="flex flex-1 flex-col
     items-center justify-between rounded-xl bg-light p-2"
    >
      <div
        className=" flex h-[100px] w-[100px] items-center
       justify-center overflow-hidden rounded-lg p-2 md:h-[150px] md:w-[150px]"
      >
        <img src={img} alt={title} className="max-w-full" />
      </div>
      <p className="pt-2 text-lg font-medium text-dark">{title}</p>
    </div>
  );
};
export default Category;
