import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Carousel({ children }) {
  const [maxWidth, setMaxWidth] = useState(0);
  const setBoundary = (children) => {
    const [child] = children;
    return child.ref.current.offsetWidth * (children.length -1);
  };

  useEffect(() => {
    setMaxWidth(setBoundary(children));
  }, [children]);

  return (
    <motion.div
      className="w-full h-48 flex overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <motion.div
        className="h-full flex"
        drag="x"
        dragConstraints={{ left: -maxWidth, right: 0 }}
        dragElastic={0.2}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
