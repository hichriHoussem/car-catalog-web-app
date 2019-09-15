import React, { useState } from 'react';
import Field from './Field';

interface NewCar {
  model?: string;
  manufacturer?: string;
  transmission?: string;
  co2?: number;
  image?: string;
}

const EmptyList: React.FC = () => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [values, setValues] = useState<NewCar>({});

  const cars = localStorage.getItem('cars');

  const editFields = (target: string, value: string): void => {
    setValues({
      ...values,
      [target]: value,
    });
  };

  const changeMode = (): void => {
    setIsEditMode(true);
  };

  const handleAdd = (): void => {
    const oldCarsString = localStorage.getItem('cars');
    const oldCars = oldCarsString ? JSON.parse(oldCarsString) : [];
    oldCars.push(values);
    localStorage.setItem('cars', JSON.stringify(oldCars));
    setIsEditMode(false);
  };

  const handleCancel = (): void => {
    setIsEditMode(false);
  };

  if (isEditMode) {
    return (
      <div className="right-side">
        <div className="form">
          {['model', 'manufacturer', 'transmission', 'co2', 'image'].map(
            (c: string) => (
              <Field
                editFields={editFields}
                isEditMode={true}
                key={c}
                selector={c}
              />
            )
          )}
          <div className="car-action">
            <button onClick={handleAdd}>Add a car</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }

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
