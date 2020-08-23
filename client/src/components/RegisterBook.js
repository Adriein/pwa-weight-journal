import React, { useContext, useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { traduceCategories } from '../helpers';
import { useHistory } from 'react-router-dom';

import useInputState from '../hooks/useInputState';
import useCounter from '../hooks/useCounter';
import { ExerciceContext } from '../context/ExerciceContext';
import { DispatchContext } from '../context/ExerciceContext';

import 'date-fns';
import { MdSettings } from 'react-icons/md';

import Navigation from './Navigation';
import SearchBar from './SearchBar';
import Carousel from './Carousel';
import Header from './Header';

export default function RegisterBook() {
  // const history = useHistory();
  const exercices = useContext(ExerciceContext);
  const exerciceDispatcher = useContext(DispatchContext);
  // const [value, , , setValue] = useInputState({
  //   date: new Date(),
  // });

  // const handleDateChange = (date) => {
  //   setValue(Object.assign({}, value, { date }));
  // };

  // const [counter, modifyCounter, reset] = useCounter({
  //   series: 0,
  //   reps: 0,
  //   kg: 0,
  // });

  // const discard = () => {
  //   setValue(Object.assign({}, value, { date: new Date() }));
  //   reset();
  //   exerciceDispatcher({ type: 'DISCARD_SELECTION' });
  // };

  // const saveLog = async () => {
  //   const response = await axios.post(
  //     '/api/log',
  //     Object.assign(
  //       {},
  //       value,
  //       { stats: counter },
  //       { exerciceId: exercices.selected.id }
  //     )
  //   );
  //   console.log(response);
  //   exerciceDispatcher({ type: 'DISCARD_SELECTION' });
  // };

  // const handleRedirect = () => {
  //   history.push('/create-exercice');
  // };

  useEffect(() => {
    (async () => {
      exerciceDispatcher({
        type: 'FETCH_CATEGORIES',
        payload: (await axios.get('/api/categories')).data,
      });
    })();
  }, []);

  // const clickCategory = (event) => {
  //   history.push('/category');
  //   exerciceDispatcher({
  //     type: 'LOADING',
  //   });
  //   (async () => {
  //     exerciceDispatcher({
  //       type: 'FETCH_CATEGORY',
  //       payload: {
  //         category: event.currentTarget.id,
  //         exercices: (
  //           await axios.get(`/api/category/${event.currentTarget.id}`)
  //         ).data,
  //       },
  //     });
  //   })();
  // };
  const [isStarted, setStarted] = useState(false);
  const targetRef = useRef();

  return (
    <div>
      <Header currentPage={'Entreno'} />

      <div className="px-4 flex justify-center">
        {!isStarted && (
          <button
            className="focus:outline-none focus:appearance-none focus:border-none active:outline-none active:appearance-none active:border-none rounded-full active:rounded-full focus:rounded-full bg-blue-800 w-40 p-2 text-white text-xl font-semibold mt-4 mb-1"
            onClick={() => setStarted(!isStarted)}
          >
            Iniciar Entreno
          </button>
        )}
        {isStarted && !exercices.selected && (
          <div className="w-full">
            <p className="text-xl text-blue-500 mb-3 font-medium">
              Selecciona el ejercicio
            </p>
            <p className="text-base text-gray-800 mb-3">Buscar por nombre</p>
            <div className="mb-3">
              <SearchBar />
            </div>
            <p className="text-base text-gray-800 mb-3">Categorias</p>
            <Carousel>
              {exercices.categories.map((category) => {
                return (
                  <motion.div
                    className={`bg-gray-300 w-48 mr-5 rounded-md p-2 flex-col`}
                    ref={targetRef}
                    key={category}
                  >
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <motion.img
                        className="h-full w-full object-cover"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 2 }}
                        src={`/api/static/${category}`}
                        alt="training"
                      />
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
          </div>
        )}
        {exercices.selected && (
          <div className="w-full">
            <div>

            </div>
          </div>
        )}
      </div>

      <Navigation active={'logs'} />
    </div>
  );
}
