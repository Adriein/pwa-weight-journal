export const traduceCategories = (category) => {
    if (category === 'arm') return 'Brazo';
    if (category === 'abdomen') return 'Abdomen';
    if (category === 'back') return 'Espalda';
    if (category === 'chest') return 'Pecho';
    if (category === 'legs') return 'Piernas';
    if (category === 'shoulder') return 'Hombro';
    return 'Cargando...'
  }

  export const beautifyName = (exericesArr) => {
    return exericesArr.map((exercice) => {
      exercice.name = exercice.name
        .split('')
        .map((letter, index) => (index === 0 ? letter.toUpperCase() : letter))
        .join('');
      return exercice;
    });
  };

  export const ENV = {
    username: 'username-welog'
  }

  export const pageVariants = {
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
  
  export const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 1,
  };