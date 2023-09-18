import { auth } from '../../../Utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import LoadingSpinner from '../../../UI/LoadingSpinner';
import { Link } from 'react-router-dom';

const MobileAccountAvatar = () => {
  const [user, loading, error] = useAuthState(auth);

  return (
    <div className='mb-6'>
      {user && <h2 className='text-xl font-medium'>hi, {user.displayName}</h2>}
      {loading && <LoadingSpinner />}
      {!user && !loading && (
        <Link to={'signup'}>
          <div className='bg-primary p-2 px-5 text-sm font-semibold w-fit text-white rounded-full'>
            Sign in or create account
          </div>
        </Link>
      )}
    </div>
  );
};
export default MobileAccountAvatar;
