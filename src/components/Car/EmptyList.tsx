import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import NewCar from '../../interfaces/new-car';

const EmptyList: React.FC = (props: RouteComponentProps) => {
  const cars = localStorage.getItem('cars');

  const changeMode = (): void => {
    props.history.push('/new');
  };

  return (
    <div className="right-side">
      <div className="empty-message">
        {cars && cars.length ? (
          'Select from the left list'
        ) : (
          <div className="car-action">
            <button onClick={changeMode}>Add a car</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmptyList;
