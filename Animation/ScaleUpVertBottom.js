import { motion } from 'framer-motion';

export default function ScaleUpVertBottom({ children }) {
    return (
        <motion.div
        initial={{ scaleY: 0.4, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 1 }}
        exit={{ scaleY: 0.4, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.39, 0.575, 0.565, 1] }}
        style={{ transformOrigin: 'bottom' }} 
        className="overflow-hidden"
        >
        {children}
        </motion.div>
    );
     
}
