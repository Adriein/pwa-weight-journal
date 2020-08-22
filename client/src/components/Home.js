import React from 'react';
import { ENV } from '../helpers';

import Header from './Header';
import Navigation from './Navigation';
import Carousel from './Carousel';

export default function Home() {
  return (
    <div>
      <Header currentPage={'Inicio'} />
      <div>
        {/* <div className="absolute bg-white opacity-75 flex">
          <p className="font-medium text-lg px-4">
            Bienvenido {localStorage.getItem(ENV.username)}, inicia tu entreno o
            consulta tus estadisticas
          </p>
        </div> */}

        {/* <img src="/api/static/3" alt="home gym" /> */}
        <Carousel />
      </div>
      <Navigation active={'home'} />
    </div>
  );
}
