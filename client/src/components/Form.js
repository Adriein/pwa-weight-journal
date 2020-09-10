import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useHistory } from 'react-router-dom';

import Header from './Header';
import Navigation from './Navigation';

const pageVariants = {
  initial: {
    opacity: 0,
    x: '-100vw',
    scale: 0.8,
  },
  in: {
    opacity: 1,
    x: 0,
    scale: 1,
  },
  out: {
    opacity: 0,
    x: '100vw',
    scale: 1.2,
  },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 1,
};

export default function Form() {
  const history = useHistory();
  const [from] = useState(history.location.state.from);
  console.log(from);
  return (
    <div className="h-screen">
      <Header currentPage={'Crear entreno'} navigation={true} />
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        <div className="p-4">
          <form action="">
              <label htmlFor=""></label>
              <input type="text" name=""/>
              <input type="text"/>
          </form>
        </div>
      </motion.div>
      <Navigation active={'trainings'} />
    </div>
  );
}
