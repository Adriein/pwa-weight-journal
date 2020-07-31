import { useState } from 'react';

export default (settings) => {
  const [counter, setCounter] = useState(settings);

  const validatePostiveNumber = (event) => {
    if (event.target.value < 0 || isNaN(event.target.value)) {
      return false;
    }
    return true;
  };

  const onChange = (type) => (event) => {
    if (event.type === 'change') {
      if (!validatePostiveNumber(event)) {
        setCounter(Object.assign({}, counter, { [type]: 0 }));
        return;
      }
      setCounter(Object.assign({}, counter, { [type]: event.target.value }));
    } else {
      if (event.currentTarget.name === 'decrement') {
        if (counter[type] <= 0) return;
        const value = counter[type]--;
        setCounter(Object.assign({ [type]: value }, counter));
      } else {
        const value = counter[type]++;
        setCounter(Object.assign({ [type]: value }, counter));
      }
    }
  };
  const reset = () => {
    setCounter(settings);
  };
  return [counter, onChange, reset];
};
