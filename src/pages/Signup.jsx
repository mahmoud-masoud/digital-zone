import { motion } from 'framer-motion';
import SignupCard from '../components/auth/SignUp/SignupCard';

const SignUp = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.5 }}
    >
      <SignupCard />
    </motion.div>
  );
};
export default SignUp;
