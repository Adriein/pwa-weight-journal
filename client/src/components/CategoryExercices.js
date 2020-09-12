import React, { useContext, useState } from 'react';
import { traduceCategories, beautifyName } from '../helpers';
import { ExerciceContext } from '../context/ExerciceContext';
import { DispatchContext } from '../context/ExerciceContext';
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';

import { MdLabel, MdLabelOutline } from 'react-icons/md';
import Header from './Header';
import Navigation from './Navigation';

export default function CategoryExercices() {
  const exercices = useContext(ExerciceContext);
  const exerciceDispatcher = useContext(DispatchContext);
  const history = useHistory();
  const [selected, setSelected] = useState([]);

  const itemVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 },
      },
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 },
      },
    },
  };

  const variants = {
    open: {
      transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
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
    history.push('/form', { from: '/category' });
    exerciceDispatcher({
      type: 'SELECT_EXERCICE',
      payload: selected,
    });
  };

  return (
    <div>
      <Header
        currentPage={traduceCategories(exercices.exercicesByCategory.category)}
        navigation={true}
      />
      <motion.div animate={exercices.loading ? 'closed' : 'open'} layout>
        <motion.ul variants={variants} className="p-5">
          {exercices.exercicesByCategory.exercices.map((exercice) => {
            const [beautifiedExercice] = beautifyName([exercice]);
            return (
              <motion.li
                variants={itemVariants}
                className="flex items-center py-2"
                key={exercice.name}
                onClick={selectExercice(exercice)}
              >
                <div className="mr-5">{showLabel(exercice.id)}</div>
                <p className="flex-grow text-lg font-medium">
                  {beautifiedExercice.name}
                </p>
              </motion.li>
            );
          })}
        </motion.ul>
        {selected.length > 0 && <button onClick={setTraining}>Añadir</button>}
      </motion.div>
      <Navigation active={'trainings'} />
    </div>
  );
}
