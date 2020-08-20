import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { MdHome, MdBookmark, MdHistory } from 'react-icons/md';

export default function Navigation({ settings }) {
  const history = useHistory();

  return (
    <footer className="p-2 flex bg-white absolute bottom-0 w-full shadow-inner">
      <button className="p-1 flex-grow flex-column items-center justify-center w-40">
        <MdHome className="h-5 w-5 inline" />
        <p className="text-sm">Inicio</p>
      </button>
      <button className="p-1 flex-grow flex-column items-center w-40">
        <MdBookmark className="h-5 w-5 inline" />
        <p className="text-sm">Registros</p>
      </button>
      <button className="p-1 flex-grow flex-column items-center w-40">
        <div>
          <MdHistory className="h-5 w-5 inline" />
        </div>
        <p className="text-sm">Historial</p>
      </button>
    </footer>
  );
}
