import React from 'react';
import { motion } from 'framer-motion';
import { useHistory } from 'react-router-dom';

import { MdHome, MdBookmark, MdHistory, MdAssignment } from 'react-icons/md';

function Button({ id, action, children, active }) {
  return (
    <motion.button
      whileTap={{ scale: 0.8 }}
      id={id}
      className={`focus:outline-none focus:appearance-none focus:border-none active:outline-none active:appearance-none active:border-none p-1 flex-grow items-center justify-center w-40 ${
        active === id
          ? 'text-blue-800 font-medium'
          : 'text-gray-500 font-normal'
      }`}
      onClick={action}
    >
      {children}
    </motion.button>
  );
}

export default function Navigation({ active }) {
  const history = useHistory();
  const navigate = (event) => {
    history.push(`/${event.currentTarget.id}`);
  };

  return (
    <footer className="p-2 flex bg-white fixed bottom-0 w-full shadow-upper h-16">
      {['home', 'logs', 'trainings', 'history'].map((id) => {
        return (
          <Button id={id} action={navigate} key={id} active={active}>
            {id === 'home' && (
              <div>
                <MdHome className="h-5 w-5 inline" />
                <p className="text-sm">Inicio</p>
              </div>
            )}
            {id === 'logs' && (
              <div>
                <MdBookmark className="h-5 w-5 inline" />
                <p className="text-sm">Registros</p>
              </div>
            )}
            {id === 'history' && (
              <div>
                <MdHistory className="h-5 w-5 inline" />
                <p className="text-sm">Historial</p>
              </div>
            )}
            {id === 'trainings' && (
              <div>
                <MdAssignment className="h-5 w-5 inline" />
                <p className="text-sm">Entrenos</p>
              </div>
            )}
          </Button>
        );
      })}
    </footer>
  );
}
