import LoadingSpinner from './LoadingSpinner';
const Loading = () => {
  return (
    <div
      className={`animate-pulse bg-blue-400 w-screen h-full absolute right-0 top-0 z-50
       flex items-center justify-center`}
    >
      <LoadingSpinner />
    </div>
  );
};
export default Loading;
