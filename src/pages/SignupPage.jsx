import { motion } from 'framer-motion';

import SignupComponents from '../components/auth/CreateAccount/SignupComponents';

const SignUp = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.5 }}
    >
      <SignupComponents />
    </motion.div>
  );
};
export default SignUp;
