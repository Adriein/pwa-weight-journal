import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useHistory } from 'react-router-dom';

import { MdSettings } from 'react-icons/md';

import Header from './Header';
import Navigation from './Navigation';
import Carousel from './Carousel';

export default function Home() {
  const history = useHistory();
  const targetRef = useRef();
  const navigate = (path) => () => {
    history.push(`/${path}`);
  };
  const CONTENT = {
    logs: {
      title: 'Inicia tu entrenamiento',
      legend: 'Empieza a medir la calidad de tus entrenos',
    },
    graphs: {
      title: 'Mide tu progreso',
      legend: 'Graficos actualizados de tus registros de entrenamiento',
    },
    settings: {
      title: 'Configura tu cuenta',
      legend: 'Añade una foto de perfil y configura tu cuenta',
    },
  };
  return (
    <div>
      <Header currentPage={'Inicio'} />
      <div>
        <div className="p-4">
          <Carousel>
            {[
              ['logs', 'blue'],
              ['graphs', 'green'],
              ['settings', 'yellow'],
            ].map(([link, color], index) => {
              return (
                <motion.div
                  className={`bg-${color}-400 w-48 h-40 mr-5 rounded-md p-2 flex-col`}
                  onClick={navigate(link)}
                  whileTap={{ scale: 1.1 }}
                  ref={targetRef}
                >
                  {index === 2 ? (
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                      <MdSettings className="h-full w-full object-cover text-yellow-600" />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <img
                        className="h-full w-full object-cover"
                        src={`/api/static/${link}`}
                        alt="training"
                      />
                    </div>
                  )}
                  <div className="p-1 mt-5">
                    <h4 className="text-sm font-semibold">
                      {CONTENT[link].title}
                    </h4>
                    <p className="text-xs">{CONTENT[link].legend}</p>
                  </div>
                </motion.div>
              );
            })}
          </Carousel>
        </div>
      </div>
      <Navigation active={'home'} />
    </div>
  );
}
