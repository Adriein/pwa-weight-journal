import React, { useContext, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { MdKeyboardArrowLeft, MdExitToApp, MdSettings } from 'react-icons/md';
import { useHistory } from 'react-router-dom';

import { DispatchContext } from '../context/AuthContext';

export default function Header({ currentPage, navigation = {} }) {
  const dispatch = useContext(DispatchContext);
  const history = useHistory();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await axios.post('api/auth/signout');
      dispatch({
        type: 'LOGOUT',
        response,
      });
    } catch (error) {
      dispatch({
        type: 'LOGOUT_ERROR',
        error: error.response.data.errors,
      });
    }
  };

  return (
    <header className="flex items-center px-4 py-2 bg-white overflow-x-hidden overflow-y-visible">
      <div
        className={`fixed z-10 inset-0 bg-black ${
          open
            ? 'transition duration-500 ease-in opacity-50 '
            : 'invisible opacity-0'
        }`}
        onClick={() => setOpen(!open)}
      ></div>
      {navigation.visible && (
        <div className="focus:outline-none focus:appearance-none focus:border-none active:outline-none active:appearance-none outline-none appearance-none w-10 h-10 rounded-full bg-gray-200 mr-5">
          <MdKeyboardArrowLeft
            className="w-full h-full text-gray-500"
            onClick={navigation.action}
          />
        </div>
      )}
      <motion.h2
        initial={{ x: '-100vw' }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5, type: 'tween' }}
        className="flex-grow font-bold text-3xl text-blue-700"
      >
        {currentPage}
      </motion.h2>
      <div className="z-20 ">
        <motion.button
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5, type: 'tween' }}
          whileTap={{ scale: 0.8 }}
          className={`focus:outline-none focus:appearance-none w-12 h-12 rounded-full overflow-hidden border-2 border-gray-400 ${
            open &&
            'outline-none border-3 border-blue-100 focus:outline-none focus:appearance-none'
          }`}
          onClick={() => setOpen(!open)}
        >
          <img
            alt="Profile Pic"
            className="h-full w-full object-cover"
            src="/api/static/profile"
          />
        </motion.button>
        {open && (
          <div className="absolute z-20 rounded-lg right-0 p-1 bg-gray-200 p-1 mr-4">
            <button className="outline-none w-full p-2 flex items-center focus:outline-none focus:appearance-none active:bg-white">
              <p className="text-base">Perfil</p>
              <MdSettings className="ml-2" />
            </button>
            <button
              className="w-full p-2 flex items-center focus:outline-none focus:appearance-none"
              onClick={handleLogout}
            >
              <p className="text-base">Salir</p>
              <MdExitToApp className="ml-2" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
