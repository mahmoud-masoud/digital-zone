import Wrapper from '../../../UI/Wrapper';
import GoogleLogo from '../../../UI/GoogleLogo';
import { Link, redirect, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { auth } from '../../../Utils/firebase';
import { googlAuthProvider } from '../../../Utils/firebase';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  signInWithRedirect,
} from 'firebase/auth';
import { addNewUser } from '../../../Utils/firebase-functions';

const SignupCard = () => {
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userName, setUsername] = useState('');

  const [signUpState, setSignUpState] = useState({
    isError: false,
    sending: true,
    success: false,
  });

  const [start, setStart] = useState(false);

  const createUser = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userEmail,
        userPassword
      );

      await updateProfile(userCredential.user, { displayName: userName });

      const { displayName, email, uid } = userCredential.user;

      addNewUser(
        {
          displayName,
          email,
          uid,
          uid,
          favorites: [],
          cartItems: [],
        },
        uid
      );

      redirect('/');

      setSignUpState((state) => {
        return { state, sending: false, success: true };
      });
    } catch (error) {
      setSignUpState((state) => {
        return { state, sending: false, isError: true };
      });
      console.log(error);
    }
  };

  const signUpWithEmailAndPassword = async (e) => {
    setStart(true);
    e.preventDefault();
    await createUser();

    navigate('/');
  };

  const signUpWithGoogle = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googlAuthProvider);
      const { displayName, email, uid } = userCredential.user;

      addNewUser(
        {
          displayName,
          email,
          uid,
          uid,
          favorites: [],
          cartItems: [],
        },
        uid
      );

      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className='bg-light h-screen'>
      <Wrapper className='flex justify-center items-center pt-24 px-4'>
        <div className='bg-white shadow-lg rounded-xl p-8 md:min-w-[450px]'>
          <h3 className='font-bold text-3xl mb-4 text-fontColor'>
            Create your account
          </h3>
          <p className='text-gray-600 mb-8'>
            Sign up and shop on a whole new level.
          </p>
          <button
            className='flex justify-center items-center gap-2 w-full px-1 py-2 border
            border-gray-400 font-semibold rounded-lg
          hover:bg-primary hover:text-white transition-all duration-300'
            onClick={signUpWithGoogle}
          >
            <div className='bg-white p-[.2rem] rounded-[4px]'>
              <GoogleLogo />
            </div>
            Sign Up with Google
          </button>
          <br />
          <span className='mb-2 text-sm block'>Or with email</span>
          <form
            className='flex flex-col gap-3'
            onSubmit={signUpWithEmailAndPassword}
          >
            <div className='flex flex-col'>
              <label
                htmlFor='username'
                className='mb-1 text-primary font-medium'
              >
                Enter a name
              </label>
              <input
                type='text'
                id='username'
                placeholder='Enter your email address'
                className='p-3 border border-gray-400 hover:border-primary rounded-lg
                transition-all duration-300'
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className='flex flex-col'>
              <label htmlFor='email' className='mb-1 text-primary font-medium'>
                email address
              </label>
              <input
                type='email'
                id='email'
                placeholder='Enter your email address'
                className='p-3 border border-gray-400 hover:border-primary rounded-lg
                transition-all duration-300'
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </div>

            <div className='flex flex-col'>
              <label
                htmlFor='password'
                className='mb-1 text-primary font-medium'
              >
                password
              </label>
              <input
                type='password'
                id='password'
                placeholder='Create a password'
                autoComplete='true'
                className='p-3 border border-gray-400 hover:border-primary rounded-lg
                transition-all duration-300'
                onChange={(e) => setUserPassword(e.target.value)}
              />
            </div>

            <button
              className='bg-primary text-white  p-3  mt-2 border border-gray-400 font-semibold 
              rounded-lg hover:opacity-80 hover:text-white transition-all duration-300'
            >
              Sign Up
            </button>
          </form>
          <p className='mt-2 text-gray-500'>
            Already have an account?
            <Link
              to={'/login'}
              className='ml-3 text-primary font-medium underline hover:no-underline'
            >
              Sign in
            </Link>
          </p>
          {start && (
            <p>
              {(signUpState.isError && 'there is an error') ||
                (signUpState.sending && 'Loading') ||
                (signUpState.success && 'Sign up successfully')}
            </p>
          )}
        </div>
      </Wrapper>
    </section>
  );
};
export default SignupCard;
