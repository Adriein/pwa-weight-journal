import React, { useRef, useContext, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { traduceCategories } from '../helpers';
import { useHistory } from 'react-router-dom';

import { ExerciceContext } from '../context/ExerciceContext';
import { DispatchContext } from '../context/ExerciceContext';

import SearchBar from './SearchBar';
import Carousel from './Carousel';
import Header from './Header';
import Navigation from './Navigation';

import { MdLayers } from 'react-icons/md';

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

export default function SearchInterface() {
  const ref = useRef();
  const history = useHistory();
  const exercices = useContext(ExerciceContext);
  const exerciceDispatcher = useContext(DispatchContext);

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

  const clickCategory = (event) => {
    history.push('/category');
    exerciceDispatcher({
      type: 'LOADING',
    });
    (async () => {
      exerciceDispatcher({
        type: 'FETCH_CATEGORY',
        payload: {
          category: event.currentTarget.id,
          exercices: (
            await axios.get(`/api/category/${event.currentTarget.id}`)
          ).data,
        },
      });
    })();
  };

  return (
    <div className="h-screen">
      <Header currentPage={'Buscar'} navigation={true} />
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        <div className="w-full p-4">
          {/* <p className="text-xl text-blue-500 mb-5 font-medium">
            Selecciona el ejercicio
          </p> */}
          <p className="text-base text-gray-800 mb-3">Buscar por nombre</p>
          <div className="mb-5">
            <SearchBar />
          </div>
          <p className="text-base text-gray-800 mb-3">Categorias</p>
          {exercices.categories.length > 0 && (
            <Carousel>
              {exercices.categories.map((category) => {
                return (
                  <motion.div
                    className={`bg-gray-300 w-48 mr-5 rounded-md p-2 flex-col`}
                    ref={ref}
                    key={category}
                    id={category}
                    onClick={clickCategory}
                  >
                    {/* <div className="w-12 h-12 rounded-full overflow-hidden">
              <motion.img
                className="h-full w-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
                src={`/api/static/${category}`}
                alt="training"
              />
            </div> */}
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                      <MdLayers className="h-full w-full object-cover text-yellow-600" />
                    </div>
                    <div className="p-1 mt-5">
                      <h4 className="text-sm font-semibold">
                        {traduceCategories(category)}
                      </h4>
                    </div>
                  </motion.div>
                );
              })}
            </Carousel>
          )}
        </div>
      </motion.div>
      <Navigation active={'trainings'} />
    </div>
  );
}
