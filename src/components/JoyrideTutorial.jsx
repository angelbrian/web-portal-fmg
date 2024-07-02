// src/components/JoyrideTutorial.jsx
import React, { useState, useEffect } from 'react';
import Joyride from 'react-joyride';

const steps = [
  {
    target: '.my-first-step',
    content: 'De click para ver el desglose por agrupación.',
    disableBeacon: true, // Asegura que el tooltip se muestre inmediatamente
    spotlightClicks: true, // Permite los clics en el elemento resaltado
  },
  {
    target: '.my-other-step',
    content: 'De click para ver el desglose por empresa del tipo de agrupación.',
    disableBeacon: true,
    spotlightClicks: true,
  },
  // Añade más pasos según sea necesario
];

const JoyrideTutorial = ({ run, onClose }) => {
  const [tour, setTour] = useState({
    run: run,
    steps: steps,
    stepIndex: 0,
  });

  useEffect(() => {
    setTour((prev) => ({ ...prev, run: run }));
  }, [run]);

  const handleJoyrideCallback = (data) => {
    const { action, index, status, type } = data;

    if (status === 'finished' || status === 'skipped') {
      localStorage.setItem('tour', true);
      onClose();
    } else if (type === 'step:after' && action === 'next') {
      // Mueve al siguiente paso cuando se hace clic en el elemento resaltado
      setTour((prev) => ({ ...prev, stepIndex: index + 1 }));
    }
  };

  return (
    <Joyride
      steps={tour.steps}
      run={tour.run}
      stepIndex={tour.stepIndex}
      continuous={true}
      scrollToFirstStep={true}
      showProgress={true}
      showSkipButton={true}
      locale={{
        back: 'Paso anterior',
        close: 'Cerrar',
        last: 'Finalizar',
        next: 'Siguiente paso',
        skip: 'Saltar',
      }}
      styles={{
        options: {
          zIndex: 10000,
        },
        tooltipContainer: {
          textAlign: 'left',
          fontSize: '16px', // Agranda el texto del contenido del tooltip
        },
        buttonNext: {
          backgroundColor: '#262254', // Cambia el color de fondo del botón "Siguiente"
        },
        buttonBack: {
          color: '#262254', // Cambia el color del texto del botón "Paso anterior"
        },
        buttonClose: {
          color: '#262254', // Cambia el color del texto del botón "Cerrar"
        },
      }}
      callback={handleJoyrideCallback}
    />
  );
};

export default JoyrideTutorial;
