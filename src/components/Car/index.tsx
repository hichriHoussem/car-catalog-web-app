import React, { MouseEvent, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import EmptyList from './EmptyList';
import Field from './Field';

interface TParams {
  id: string;
}

interface CarType {
  id: number;
  model: string;
  manufacturer: string;
  transmission: string;
  co2: number;
  image: string;
}

const carsList = [
  {
    id: 1,
    model: '1',
    manufacturer: '1',
    transmission: '1',
    co2: 20,
    image: '1',
  },
  {
    id: 2,
    model: '2',
    manufacturer: '2',
    transmission: '2',
    co2: 20,
    image: '2',
  },
  {
    id: 3,
    model: '3',
    manufacturer: '3',
    transmission: '3',
    co2: 20,
    image: '3',
  },
];

function Car(props: RouteComponentProps<TParams>) {
  if (!props.match.params.id) {
    return <EmptyList {...props} />;
  }

  const selectedCar = carsList.filter(
    (c: CarType) => c.id === parseInt(props.match.params.id, 0)
  );

  const handleEdit = (): void => {
    props.history.push(`/edit/${selectedCar[0].id}`);
  };

  const handleRemove = (): void => {
    props.history.push('/');
  };

  const changeMode = (): void => {};

  const editFields = (target: string, value: string): void => {};

  return (
    <div className="right-side form">
      <button onClick={changeMode}>Add a car</button>
      {Object.keys(selectedCar[0]).map((c: string) => (
        <Field
          editFields={editFields}
          key={c}
          car={selectedCar[0]}
          selector={c}
        />
      ))}

      <div className="car-action">
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleRemove}>Remove</button>
      </div>
    </div>
  );
}

export default Car;
