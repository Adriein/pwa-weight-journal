import React, { useContext, useState } from 'react';
import axios from 'axios';
import { MdKeyboardArrowLeft, MdExitToApp, MdSettings } from 'react-icons/md';

import { AuthContext } from '../context/AuthContext';
import { DispatchContext } from '../context/AuthContext';

export default function Header({ currentPage, navigation, goBack }) {
  const { auth } = useContext(AuthContext);
  const dispatch = useContext(DispatchContext);
  const getFirstLetter = (username) => {
    return username.split('')[0];
  };
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
    <header className="flex items-center p-4 bg-white">
      <div
        className={`fixed z-10 inset-0 bg-black ${
          open
            ? 'transition duration-500 ease-in opacity-50 '
            : 'invisible opacity-0'
        }`}
        onClick={() => setOpen(!open)}
      ></div>
      {navigation && (
        <button className="focus:outline-none focus:appearance-none focus:border-none active:outline-none active:appearance-none outline-none appearance-none w-10 h-10 rounded-full bg-gray-200 mr-5">
          <MdKeyboardArrowLeft className="w-full h-full text-gray-500" />
        </button>
      )}
      <h2 className="flex-grow font-bold text-3xl text-blue-700">
        {currentPage}
      </h2>
      <div className="relative z-20 ">
        <button
          className={`focus:outline-none focus:appearance-none w-12 h-12 rounded-full overflow-hidden border-2 border-gray-400 ${
            open &&
            'outline-none border-3 border-blue-100 focus:outline-none focus:appearance-none'
          }`}
          onClick={() => setOpen(!open)}
        >
          <img
            alt="Logo"
            className="h-full w-full object-cover"
            src="/api/static/2"
          />
        </button>
        {open && (
          <div className="absolute z-20 rounded-lg right-0 p-1 bg-gray-200 p-1">
            <button className="w-full p-2 flex items-center focus:outline-none focus:appearance-none active:bg-white">
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
