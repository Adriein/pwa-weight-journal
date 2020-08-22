import React from 'react';
import { motion } from 'framer-motion';
import { useHistory } from 'react-router-dom';

import { MdSettings } from 'react-icons/md';

export default function Carousel() {
  const history = useHistory();
  const navigate = (path) => () => {
    history.push(`/${path}`);
  };

  return (
    <motion.div className="w-full h-48 flex overflow-hidden p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 5 }}>
      <motion.div
        className="h-full flex"
        drag="x"
        dragConstraints={{ left: -window.innerWidth, right: 0 }}
        dragElastic={0.2}
      >
        <motion.div
          className="bg-blue-400 w-48 h-40 mr-5 rounded-md p-2 flex-col"
          onClick={navigate('logs')}
          whileTap={{ scale: 1.1 }}
        >
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img
              className="h-full w-full object-cover"
              src="/api/static/3"
              alt="training"
            />
          </div>
          <div className="p-1 mt-5">
            <h4 className="text-sm font-semibold">Inicia tu entrenamiento</h4>
            <p className="text-xs">
              Empieza a medir la calidad de tus entrenos
            </p>
          </div>
        </motion.div>
        <div className="bg-green-400 w-48 h-40 mr-5 rounded-md p-2 flex-col">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img
              className="h-full w-full object-cover"
              src="/api/static/4"
              alt="graphs"
            />
          </div>
          <div className="p-1 mt-5">
            <h4 className="text-sm font-semibold">Mide tu progreso</h4>
            <p className="text-xs">
              Graficos actualizados de tus registros de entrenamiento
            </p>
          </div>
        </div>
        <div className="bg-yellow-400 w-48 h-40 mr-5 rounded-md p-2 flex-col">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
            <MdSettings className="h-full w-full object-cover text-yellow-600" />
          </div>
          <div className="p-1 mt-5">
            <h4 className="text-sm font-semibold">Configura tu cuenta</h4>
            <p className="text-xs">
              Añade una foto de perfil y otras configuraciones
            </p>
          </div>
        </div>
      </motion.div>
      <motion.div className="hidden">screen 2</motion.div>
    </motion.div>
  );
}
