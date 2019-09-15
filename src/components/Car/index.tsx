import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

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

interface CarsDetails {
  car: CarType;
  selector: string;
}

function Field(props: CarsDetails) {
  return (
    <div>
      <span>{props.selector}</span>
      {props.car[props.selector]}
    </div>
  );
}

function Car({ match }: RouteComponentProps<TParams>) {
  if (!match.params.id) {
    return (
      <div className="right-side">
        <div className="empty-message">
          Select from the left list
          <div className="car-action">
            <button>Add a car</button>
          </div>
        </div>{' '}
      </div>
    );
  }

  const selectedCar = carsList.filter(
    (c: CarType) => c.id === parseInt(match.params.id, 0)
  );

  return (
    <div className="right-side">
      {Object.keys(selectedCar[0]).map((c: string) => (
        <Field key={c} car={selectedCar[0]} selector={c} />
      ))}

      <div className="car-action">
        <button>Edit</button>
        <button>Remove</button>
      </div>
    </div>
  );
}

export default Car;
