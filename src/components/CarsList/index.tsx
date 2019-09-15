import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { getCurrentCars } from '../../utils';

interface Cars {
  id: number;
  model: string;
  manufacturer: string;
  transmission: string;
  coTwo: number;
  image: string;
}

function CarList(props: RouteComponentProps) {
  const changeMode = (): void => {
    props.history.push('/new');
  };

  const carsList = getCurrentCars();

  return (
    <div className="left-aside cars-list">
      <div className="car-action">
        <button onClick={changeMode}>Add a car</button>
      </div>
      <nav>
        <ul>
          {carsList.map((cl: Cars) => (
            <Link key={`car-link-${cl.id}`} to={`/car/${cl.id}`}>
              <li>{cl.model}</li>
            </Link>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default CarList;
