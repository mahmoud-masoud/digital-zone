import { cubicBezier } from 'framer-motion';

const Loading = ({ className }) => {
  return <div className={`animate-pulse bg-gray-200  ${className}`}></div>;
};
export default Loading;
