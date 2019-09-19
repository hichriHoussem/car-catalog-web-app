import React, { useState, useEffect } from 'react';
import { CarInput } from './Field';
import { RouteComponentProps } from 'react-router-dom';
import { getNewList, saveCarsList } from '../../utils';
import NewCar from '../../interfaces/new-car';
import { validatorsMapper } from '../../data';

const CarForm: React.FC = (props: RouteComponentProps) => {
  const { match, history } = props;
  const selectedCarId = match.params.id;
  const [values, setValues] = useState<NewCar>({});
  const [errors, setErrors] = useState<object>({});
  const [displayErrors, setDisplayErrors] = useState<boolean>(false);

  useEffect(() => {
    // Reset component
    setDisplayErrors(false);
  }, [selectedCarId]);

  const handleAdd = (): void => {
    let requirementError = false;
    let hasError = false;
    Object.keys(validatorsMapper).forEach((v: string) => {
      if (validatorsMapper[v].isRequired && !values[v]) {
        requirementError = true;
      }
    });

    Object.keys(errors).forEach((e: string) => {
      if (errors[e]) {
        hasError = true;
      }
    });

    if (!hasError && !requirementError) {
      const { newId, newList } = getNewList(values, selectedCarId);
      saveCarsList(newList);
      history.push(`/car/${newId}`);
    } else {
      setDisplayErrors(true);
    }
  };

  const handleCancel = (): void => {
    history.push('/');
  };

  const editFields = (
    target: string,
    value: string | number,
    isErrors: boolean
  ): void => {
    setValues({
      transmission: 'automatic', // default
      ...values,
      [target]: value,
    });

    setErrors({
      ...errors,
      [target]: isErrors,
    });
  };
  return (
    <div className="right-side">
      <div className="form">
        {['model', 'manufacturer', 'transmission', 'co2', 'image'].map(
          (c: string) => (
            <CarInput
              isEdit={!!selectedCarId} // otherwise new car
              displayErrors={displayErrors}
              editFields={editFields}
              entityId={selectedCarId}
              key={c}
              selector={c}
            />
          )
        )}
        <div className="car-action">
          <button onClick={handleAdd}>{selectedCarId ? 'Save' : 'Add'}</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
        {displayErrors && (
          <div className="warning-messages">
            You need to fix the above errors first
          </div>
        )}
      </div>
    </div>
  );
};

export default CarForm;
