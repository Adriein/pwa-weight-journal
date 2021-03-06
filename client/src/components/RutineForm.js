import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdDelete, MdExpandMore, MdAdd } from 'react-icons/md';
import { GiWeightLiftingUp } from 'react-icons/gi';

import { RutinesContext } from '../context/RutinesContext';
import { RutinesDispatcher } from '../context/RutinesContext';
import SearchExercices from './SearchExercices';

import useInputState from '../hooks/useInputState';
import { pageVariants, pageTransition } from '../helpers';
import axios from 'axios';

export default function RutineForm() {
  const rutineState = useContext(RutinesContext);
  const dispatch = useContext(RutinesDispatcher);
  const [options, setOptions] = useState({ visible: false, id: undefined });
  const [value, handleChange] = useInputState(rutineState.rutine);

  const enableOptions = (exercice) => () => {
    setOptions({ visible: true, id: exercice.id });
  };

  const disableOptions = (exercice) => () => {
    setOptions({ visible: false, id: exercice.id });
  };

  const saveRutine = async () => {
    if (rutineState.render.create) {
      dispatch({
        type: 'SAVE_RUTINE',
        payload: (
          await axios.post(
            'api/rutine',
            Object.assign({}, rutineState.rutine, {
              name: value.name,
              description: value.description,
            })
          )
        ).data,
      });
    } else {
      dispatch({
        type: 'UPDATE_RUTINE',
        payload: (
          await axios.put(
            'api/rutine',
            Object.assign({}, rutineState.rutine, {
              id: value.id,
              name: value.name,
              description: value.description,
            })
          )
        ).data,
      });
    }
  };

  const openSearch = () => {
    dispatch({ type: 'SET_SEARCH' });
  };

  const removeExercice = (exercice) => () => {
    dispatch({ type: 'REMOVE_EXERCICE', payload: exercice });
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="p-4"
    >
      {!rutineState.render.search && (
        <form action="">
          <p className="font-semibold text-gray-600 mb-1 text-lg">
            Nombre del entreno
          </p>
          <input
            id="search-bar"
            className="bg-white appearance-none border-2 border-gray-300 rounded p-1 w-full text-black font-medium leading-tight focus:outline-none focus:bg-white focus:border-blue-800 text-base"
            type="text"
            value={value.name}
            onChange={handleChange}
            autoComplete="off"
            name="name"
          />
          <p className="font-semibold text-gray-600 mt-4 mb-1 text-lg">
            Descripción
          </p>
          <input
            id="search-bar"
            className="bg-white appearance-none border-2 border-gray-300 rounded p-1 w-full text-black font-medium leading-tight focus:outline-none focus:bg-white focus:border-blue-800 text-base"
            type="text"
            value={value.description}
            onChange={handleChange}
            autoComplete="off"
            name="description"
          />
          <div className="flex items-center mt-4">
            <p className="font-semibold text-gray-600 text-lg flex-grow">
              Añade ejercicios
            </p>
            <div
              className="w-8 h-8 rounded-full overflow-hidden bg-purple-600 focus:outline-none focus:appearance-none"
              onClick={openSearch}
            >
              <MdAdd className="h-full w-full object-cover text-white" />
            </div>
          </div>
          <div className="w-full mt-4">
            <ul className="flex-col">
              {rutineState.rutine.exercices.map((exercice) => {
                return (
                  <Item
                    key={exercice.id}
                    exercice={exercice}
                    enableOptions={enableOptions}
                    disableOptions={disableOptions}
                    options={options}
                    removeExercice={removeExercice}
                  />
                );
              })}
            </ul>
          </div>
          {rutineState.rutine.exercices.length > 0 && (
            <div className="flex w-full pt-2 mb-16 justify-center">
              <div
                className="flex items-center justify-center bg-purple-600 p-2 rounded-b w-full"
                onClick={saveRutine}
              >
                <p className="text-white font-medium">Guardar</p>
              </div>
            </div>
          )}
        </form>
      )}

      {rutineState.render.search && <SearchExercices />}
    </motion.div>
  );
}

function Item({
  exercice,
  enableOptions,
  options,
  disableOptions,
  removeExercice,
}) {
  return (
    <motion.li layout className="w-full flex items-center mb-2 h-16">
      <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-300 p-1">
        <GiWeightLiftingUp className="h-full w-full object-cover text-blue-800" />
      </div>
      <p className="font-semibold ml-2 flex-grow">{exercice.name}</p>
      <div
        className="w-8 h-8 rounded-full overflow-hidden bg-white"
        onClick={enableOptions(exercice)}
      >
        <MdExpandMore className="h-full w-full object-cover text-gray-500" />
      </div>
      <AnimatePresence>
        {options.visible && options.id === exercice.id && (
          <Options
            exercice={exercice}
            disableOptions={disableOptions}
            removeExercice={removeExercice}
          />
        )}
      </AnimatePresence>
    </motion.li>
  );
}

function Options({ disableOptions, exercice, removeExercice }) {
  return (
    <motion.div
      layout
      initial={{
        y: -50,
        opacity: 0,
        transition: {
          y: { stiffness: 1000, velocity: -100 },
        },
      }}
      animate={{
        y: 0,
        opacity: 1,
        transition: {
          y: { stiffness: 1000, velocity: -100 },
        },
      }}
      exit={{
        y: 50,
        opacity: 0,
        transition: {
          y: { stiffness: 1000 },
        },
      }}
      className={`absolute bg-gray-200 p-1 rounded inset-0 flex`}
    >
      <div className="flex-grow flex items-center justify-center">
        <div
          className="w-10 h-10 rounded-full overflow-hidden p-1 bg-red-200 ml-5"
          onClick={removeExercice(exercice)}
        >
          <MdDelete className="h-full w-full object-cover text-red-600" />
        </div>
      </div>
      <div>
        <div className="w-8 h-8 rounded-full overflow-hidden bg-white border-2 border-blue-800">
          <MdExpandMore
            className="h-full w-full object-cover text-blue-800"
            onClick={disableOptions(exercice)}
          />
        </div>
      </div>
    </motion.div>
  );
}
