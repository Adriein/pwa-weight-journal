import React from 'react';
import { motion } from 'framer-motion';

export default function Carousel() {
  console.log(window.innerWidth);
  return (
    <div className="w-full h-48 flex overflow-hidden p-4">
      <motion.div
        className="h-full flex"
        drag="x"
        dragConstraints={{ left: -window.innerWidth, right: 0 }}
        dragElastic={0.2}
      >
        <div className="bg-blue-400 w-40 h-40 mr-5 rounded-md p-1 flex-col">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img
              className="h-full w-full object-cover"
              src="/api/static/3"
              alt="home gym"
            />
          </div>
          <div className="p-1 flex-grow">
            <h4 className="text-sm">Inicia tu entrenamiento</h4>
            <p className="text-xs">Empieza a medir la calidad de tus entrenos</p>
          </div>
        </div>
        <div className="bg-red-500 w-40 h-40 mr-5"></div>
        <div className="bg-yellow-500 w-40 h-40 mr-5"></div>
      </motion.div>
      <motion.div className="hidden">screen 2</motion.div>
    </div>
  );
}
