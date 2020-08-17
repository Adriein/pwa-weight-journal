import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { DispatchContext } from '../context/AuthContext';
import { Redirect } from 'react-router-dom';
import useInputState from '../hooks/useInputState';

import { MdDone, MdMoreVert } from 'react-icons/md';
import Copyright from './Copyright';

const PUBLIC_VAPID_KEY =
  'BAgfqXQf_bBXiPL7azqPUE7Qaaw2CZrLWpny6tTTVKQsMKZuIt7nJTQnMe4-wv0fem6OGZdhU7aXN4D3aws3dEU';

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export default function Login() {
  const dispatch = useContext(DispatchContext);
  const { auth, getToken } = useContext(AuthContext);
  const [remember, setRemember] = useState(false);
  const [value, handleChange, reset] = useInputState({
    username: localStorage.getItem('username') || '',
    password: '',
    remember: false,
  });

  useEffect(() => {
    if (remember && value.username !== '') {
      localStorage.setItem('username', value.username);
    }
  }, [remember, value.username]);

  if (getToken()) {
    return <Redirect to="/logs" />;
  }
  //console.log(Notification.requestPermission());
  const handleSubmit = async (e) => {
    e.preventDefault();
    const serviceWorker = await navigator.serviceWorker.ready;
    if (
      Notification.permission === 'granted' ||
      (await Notification.requestPermission()) === 'granted'
    ) {
      const registration = await serviceWorker.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY),
      });
      try {
        dispatch({
          type: 'LOGIN',
          payload: await axios.post('api/auth/signin', {
            ...value,
            registration,
          }),
        });
        reset();
      } catch (error) {
        dispatch({
          type: 'LOGIN_ERROR',
          error: error.response.data.errors,
        });
      }
    }
  };
  const handleRemember = () => {
    setRemember(!remember);
  };

  const handleMenu = () => {

  }

  return (
    <div className="h-screen flex flex-col justify-start items-center p-4">
      <div className="absolute inset-x-0 top-0 h-64 bg-blue-500 shadow-md">
        <MdMoreVert className="absolute top-0 right-0 w-8 h-8 text-blue-200 mt-3 mr-2" onClick={handleMenu}/>
        <div className="w-10 h-10 bg-white top-0 right-0"></div>
      </div>
      <div className="z-10 flex flex-col items-center m-4">
        <div className="w-20 h-20 rounded-full bg-blue-200">
          <img alt="Logo" className="p-2 object-cover" src="/api/static/1" />
        </div>
        <p className="text-3xl text-white mt-4 font-semibold">WeLog</p>
      </div>
      <form className="z-10 bg-white p-8 rounded-lg shadow-lg mt-3 w-full">
        {localStorage.getItem('username') !== null ? (
          <p className="w-full text-xl text-blue-800 font-normal mb-4">
            {`Bienvenido ${localStorage.getItem('username')}`}
          </p>
        ) : (
          <>
            <p className="text-xl text-blue-800 font-normal mb-4">
              Introduce los datos de acceso
            </p>

            <input
              type="text"
              name="username"
              className="bg-white appearance-none border-2 border-gray-400 rounded p-4 w-full text-black leading-tight focus:outline-none focus:bg-white focus:border-blue-800 text-base mb-4"
              placeholder="Nombre de usuario..."
              onChange={handleChange}
              value={value.username}
            />
          </>
        )}

        <input
          type="password"
          name="password"
          className="bg-white appearance-none border-2 border-gray-400 rounded p-4 w-full text-black leading-tight focus:outline-none focus:bg-white focus:border-blue-800 text-base"
          placeholder="Password"
          onChange={handleChange}
          value={value.password}
        />
        <div className="flex items-center mt-4 mb-4">
          <div
            className={`relative mr-2 h-5 w-5 outline-none appearance-none rounded border-2 border-gray-400 ${
              remember ? 'bg-blue-500 border-blue-800' : ''
            }`}
            id="remember-me"
          />
          <label
            className={`${
              remember
                ? 'text-blue-800 font-normal'
                : 'text-gray-400 font-normal'
            }`}
            htmlFor="remember-me"
          >
            Recuérdame
          </label>
          <div className="absolute">
            <MdDone
              name="remember"
              onClick={handleRemember}
              className={`h-5 w-5 ${remember ? 'text-white' : 'opacity-0'}`}
            />
          </div>
        </div>

        <div className="flex flex-col items-center">
          <button
            className="focus:outline-none focus:appearance-none focus:border-none active:outline-none active:appearance-none active:border-none rounded-full active:rounded-full focus:rounded-full bg-blue-800 w-40 p-2 text-white text-xl font-semibold mt-4 mb-1"
            onClick={handleSubmit}
          >
            Entrar
          </button>
        </div>
      </form>
      <div className="flex items-end flex-grow">
        <Copyright />
      </div>
    </div>
  );
}
