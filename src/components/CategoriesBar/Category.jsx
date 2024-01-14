const Category = ({ img, title }) => {
  return (
    <div
      className="flex flex-col items-center
       justify-center text-dark
        "
    >
      <div
        className="flex aspect-square h-28 w-28 items-center justify-center overflow-hidden
      rounded-full bg-light p-4 sm:h-32 sm:w-32"
      >
        <div className="p-2">
          <img
            src={img}
            alt={title}
            height={"auto"}
            className="max-w-full object-fill"
          />
        </div>
      </div>
      <p className="pt-2 text-center font-medium">{title}</p>
    </div>
  );
};
export default Category;
