import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import EmptyList from './EmptyList';
import { InfoLine } from './Field';
import { getCurrentCars, removeCar } from '../../db/backend';
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
        <div className="form-fields">
          {['model', 'manufacturer', 'transmission', 'co2'].map((c: string) => (
            <InfoLine key={c} car={selectedCar[0]} selector={c} />
          ))}

          <div className="car-action">
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleRemove}>Remove</button>
          </div>
        </div>
        <div className="info-line image field-image-preview">
          <img alt="" src={selectedCar[0].image} id="image-preview" />
        </div>
      </div>
    </div>
  );
}

export default CarInfo;
