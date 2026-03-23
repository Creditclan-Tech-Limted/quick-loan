import React from 'react';
import { motion } from 'framer-motion';

const Backdrop = ({ children, onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[999] !m-0 flex items-center justify-center bg-black/70 p-0"
    >
      {children}
    </motion.div>
  );
};

export default Backdrop;
