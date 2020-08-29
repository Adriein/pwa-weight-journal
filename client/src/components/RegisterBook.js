import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';

import useInputState from '../hooks/useInputState';
import useCounter from '../hooks/useCounter';
import { ExerciceContext } from '../context/ExerciceContext';
import { DispatchContext } from '../context/ExerciceContext';

import { MdClass, MdAdd } from 'react-icons/md';

import Navigation from './Navigation';
import SearchInterface from './SearchInterface';
import Header from './Header';

export default function RegisterBook() {
  const exercices = useContext(ExerciceContext);
  const exerciceDispatcher = useContext(DispatchContext);
  const [openSelector, setOpenSelector] = useState(false);
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

  return (
    <div>
      <Header currentPage={'Entreno'} />

      <div className="px-4 flex justify-center">
        {!exercices.training.isStarted && (
          <button
            className="focus:outline-none focus:appearance-none focus:border-none active:outline-none active:appearance-none active:border-none rounded-full active:rounded-full focus:rounded-full bg-blue-800 w-40 p-2 text-white text-xl font-semibold mt-4 mb-1"
            onClick={() =>
              exerciceDispatcher({
                type: 'START_TRAINING',
              })
            }
          >
            Iniciar Entreno
          </button>
        )}
        {openSelector && <SearchInterface />}
        {exercices.training.isStarted && !openSelector && (
          <div className="w-full bg-gray-200 border border-gray-300 rounded-md">
            <div className="w-full bg-blue-500 flex items-center p-2 rounded-t-md">
              <h4 className="text-blue-100 text-lg font-semibold flex-grow">
                Entrenamiento
              </h4>
              <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 p-1">
                <MdClass className="h-full w-full object-cover text-blue-800" />
              </div>
            </div>
            <div className="p-1 flex-col items-center">
              {exercices.training.exercices.length === 0 ? (
                <p>Empieza añadiendo ejercicios</p>
              ) : (
                exercices.training.exercices.map((exercice) => (
                  <div className="bg-blue-200 border border-gray-300 rounded-md flex p-1 h-8">
                    <p>{exercice.name}</p>
                    <input className="w-8 ml-2 mr-2" type="text"/>
                    <p>x</p>
                    <input className="w-8 ml-2 mr-2" type="text"/>
                    <p>a</p>
                    <input className="w-8 ml-2 mr-2" type="text"/>
                    <p>Kg</p>
                  </div>
                ))
              )}
              <div className="flex justify-center mt-5">
                <button
                  className="focus:outline-none focus:appearance-none focus:border-none active:outline-none active:appearance-none active:border-none rounded-full active:rounded-full focus:rounded-full bg-blue-800 p-2 text-white text-xl font-semibold mr-5"
                  onClick={() => setOpenSelector(!openSelector)}
                >
                  <MdAdd className="h-full w-full object-cover" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Navigation active={'logs'} />
    </div>
  );
}
