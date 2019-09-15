import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface TParams {
  id: string;
}

interface Cars {
  id: number;
  model: string;
  manufacturer: string;
  Transmission: string;
  coTwo: number;
  image: string;
}

const carsList = [
  {
    id: 1,
    model: '1',
    manufacturer: '1',
    Transmission: '1',
    coTwo: 20,
    image: '1',
  },
  {
    id: 2,
    model: '2',
    manufacturer: '2',
    Transmission: '2',
    coTwo: 20,
    image: '2',
  },
  {
    id: 3,
    model: '3',
    manufacturer: '3',
    Transmission: '3',
    coTwo: 20,
    image: '3',
  },
];

function Car({ match }: RouteComponentProps<TParams>) {
  if (!match.params.id) {
    return (
      <div className="right-side">
        <div className="empty-message">Select from the left list</div>{' '}
      </div>
    );
  }

  const selectedCar = carsList.filter(
    (c: Cars) => c.id === parseInt(match.params.id, 0)
  );

  return (
    <div className="right-side">
      This is a page for product with ID: {selectedCar[0].id}{' '}
    </div>
  );
}

export default Car;
