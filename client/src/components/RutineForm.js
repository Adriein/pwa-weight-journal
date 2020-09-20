import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdDelete, MdExpandMore, MdAdd } from 'react-icons/md';
import { GiWeightLiftingUp } from 'react-icons/gi';

import { RutinesContext } from '../context/RutinesContext';
import { ExerciceContext } from '../context/ExerciceContext';
import { RutinesDispatcher } from '../context/RutinesContext';
import SearchExercices from './SearchExercices';

import useInputState from '../hooks/useInputState';
import axios from 'axios';


export default function RutineForm() {
  const rutineState = useContext(RutinesContext);
  const exerciceState = useContext(ExerciceContext);
  const dispatch = useContext(RutinesDispatcher);
  const [options, setOptions] = useState({ visible: false, id: undefined });
  const [value, handleChange] = useInputState({
    name: '',
    description: '',
  });

  const enableOptions = (exercice) => () => {
    setOptions({ visible: true, id: exercice.id });
  };

  const disableOptions = (exercice) => () => {
    setOptions({ visible: false, id: exercice.id });
  };

  const saveTraining = async () => {
    dispatch({type: 'SET_DEFAULT'})
    const rutine = Object.assign({}, value, {
      exercices: [...exerciceState.selected.map((exercice) => exercice.id)],
    });
    await axios.post('api/rutine', rutine);
  };

  const openSearch = () => {
    dispatch({ type: 'SET_SEARCH' });
  };

  return (
    <div className="p-4">
      {!rutineState.state.search && (
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
              {exerciceState.selected.map((exercice) => {
                return (
                  <Item
                    key={exercice.id}
                    exercice={exercice}
                    enableOptions={enableOptions}
                    disableOptions={disableOptions}
                    options={options}
                  />
                );
              })}
            </ul>
          </div>
          {exerciceState.selected.length > 0 && (
            <div className="flex w-full pt-2 mb-16 justify-center">
              <div
                className="flex items-center justify-center bg-purple-600 p-2 rounded-b w-full"
                onClick={saveTraining}
              >
                <p className="text-white font-medium">Guardar</p>
              </div>
            </div>
          )}
        </form>
      )}

      {rutineState.state.search && <SearchExercices />}
    </div>
  );
}

function Item({ exercice, enableOptions, options, disableOptions }) {
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
          <Options exercice={exercice} disableOptions={disableOptions} />
        )}
      </AnimatePresence>
    </motion.li>
  );
}

function Options({ disableOptions, exercice }) {
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
        <div className="w-10 h-10 rounded-full overflow-hidden p-1 bg-red-200 ml-5">
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
