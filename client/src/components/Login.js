import React, { useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { DispatchContext } from '../context/AuthContext';
import { Redirect } from 'react-router-dom';
import useInputState from '../hooks/useInputState';

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

export default function Login(props) {
  const dispatch = useContext(DispatchContext);
  const { auth, getToken } = useContext(AuthContext);
  const [value, handleChange, reset] = useInputState({
    username: '',
    password: '',
    remember: false,
  });

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

  return (
    <div className="h-screen flex flex-col justify-start items-center p-4">
      <div className="absolute inset-x-0 top-0 h-64 bg-blue-500 shadow-md"></div>
      <div className="z-10 flex flex-col items-center m-4">
        <div className="w-20 h-20 rounded-full bg-blue-200">
          <img className="p-1 object-cover" src="/api/static/1" />
        </div>
        <p className="text-3xl text-white">WeLog</p>
      </div>
      <form className="z-10 bg-white p-4 rounded-lg shadow-lg">
        <p className="text-xl text-blue-800 font-semibold mb-4">
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
        <input
          type="password"
          name="password"
          className="bg-white appearance-none border-2 border-gray-400 rounded p-4 w-full text-black leading-tight focus:outline-none focus:bg-white focus:border-blue-800 text-base"
          placeholder="Password"
          onChange={handleChange}
          value={value.password}
        />
        <div className="flex items-center mt-4 mb-4">
          <input
            className="mr-2 h-4 w-4  appearance-none rounded border-2 border-gray-400 checked:outline-none checked:bg-blue-500 checked:border-blue-800"
            id="remember-me"
            type="checkbox"
          />
          <label className="text-gray-400 font-normal" for="remember-me">
            Recuerdame
          </label>
        </div>

        <div className="flex flex-col items-center">
          <button className="appearance-none rounded-full bg-blue-800 w-40 p-2 text-white text-xl font-semibold mt-4 mb-1" onClick={handleSubmit}>
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
