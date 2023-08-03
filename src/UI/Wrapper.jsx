const Wrapper = ({ children, className }) => {
  return <div className={`container mx-auto ${className}`}>{children}</div>;
};
export default Wrapper;
