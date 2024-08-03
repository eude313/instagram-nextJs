import { motion } from 'framer-motion';

const ScaleUpHorLeft = ({ children }) => {
  return (
    <motion.div
      initial={{ scaleX: 0.4 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.4, ease: [0.39, 0.575, 0.565, 1] }}
      style={{ transformOrigin: '0% 0%' }}
      className="overflow-hidden"
    >
      {children}
    </motion.div>
  );
};

export default ScaleUpHorLeft;
