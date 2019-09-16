import React, { useState } from 'react';
import Field from './Field';
import { RouteComponentProps } from 'react-router-dom';
import { getNewList } from '../../utils';
import NewCar from '../../interfaces/new-car';

const Form: React.FC = (props: RouteComponentProps) => {
  const [values, setValues] = useState<NewCar>({});

  const handleAdd = (): void => {
    const { newId, newList } = getNewList(values);

    localStorage.setItem('cars', JSON.stringify(newList));
    props.history.push(`/car/${newId}`);
  };

  const handleCancel = (): void => {
    props.history.push('/');
  };

  const editFields = (target: string, value: string): void => {
    setValues({
      ...values,
      [target]: value,
    });
  };
  return (
    <div className="right-side">
      <div className="form">
        {['model', 'manufacturer', 'transmission', 'co2', 'image'].map(
          (c: string) => (
            <Field
              editFields={editFields}
              entityId={props.match.params.id}
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
};

export default Form;
