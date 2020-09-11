import React, { useRef, useEffect, useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { useHistory } from 'react-router-dom';

import Header from './Header';
import Navigation from './Navigation';

import { ExerciceContext } from '../context/ExerciceContext';
import { DispatchContext } from '../context/ExerciceContext';

import axios from 'axios';

import {MdAdd} from 'react-icons/md';

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
  const [value, setValue] = useState('');
  const exercices = useContext(ExerciceContext);
  const exerciceDispatcher = useContext(DispatchContext);
  console.log(from);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    exerciceDispatcher({
      type: 'LOADING',
    });
    (async () => {
      exerciceDispatcher({
        type: 'FETCH_CATEGORIES',
        payload: (await axios.get(`/api/categories`)).data,
      });
    })();
  }, []);

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
            <p className="font-semibold text-gray-500 mb-1 text-lg">
              Nombre del entreno
            </p>
            <input
              id="search-bar"
              className="bg-white appearance-none border-2 border-gray-300 rounded p-1 w-full text-black font-medium leading-tight focus:outline-none focus:bg-white focus:border-blue-800 text-base"
              type="text"
              value={value}
              onChange={handleChange}
              autoComplete="off"
              name="name"
            />
            <p className="font-semibold text-gray-500 mt-4 mb-1 text-lg">
              Descripción
            </p>
            <input
              id="search-bar"
              className="bg-white appearance-none border-2 border-gray-300 rounded p-1 w-full text-black font-medium leading-tight focus:outline-none focus:bg-white focus:border-blue-800 text-base"
              type="text"
              value={value}
              onChange={handleChange}
              autoComplete="off"
              name="name"
            />
            <p className="font-semibold text-gray-500 mb-1 text-lg mt-4 mb-1">
              Añade ejercicios
            </p>
            <ul className="flex w-full">
              <li>
                <button
                  className="w-12 h-12 rounded-full overflow-hidden bg-gray-300 focus:outline-none focus:appearance-none "
                  onClick={() =>
                    history.push('/search')
                  }
                >
                  <MdAdd className="h-full w-full object-cover text-blue-500" />
                </button>
              </li>
            </ul>
          </form>
        </div>
      </motion.div>
      <Navigation active={'trainings'} />
    </div>
  );
}
