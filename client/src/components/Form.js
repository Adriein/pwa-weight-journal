import React, { useRef, useEffect, useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { useHistory } from 'react-router-dom';
import { MdSave, MdExpandMore, MdAdd } from 'react-icons/md';
import { GiWeightLiftingUp } from 'react-icons/gi';

import Header from './Header';
import Navigation from './Navigation';

import { ExerciceContext } from '../context/ExerciceContext';
import { DispatchContext } from '../context/ExerciceContext';

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

export default function Form() {
  const history = useHistory();
  const [from] = useState(history.location.state.from);
  const [value, setValue] = useState('');
  const exercices = useContext(ExerciceContext);
  const exerciceDispatcher = useContext(DispatchContext);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className="h-screen">
      <Header currentPage={'Crear entreno'} navigation={true} />
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="mb-16"
      >
        <div className="p-4">
          <form action="">
            <p className="font-semibold text-gray-500 mb-1 text-lg">
              Nombre del entreno
            </p>
            <input
              id="search-bar"
              className="bg-white appearance-none border-2 border-gray-300 rounded p-1 w-full text-black font-medium leading-tight focus:outline-none focus:bg-white focus:border-blue-800 text-base"
              type="text"
              value={value}
              onChange={handleChange}
              autoComplete="off"
              name="name"
            />
            <p className="font-semibold text-gray-500 mt-4 mb-1 text-lg">
              Descripción
            </p>
            <input
              id="search-bar"
              className="bg-white appearance-none border-2 border-gray-300 rounded p-1 w-full text-black font-medium leading-tight focus:outline-none focus:bg-white focus:border-blue-800 text-base"
              type="text"
              value={value}
              onChange={handleChange}
              autoComplete="off"
              name="name"
            />
            <div className="flex items-center mt-4">
              <p className="font-semibold text-gray-500 text-lg flex-grow">
                Añade ejercicios
              </p>
              <div
                className="w-8 h-8 rounded-full overflow-hidden bg-purple-600 focus:outline-none focus:appearance-none"
                onClick={() => history.push('/search')}
              >
                <MdAdd className="h-full w-full object-cover text-white" />
              </div>
            </div>
            <div className="w-full mt-4">
              <ul className="flex-col">
                {exercices.selected.map((exercice) => {
                  return <Item key={exercice.id} exercice={exercice} />;
                })}
              </ul>
            </div>
            {exercices.selected.length > 0 && (
              <div className="flex w-full pt-2 justify-center">
                <div
                  className="flex items-center justify-center bg-purple-600 p-2 rounded-b w-full"
                  onClick={() =>
                    history.push('/form', { from: history.location.pathname })
                  }
                >
                  <p className="text-white font-medium">Guardar</p>
                </div>
              </div>
            )}
          </form>
        </div>
      </motion.div>
      <Navigation active={'trainings'} />
    </div>
  );
}

function Item({ exercice }) {
  return (
    <motion.li layout className="w-full flex items-center mb-2 h-16">
      <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-300 p-1">
        <GiWeightLiftingUp className="h-full w-full object-cover text-blue-800" />
      </div>
      <p className="font-semibold ml-2 flex-grow">{exercice.name}</p>
      <div className="w-8 h-8 rounded-full overflow-hidden bg-white">
        <MdExpandMore className="h-full w-full object-cover text-gray-500" />
      </div>
      {/* <AnimatePresence>
        {options.visible && options.id === training.id && (
          <Options
            enableOptions={enableOptions}
            training={training}
            disableOptions={disableOptions}
          />
        )}
      </AnimatePresence> */}
    </motion.li>
  );
}

// function Options({ enableOptions, disableOptions, training }) {
//   return (
//     <motion.div
//       layout
//       initial={{
//         y: -50,
//         opacity: 0,
//         transition: {
//           y: { stiffness: 1000, velocity: -100 },
//         },
//       }}
//       animate={{
//         y: 0,
//         opacity: 1,
//         transition: {
//           y: { stiffness: 1000, velocity: -100 },
//         },
//       }}
//       exit={{
//         y: 50,
//         opacity: 0,
//         transition: {
//           y: { stiffness: 1000 },
//         },
//       }}
//       className={`absolute bg-gray-200 p-1 rounded inset-0 flex`}
//     >
//       <div className="flex-grow flex items-center justify-center">
//         <div
//           className="w-10 h-10 rounded-full overflow-hidden p-1  bg-gray-200 mr-5"
//           onClick={enableOptions(training)}
//         >
//           <MdEdit className="h-full w-full object-cover text-blue-800" />
//         </div>
//         <div
//           className="w-10 h-10 rounded-full overflow-hidden p-1 bg-red-200 ml-5"
//           onClick={enableOptions(training)}
//         >
//           <MdDelete className="h-full w-full object-cover text-red-600" />
//         </div>
//       </div>
//       <div>
//         <div
//           className="w-8 h-8 rounded-full overflow-hidden bg-white border-2 border-blue-800"
//           onClick={disableOptions(training)}
//         >
//           <MdExpandMore className="h-full w-full object-cover text-blue-800" />
//         </div>
//       </div>
//     </motion.div>
//   );
// }
