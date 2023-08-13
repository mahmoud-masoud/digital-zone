import { lazy, Suspense } from 'react';

const LazyLoadComponent = ({ url, fallback }) => {
  const LazyComponent = lazy(() => import(`${url}`));

  return (
    <Suspense fallback={fallback}>
      <LazyComponent />
    </Suspense>
  );
};
export default LazyLoadComponent;
