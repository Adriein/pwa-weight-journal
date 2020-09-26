import React, { useContext, useState } from 'react';
import { traduceCategories, beautifyName } from '../helpers';
import { ExerciceContext } from '../context/ExerciceContext';
import { DispatchContext } from '../context/ExerciceContext';
import { RutinesDispatcher } from '../context/RutinesContext';
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';

import { MdLabel, MdLabelOutline } from 'react-icons/md';

export default function CategoryExercices() {
  const exercices = useContext(ExerciceContext);
  const exerciceDispatcher = useContext(DispatchContext);
  const rutineDispatcher = useContext(RutinesDispatcher);
  const history = useHistory();
  const [selected, setSelected] = useState([]);

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

  const selectExercice = (exercice) => () => {
    const existing = selected.find((item) => item.id === exercice.id);
    if (existing) {
      selected.splice(selected.indexOf(existing), 1);
      setSelected([...selected]);
      return;
    }

    setSelected([...selected, exercice]);
  };

  const showLabel = (id) => {
    if (selected.find((item) => item.id === id)) {
      return <MdLabel className="h-6 w-6 text-blue-800" />;
    }

    return <MdLabelOutline className="h-6 w-6 text-blue-800" />;
  };

  const setTraining = () => {
    rutineDispatcher({
      type: 'ADD_EXERCICE',
      payload: selected,
    });
  };

  return (
    <div>
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="mb-16"
      >
        <ul className="px-1 mb-5">
          {exercices.exercicesByCategory.exercices.map((exercice) => {
            const [beautifiedExercice] = beautifyName([exercice]);
            return (
              <li
                className="flex items-center py-2"
                key={exercice.name}
                onClick={selectExercice(exercice)}
              >
                <div className="mr-5">{showLabel(exercice.id)}</div>
                <p className="flex-grow text-lg font-medium">
                  {beautifiedExercice.name}
                </p>
              </li>
            );
          })}
        </ul>
        {selected.length > 0 && (
          <div className="flex w-full justify-center">
            <div
              className="flex items-center justify-center bg-blue-600 p-2 rounded-b w-full"
              onClick={setTraining}
            >
              <p className="text-white font-medium">Añadir</p>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
