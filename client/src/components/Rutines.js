import React, { useContext, useEffect, useState } from 'react';
import { motion, AnimateSharedLayout, AnimatePresence } from 'framer-motion';
import { useHistory } from 'react-router-dom';

import { RutinesContext } from '../context/RutinesContext';
import { RutinesDispatcher } from '../context/RutinesContext';

import { MdImage, MdDelete, MdExpandMore, MdAdd, MdEdit } from 'react-icons/md';

import Header from './Header';
import Navigation from './Navigation';
import RutineForm from './RutineForm';

import useTimeAgo from '../hooks/useTimeAgo';
import axios from 'axios';
import { pageVariants, pageTransition } from '../helpers';

export default function Rutines() {
  const [options, setOptions] = useState({ visible: false, id: undefined });
  const rutineState = useContext(RutinesContext);
  const dispatcher = useContext(RutinesDispatcher);
  const [lastYPos, setLastYPos] = useState(0);
  const [shouldShowActions, setShouldShowActions] = useState(true);
  const history = useHistory();

  useEffect(() => {
    function handleScroll() {
      const yPos = window.scrollY;
      const isScrollingUp = yPos < lastYPos;

      setShouldShowActions(isScrollingUp);
      setLastYPos(yPos);
    }

    window.addEventListener('scroll', handleScroll, false);

    return () => {
      window.removeEventListener('scroll', handleScroll, false);
    };
  }, [lastYPos]);

  useEffect(() => {
    (async () => {
      dispatcher({
        type: 'FETCH_RUTINES',
        payload: (await axios.get('/api/rutines')).data,
      });
    })();
  }, []);

  const setCurrentPage = () => {
    return rutineState.render.default
      ? 'Rutinas'
      : rutineState.render.create
      ? 'Crear Rutina'
      : 'Editar Rutina';
  };

  const createRutine = () => {
    dispatcher({ type: 'SET_CREATE' });
  };

  const enableOptions = (training) => () => {
    setOptions({ visible: true, id: training.id });
  };

  const disableOptions = (rutine) => () => {
    setOptions({ visible: false, id: rutine.id });
  };

  const enableDetails = (rutine) => () => {
    dispatcher({
      type: 'SELECT_RUTINE',
      payload: {
        id: rutine.id,
        name: rutine.name,
        description: rutine.description,
        exercices: rutine.exercices,
      },
    });
    history.push('/logs');
  };

  const navigationLogic = () => {
    if (rutineState.render.create && rutineState.render.search) {
      return {
        visible: true,
        action: () => dispatcher({ type: 'SET_CREATE' }),
      };
    }
    if (rutineState.render.create || rutineState.render.edit) {
      return {
        visible: true,
        action: () => dispatcher({ type: 'SET_DEFAULT' }),
      };
    }
  };

  const onEdit = (rutine) => () => {
    dispatcher({ type: 'SET_EDIT', payload: rutine });
  };

  const onDelete = (rutine) => async () => {
    const result = (await axios.delete(`/api/rutine/${rutine.id}`)).data;
    if (result.length > 0) {
      dispatcher({ type: 'DELETE_RUTINE', payload: rutine.id });
    }
  };
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
        {rutineState.render.default && (
          <div>
            <AnimateSharedLayout>
              <ul className="p-4 h-full mb-20">
                {rutineState.rutines.length < 1 && (
                  <div className="flex items-center justify-center">
                    <p>No hay rutinas</p>
                  </div>
                )}
                {rutineState.rutines.map((rutine) => {
                  return (
                    <Rutine
                      enableOptions={enableOptions}
                      rutine={rutine}
                      disableOptions={disableOptions}
                      enableDetails={enableDetails}
                      options={options}
                      key={rutine.id}
                      onEdit={onEdit}
                      onDelete={onDelete}
                    />
                  );
                })}
              </ul>
            </AnimateSharedLayout>
          </div>
        )}
        {(rutineState.render.create || rutineState.render.edit) && (
          <RutineForm />
        )}
      </motion.div>
      {rutineState.render.default && (
        <div className="flex w-full px-4 py-2 pb-4 justify-end fixed mt-20 z-10 bottom-0 mb-24">
          <motion.div
            initial={{ scale: 0.0 }}
            animate={{
              scale:
                rutineState.render.default && shouldShowActions ? 1.2 : 0.0,
            }}
            transition={pageTransition}
            className="flex items-center bg-purple-600 p-2 rounded-full"
            onClick={createRutine}
          >
            <div className="w-6 h-6 rounded-full overflow-hidden focus:outline-none focus:appearance-none ">
              <MdAdd className="h-full w-full object-cover text-white font-lg" />
            </div>
          </motion.div>
        </div>
      )}
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
  rutine,
  options,
  enableDetails,
  onEdit,
  onDelete,
}) {
  return (
    <motion.li layout className="w-full flex py-4 relative">
      <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-300 p-1">
        <MdImage className="h-full w-full object-cover text-blue-800" />
      </div>
      <div className="w-full" onClick={enableDetails(rutine)}>
        <div className="flex items-center ml-2">
          <p className="font-semibold">{rutine.name}</p>
          <span className="ml-2 mr-2 text-gray-500 text-lg">·</span>
          <TimeAgo timestamp={new Date(rutine.creationDate)} />
        </div>
        <div className="ml-2">{rutine.description}</div>
      </div>
      <div
        className="w-8 h-8 rounded-full overflow-hidden bg-white"
        onClick={enableOptions(rutine)}
      >
        <MdExpandMore className="h-full w-full object-cover text-gray-500" />
      </div>
      <AnimatePresence>
        {options.visible && options.id === rutine.id && (
          <Options
            rutine={rutine}
            disableOptions={disableOptions}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        )}
      </AnimatePresence>
    </motion.li>
  );
}

function Options({ onEdit, onDelete, disableOptions, rutine }) {
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
          onClick={onEdit(rutine)}
        >
          <MdEdit className="h-full w-full object-cover text-blue-800" />
        </div>
        <div
          className="w-10 h-10 rounded-full overflow-hidden p-1 bg-red-200 ml-5"
          onClick={onDelete(rutine)}
        >
          <MdDelete className="h-full w-full object-cover text-red-600" />
        </div>
      </div>
      <div>
        <div
          className="w-8 h-8 rounded-full overflow-hidden bg-white border-2 border-blue-800"
          onClick={disableOptions(rutine)}
        >
          <MdExpandMore className="h-full w-full object-cover text-blue-800" />
        </div>
      </div>
    </motion.div>
  );
}
