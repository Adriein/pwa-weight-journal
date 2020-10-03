import React, { useContext, useEffect, useState } from 'react';
import { motion, AnimateSharedLayout, AnimatePresence } from 'framer-motion';

import { RutinesContext } from '../context/RutinesContext';
import { LogContext } from '../context/LogContext';
import { LogDispatcherContext } from '../context/LogContext';

import Header from './Header';
import Navigation from './Navigation';
import { GiWeightLiftingUp } from 'react-icons/gi';

import axios from 'axios';
import { pageVariants, pageTransition } from '../helpers';

export default function Logs() {
  const rutineState = useContext(RutinesContext);
  const logState = useContext(LogContext);
  const dispatcher = useContext(LogDispatcherContext);

  const setCurrentPage = () => {
    return logState.render.default
      ? 'Registros'
      : logState.render.create
      ? 'Crear Registro'
      : 'Editar Rutina';
  };

  const navigationLogic = () => {
    if (logState.render.create && logState.render.search) {
      return {
        visible: true,
        action: () => dispatcher({ type: 'SET_CREATE' }),
      };
    }
    if (logState.render.create || logState.render.edit) {
      return {
        visible: true,
        action: () => dispatcher({ type: 'SET_DEFAULT' }),
      };
    }
  };

  const selectExercice = (exercice) => () => {

  }
  return (
    <div className="h-screen">
      <Header currentPage={setCurrentPage()} navigation={navigationLogic()} />
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        <div className="p-4">
          <p className="text-3xl font-bold mb-1">{rutineState.rutine.name}</p>
          <p className="text-gray-600 mb-4">{rutineState.rutine.description}</p>
          <ul>
            {rutineState.rutine.exercices.map((exercice) => {
              return (
                <Item
                  key={exercice.id}
                  exercice={exercice}
                  selectExercice={selectExercice}
                />
              );
            })}
          </ul>
        </div>
      </motion.div>
      <Navigation active={'logs'} />
    </div>
  );
}

function Item({ exercice, selectExercice }) {
  return (
    <motion.li
      layout
      className="w-full flex items-center mb-2 h-16"
      onClick={selectExercice}
    >
      <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-300 p-1">
        <GiWeightLiftingUp className="h-full w-full object-cover text-blue-800" />
      </div>
      <p className="font-semibold ml-2">{exercice.name}</p>
    </motion.li>
  );
}
