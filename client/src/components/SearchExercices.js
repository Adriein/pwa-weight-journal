import React, { useRef, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { traduceCategories } from '../helpers';

import { ExerciceContext } from '../context/ExerciceContext';
import { DispatchContext } from '../context/ExerciceContext';

import SearchBar from './SearchBar';
import Carousel from './Carousel';

import { MdLayers } from 'react-icons/md';
import CategoryExercices from './CategoryExercices';
import { pageVariants, pageTransition } from '../helpers';

export default function SearchExercices() {
  const ref = useRef();
  const exercices = useContext(ExerciceContext);
  const exerciceDispatcher = useContext(DispatchContext);
  const [category, setCategory] = useState(false);

  useEffect(() => {
    exerciceDispatcher({
      type: 'LOADING',
    });
    (async () => {
      exerciceDispatcher({
        type: 'FETCH_CATEGORIES',
        payload: [
          (await axios.get(`/api/categories`)).data,
          (await axios.get(`/api/exercices`)).data,
        ],
      });
    })();
  }, []);

  const clickCategory = (event) => {
    setCategory(true);
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
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="w-full"
    >
      {!category && (
        <section>
          <p className="text-base text-gray-600 font-medium mb-3">
            Buscar por nombre
          </p>
          <div className="mb-5">
            <SearchBar />
          </div>
          <p className="text-base text-gray-600 font-medium mb-3">Categorias</p>
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
        </section>
      )}
      {category && (
        <section>
          <CategoryExercices />
        </section>
      )}
    </motion.div>
  );
}
