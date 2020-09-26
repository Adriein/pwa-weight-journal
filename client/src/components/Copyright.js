import React from 'react';
import {version} from '../../package.json';

export default function Copyright() {
  return (
    <div className="flex-col text-center">
      <p className="font-medium text-gray-500">
        {'Made with '}
        <span role="img" aria-label="icon heart">
          ❤️
        </span>
        {' by Adria Claret'}
        {'.'}
      </p>
      <p className="font-medium text-gray-500">{`v.${version}`}</p>
    </div>
  );
}
