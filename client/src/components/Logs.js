import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { RutinesContext } from '../context/RutinesContext';
import { LogContext } from '../context/LogContext';
import { LogDispatcherContext } from '../context/LogContext';

import Header from './Header';
import Navigation from './Navigation';
import { GiWeightLiftingUp } from 'react-icons/gi';
import { MdAdd } from 'react-icons/md';

import axios from 'axios';
import { pageVariants, pageTransition } from '../helpers';
import useInputState from '../hooks/useInputState';

export default function Logs() {
  const rutineState = useContext(RutinesContext);
  const logState = useContext(LogContext);
  const dispatch = useContext(LogDispatcherContext);
  const [shouldShowActions, setShouldShowActions] = useState(true);
  const [lastYPos, setLastYPos] = useState(0);
  const [value, handleChange] = useInputState({
    kg: '',
    reps: '',
  });

  useEffect(() => {
    function handleScroll() {
      const yPos = window.scrollY;
      const isScrollingUp = yPos < lastYPos;

      setShouldShowActions(isScrollingUp);
      setLastYPos(yPos);
    }

    window.addEventListener('scroll', handleScroll, false);

    return () => {
      window.removeEventListener('scroll', handleScroll, false);
    };
  }, [lastYPos]);

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
        action: () => dispatch({ type: 'SET_CREATE' }),
      };
    }
    if (logState.render.create || logState.render.edit) {
      return {
        visible: true,
        action: () => dispatch({ type: 'SET_DEFAULT' }),
      };
    }
  };

  const selectExercice = (exercice) => () => {
    dispatch({ type: 'SET_CREATE', payload: { exercice } });
  };

  const addSerie = () => {
    dispatch({ type: 'ADD_SERIE' });
  };

  const saveLog = async () => {
    /*await axios.post('api/log', {
      rutineId: rutineState.rutine.id,
      serie: { number: logState.render.serie, kg: value.kg, reps: value.reps },
      exerciceId: logState.log.exercice.id,
    });*/
  };

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
          {logState.render.default && (
            <section>
              <p className="text-3xl font-bold mb-1">
                {rutineState.rutine.name}
              </p>
              <p className="text-gray-600 mb-4">
                {rutineState.rutine.description}
              </p>
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
            </section>
          )}
          {logState.render.create && (
            <section>
              <p className="text-xl font-bold mb-1">
                {logState.log.exercice.name}
              </p>
              {logState.render.showForm && (
                <div>
                  <p>Serie {logState.render.serie}</p>
                  kg:
                  <input
                    type="text"
                    name="kg"
                    value={value.kg}
                    onChange={handleChange}
                  />
                  reps:
                  <input
                    type="text"
                    name="reps"
                    value={value.reps}
                    onChange={handleChange}
                  />
                  <div onClick={saveLog}>Guardar</div>
                </div>
              )}
            </section>
          )}
        </div>
      </motion.div>
      {logState.render.create && (
        <div className="flex w-full px-4 py-2 pb-4 justify-end fixed mt-20 z-10 bottom-0 mb-24">
          <motion.div
            initial={{ scale: 0.0 }}
            animate={{
              scale:
                rutineState.render.default && shouldShowActions ? 1.2 : 0.0,
            }}
            transition={pageTransition}
            className="flex items-center bg-purple-600 p-2 rounded-full"
            onClick={addSerie}
          >
            <div className="w-6 h-6 rounded-full overflow-hidden focus:outline-none focus:appearance-none ">
              <MdAdd className="h-full w-full object-cover text-white font-lg" />
            </div>
          </motion.div>
        </div>
      )}
      <Navigation active={'logs'} />
    </div>
  );
}

function Item({ exercice, selectExercice }) {
  return (
    <motion.li
      layout
      className="w-full flex items-center mb-2 h-16"
      onClick={selectExercice(exercice)}
    >
      <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-300 p-1">
        <GiWeightLiftingUp className="h-full w-full object-cover text-blue-800" />
      </div>
      <p className="font-semibold ml-2">{exercice.name}</p>
    </motion.li>
  );
}
