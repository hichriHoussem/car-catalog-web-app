import React, { useState } from 'react';
import Field from './Field';
import { RouteComponentProps } from 'react-router-dom';
import { getNewList, saveCarsList } from '../../utils';
import NewCar from '../../interfaces/new-car';

const Form: React.FC = (props: RouteComponentProps) => {
  const [values, setValues] = useState<NewCar>({});
  const [errors, setErrors] = useState<boolean>(false);
  const [displayWarning, setDisplayWarning] = useState<boolean>(false);

  const handleAdd = (): void => {
    if (!errors) {
      const { newId, newList } = getNewList(values, props.match.params.id);

      saveCarsList(newList);
      props.history.push(`/car/${newId}`);
    } else {
      setDisplayWarning(true);
    }
  };

  const handleCancel = (): void => {
    props.history.push('/');
  };

  const editFields = (
    target: string,
    value: string,
    isErrors: boolean
  ): void => {
    setValues({
      ...values,
      [target]: value,
    });
    setErrors(isErrors);
    if (!isErrors) {
      setDisplayWarning(false);
    }
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
          <button onClick={handleAdd}>
            {props.match.params.id ? 'Save' : 'Add'}
          </button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
        {displayWarning && (
          <div className="warning-messages">
            You need to fix the above errors first
          </div>
        )}
      </div>
    </div>
  );
};

export default Form;
