import React, { useContext, useEffect, useState } from 'react';
import { motion, AnimateSharedLayout, AnimatePresence } from 'framer-motion';

import { RutinesContext } from '../context/RutinesContext';
import { RutinesDispatcher } from '../context/RutinesContext';

import { MdImage, MdDelete, MdExpandMore, MdAdd, MdEdit } from 'react-icons/md';

import Header from './Header';
import Navigation from './Navigation';
import RutineForm from './RutineForm';

import useTimeAgo from '../hooks/useTimeAgo';
import axios from 'axios';

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
];

export default function Rutines() {
  const [options, setOptions] = useState({ visible: false, id: undefined });
  const rutineState = useContext(RutinesContext);
  const dispatcher = useContext(RutinesDispatcher);
  useEffect(() => {
    // dispatcher({ action: 'LOADING' });
    (async () => {
      dispatcher({
        type: 'FETCH_RUTINES',
        payload: (await axios.get('/api/rutines')).data,
      });
    })();
  }, []);

  const setCurrentPage = () => {
    return rutineState.state.default
      ? 'Rutinas'
      : rutineState.state.create
      ? 'Crear Rutina'
      : 'Editar Rutina';
  };

  const createRutine = () => {
    dispatcher({ type: 'SET_CREATE' });
  };

  const enableOptions = (training) => () => {
    setOptions({ visible: true, id: training.id });
  };

  const disableOptions = (training) => () => {
    setOptions({ visible: false, id: training.id });
  };

  const enableDetails = (training) => (event) => {
    console.log(training);
  };

  const navigationLogic = () => {
    if (rutineState.state.create && rutineState.state.search) {
      return {
        visible: true,
        action: () => dispatcher({ type: 'SET_CREATE' }),
      };
    }
    if (rutineState.state.create) {
      return {
        visible: true,
        action: () => dispatcher({ type: 'SET_DEFAULT' }),
      };
    }
  };

  console.log(rutineState);

  return (
    <div className="h-screen">
      <Header currentPage={setCurrentPage()} navigation={navigationLogic()} />
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        {rutineState.state.default && (
          <div>
            <div className="flex w-full px-4 pt-2 justify-center">
              <div
                className="flex items-center bg-purple-600 p-2 rounded-lg"
                onClick={createRutine}
              >
                <div className="w-5 h-5 rounded-full overflow-hidden bg-white focus:outline-none focus:appearance-none ">
                  <MdAdd className="h-full w-full object-cover text-purple-700 font-medium" />
                </div>
                <p className="text-white font-medium ml-2">Crea un entreno</p>
              </div>
            </div>

            <AnimateSharedLayout>
              <ul className="p-4 h-full mb-16">
                {rutineState.rutines.map((training) => {
                  return (
                    <Rutine
                      enableOptions={enableOptions}
                      training={training}
                      disableOptions={disableOptions}
                      enableDetails={enableDetails}
                      options={options}
                      key={training.id}
                    />
                  );
                })}
              </ul>
            </AnimateSharedLayout>
          </div>
        )}
        {rutineState.state.create && <RutineForm />}
      </motion.div>
      <Navigation active={'trainings'} />
    </div>
  );
}

function TimeAgo({ timestamp }) {
  const formatedTime = useTimeAgo(timestamp);
  return <p className="text-gray-500">{formatedTime}</p>;
}

function Rutine({
  enableOptions,
  disableOptions,
  training,
  options,
  enableDetails,
}) {
  return (
    <motion.li layout className="w-full flex py-4 relative">
      <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-300 p-1">
        <MdImage className="h-full w-full object-cover text-blue-800" />
      </div>
      <div className="w-full" onClick={enableDetails(training)}>
        <div className="flex items-center ml-2">
          <p className="font-semibold">{training.name}</p>
          <span className="ml-2 mr-2 text-gray-500 text-lg">·</span>
          <TimeAgo timestamp={new Date(training.creationDate)} />
        </div>
        <div className="ml-2">{training.description}</div>
      </div>
      <div
        className="w-8 h-8 rounded-full overflow-hidden bg-white"
        onClick={enableOptions(training)}
      >
        <MdExpandMore className="h-full w-full object-cover text-gray-500" />
      </div>
      <AnimatePresence>
        {options.visible && options.id === training.id && (
          <Options
            enableOptions={enableOptions}
            training={training}
            disableOptions={disableOptions}
          />
        )}
      </AnimatePresence>
    </motion.li>
  );
}

function Options({ enableOptions, disableOptions, training }) {
  return (
    <motion.div
      layout
      initial={{
        y: -50,
        opacity: 0,
        transition: {
          y: { stiffness: 1000, velocity: -100 },
        },
      }}
      animate={{
        y: 0,
        opacity: 1,
        transition: {
          y: { stiffness: 1000, velocity: -100 },
        },
      }}
      exit={{
        y: 50,
        opacity: 0,
        transition: {
          y: { stiffness: 1000 },
        },
      }}
      className={`absolute bg-gray-200 p-1 rounded inset-0 flex`}
    >
      <div className="flex-grow flex items-center justify-center">
        <div
          className="w-10 h-10 rounded-full overflow-hidden p-1  bg-gray-200 mr-5"
          onClick={enableOptions(training)}
        >
          <MdEdit className="h-full w-full object-cover text-blue-800" />
        </div>
        <div
          className="w-10 h-10 rounded-full overflow-hidden p-1 bg-red-200 ml-5"
          onClick={enableOptions(training)}
        >
          <MdDelete className="h-full w-full object-cover text-red-600" />
        </div>
      </div>
      <div>
        <div
          className="w-8 h-8 rounded-full overflow-hidden bg-white border-2 border-blue-800"
          onClick={disableOptions(training)}
        >
          <MdExpandMore className="h-full w-full object-cover text-blue-800" />
        </div>
      </div>
    </motion.div>
  );
}
