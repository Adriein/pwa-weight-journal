import React, { useRef, useEffect, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { useHistory } from 'react-router-dom';

import { MdImage, MdLens, MdExpandMore } from 'react-icons/md';

import Header from './Header';
import Navigation from './Navigation';

import useTimeAgo from '../hooks/useTimeAgo';

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

const trainings = [
  {
    id: 1,
    date: new Date('September 04, 2020 15:24:00').getTime(),
    name: 'Pierna',
    stats: [],
    owner: 2,
  },
  {
    id: 2,
    date: new Date('September 05, 2020 17:00:00').getTime(),
    name: 'Pecho',
    stats: [],
    owner: 2,
  },
  {
    id: 3,
    date: new Date('September 05, 2020 15:24:00').getTime(),
    name: 'Pecho',
    stats: [],
    owner: 2,
  },
  {
    id: 4,
    date: new Date('September 05, 2020 15:24:00').getTime(),
    name: 'Pecho',
    stats: [],
    owner: 2,
  },
  {
    id: 5,
    date: new Date('September 05, 2020 15:24:00').getTime(),
    name: 'Pecho',
    stats: [],
    owner: 2,
  },
  {
    id: 6,
    date: new Date('September 05, 2020 15:24:00').getTime(),
    name: 'Pecho',
    stats: [],
    owner: 2,
  },
  {
    id: 7,
    date: new Date('September 05, 2020 17:07:00').getTime(),
    name: 'Pecho',
    stats: [],
    owner: 2,
  },
  {
    id: 8,
    date: new Date('September 05, 2020 15:24:00').getTime(),
    name: 'Pecho',
    stats: [],
    owner: 2,
  },
  {
    id: 9,
    date: new Date('September 05, 2020 15:24:00').getTime(),
    name: 'Pecho',
    stats: [],
    owner: 2,
  },
];

export default function Trainings() {
  const history = useHistory();
  const targetRef = useRef();
  useEffect(() => {
    console.log('fetch of trainings');
  }, []);

  
  const enableOptions = (training) => (event) => {
    console.log(training);
  };

  const enableDetails = (training) => (event) => {
    console.log(training);
  };

  return (
    <div className="h-screen">
      <Header currentPage={'Entrenos'} />
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="relative"
      >
        <div className="p-4 h-full mb-16">
          {trainings.map((training) => {
            return (
              <div className="w-full flex py-4" key={training.id}>
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-300 p-1">
                  <MdImage className="h-full w-full object-cover text-blue-800" />
                </div>
                <div className="w-full" onClick={enableDetails(training)}>
                  <div className="flex items-center ml-2">
                    <p className="font-semibold">{training.name}</p>
                    <span className="ml-2 mr-2 text-gray-500 text-lg"> · </span>
                    <TimeAgo timestamp={training.date} />
                  </div>
                  <div className="ml-2">descripcion</div>
                </div>
                <div
                  className="w-6 h-6 rounded-full overflow-hidden bg-white"
                  onClick={enableOptions(training)}
                >
                  <MdExpandMore className="h-full w-full object-cover text-blue-800" />
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
      <Navigation active={'trainings'} />
    </div>
  );
}

function TimeAgo({ timestamp }) {
  const formatedTime = useTimeAgo(timestamp);
  return <p className="text-gray-500">{formatedTime}</p>;
}
