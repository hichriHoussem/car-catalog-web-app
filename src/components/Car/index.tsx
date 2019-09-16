import React, { MouseEvent, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import EmptyList from './EmptyList';
import Field from './Field';
import { getCurrentCars, removeCar } from '../../utils';
import Car from '../../interfaces/car';

interface TParams {
  id: string;
}

function CarInfo(props: RouteComponentProps<TParams>) {
  const carsList = getCurrentCars();

  if (!props.match.params.id) {
    return <EmptyList {...props} />;
  }

  const selectedCar = carsList.filter(
    (c: Car) => c.id === parseInt(props.match.params.id, 0)
  );

  const handleEdit = (): void => {
    props.history.push(`/edit/${selectedCar[0].id}`);
  };

  const handleRemove = (): void => {
    removeCar(selectedCar[0].id);
    props.history.push('/');
  };

  return (
    <div className="right-side">
      <div className="info">
        {Object.keys(selectedCar[0]).map((c: string) => (
          <Field key={c} car={selectedCar[0]} selector={c} />
        ))}

        <div className="car-action">
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleRemove}>Remove</button>
        </div>
      </div>
    </div>
  );
}

export default CarInfo;
