import Wrapper from '../../../UI/Wrapper';
import GoogleLogo from '../../../UI/GoogleLogo';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../../Utils/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';

const SignInCard = () => {
  const navigate = useNavigate();
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');

  const signInWithEmailAndPasswordHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await signInWithEmailAndPassword(
        auth,
        enteredEmail,
        enteredPassword
      );
      console.log(res);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className='bg-light h-screen'>
      <Wrapper className='flex justify-center items-center pt-24 px-4'>
        <div className='bg-white shadow-lg rounded-xl p-8 md:min-w-[450px]'>
          <h3 className='font-bold text-3xl mb-6 text-fontColor'>
            Log in to your account
          </h3>

          <form
            className='flex flex-col gap-3'
            onSubmit={signInWithEmailAndPasswordHandler}
          >
            <div className='flex flex-col'>
              <label htmlFor='email' className='mb-1 text-primary font-medium'>
                email address
              </label>
              <input
                type='email'
                id='email'
                placeholder='Enter your email address'
                onChange={(e) => setEnteredEmail(e.target.value)}
                className='p-3 border border-gray-400 hover:border-primary rounded-lg
                transition-all duration-300'
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
                placeholder='Enter your password'
                autoComplete='true'
                onChange={(e) => setEnteredPassword(e.target.value)}
                className='p-3 border border-gray-400 hover:border-primary rounded-lg
                transition-all duration-300'
              />
            </div>

            <button
              className='bg-primary text-white p-3 mt-2 border border-gray-400 font-semibold 
              rounded-lg hover:opacity-80 hover:text-white transition-all duration-300'
            >
              Login
            </button>
          </form>
          <hr className='mt-6' />
          <button
            className='flex justify-center items-center gap-2 mt-6 w-full px-1 py-2 border
             border-gray-400 font-semibold rounded-lg
          hover:bg-primary hover:text-white transition-all duration-300'
          >
            <div className='bg-white p-[.2rem] rounded-[4px]'>
              <GoogleLogo />
            </div>
            Sign In with Google
          </button>

          <p className='mt-2 text-gray-500'>
            Don't have an account?
            <Link
              to={'/signup'}
              className='ml-3 text-primary font-medium underline hover:no-underline'
            >
              Sign up
            </Link>
          </p>
        </div>
      </Wrapper>
    </section>
  );
};
export default SignInCard;
