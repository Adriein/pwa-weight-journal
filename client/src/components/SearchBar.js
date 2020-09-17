import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';

import { ExerciceContext } from '../context/ExerciceContext';
import { DispatchContext } from '../context/ExerciceContext';

export default function SearchBar() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');
  const ref = useRef();

  const exercices = useContext(ExerciceContext);
  const exerciceDispatcher = useContext(DispatchContext);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedValue(value);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [value]);

  useEffect(() => {
    if (debouncedValue !== '' && debouncedValue !== undefined) {
      exerciceDispatcher({
        type: 'LOADING',
      });
      setOpen(true);
      (async () => {
        try {
          exerciceDispatcher({
            type: 'FETCH_EXERCICES',
            payload: (await axios.get(`/api/exercices/${debouncedValue}`)).data,
          });
        } catch (error) {
          exerciceDispatcher({
            type: 'FETCH_ERROR',
            payload: error.response.data.errors,
          });
        }
      })();
    }
  }, [debouncedValue]);

  useEffect(() => {
    const closeDropdown = (event) => {
      if (ref.current.contains(event.target)) {
        return;
      }

      setOpen(false);
    };

    document.body.addEventListener('click', closeDropdown);

    return () => {
      document.body.removeEventListener('click', closeDropdown);
    };

  }, []);


  const handleSelect = (exercice) => (event) => {
    exerciceDispatcher({
      type: 'SELECT_EXERCICE',
      payload: exercice,
    });
    setValue('');
    setOpen(false);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div ref={ref} className="relative">
      <input
        id="search-bar"
        className="bg-white appearance-none border-2 border-gray-300 rounded p-2 w-full text-black leading-tight focus:outline-none focus:bg-white focus:border-blue-800 text-base"
        type="text"
        value={value}
        onChange={handleChange}
        autoComplete="off"
        placeholder="Buscar..."
      />
      {open && (
        <div className="absolute z-10 w-full flex flex-col bg-white appearance-none border-r border-b border-l rounded rounded-t-none border-gray-400 shadow-lg p-4 text-black leading-tight text-base mt-1">
          {exercices.exercices.map((exercice) => {
            return (
              <p key={exercice.name} className="p-2" onClick={handleSelect(exercice.id)}>
                {exercice.name}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
}
