import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  RouteComponentProps,
} from 'react-router-dom';

interface TParams {
  id: string;
}
interface Cars {
  id: number;
  model: string;
  manufacturer: string;
  transmission: string;
  coTwo: number;
  image: string;
}

const carsList = [
  {
    id: 1,
    model: '1',
    manufacturer: '1',
    transmission: '1',
    coTwo: 20,
    image: '1',
  },
  {
    id: 2,
    model: '2',
    manufacturer: '2',
    transmission: '2',
    coTwo: 20,
    image: '2',
  },
  {
    id: 3,
    model: '3',
    manufacturer: '3',
    transmission: '3',
    coTwo: 20,
    image: '3',
  },
];

function CarList({ match }: RouteComponentProps<TParams>) {
  return (
    <div className="left-aside">
      <nav>
        <ul>
          {carsList.map((cl: Cars) => (
            <li key={`car-link-${cl.id}`}>
              <Link to={`/car/${cl.id}`}>{cl.model}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default CarList;
