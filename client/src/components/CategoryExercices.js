import React, { useContext } from 'react';
import { traduceCategories, beautifyName } from '../helpers';
import { ExerciceContext } from '../context/ExerciceContext';
import { DispatchContext } from '../context/ExerciceContext';
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';

import { MdLabel } from 'react-icons/md';
import Header from './Header';
import Navigation from './Navigation';


export default function CategoryExercices() {
  const exercices = useContext(ExerciceContext);
  const exerciceDispatcher = useContext(DispatchContext);
  const history = useHistory();

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
    history.push('/training');
    exerciceDispatcher({
      type: 'SELECT_EXERCICE',
      payload: exercice,
    });
  };

  const goBack = () => {
    history.push('/training');
  };

  return (
    <div>
      <Header
        currentPage={traduceCategories(exercices.exercicesByCategory.category)}
        navigation={true}
        goBack={goBack}
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
                <div className="mr-5">
                  <MdLabel className="h-6 w-6 text-blue-800" />
                </div>
                <p className="flex-grow text-lg font-medium">
                  {beautifiedExercice.name}
                </p>
              </motion.li>
            );
          })}
        </motion.ul>
      </motion.div>
      <Navigation active={'logs'} />
    </div>
  );
}
