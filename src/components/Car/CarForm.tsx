import React, { useState, useEffect } from 'react';
import { CarInput } from './Field';
import { RouteComponentProps } from 'react-router-dom';
import {
  getNewList,
  saveCarsList,
  validate,
  isErrorExist,
  getValuesFor,
  initErrors,
  initValues,
} from '../../utils';
import NewCar from '../../interfaces/new-car';
import { model } from '../../data';

const CarForm: React.FC = (props: RouteComponentProps) => {
  const { match, history } = props;
  const selectedCarId = match.params.id;
  const isEdit = !!selectedCarId;
  const [values, setValues] = useState<NewCar>({});
  const [errors, setErrors] = useState<object>({});
  const [displayErrors, setDisplayErrors] = useState<boolean>(false);

  const resetComponent = (): void => {
    const lastValues = isEdit ? getValuesFor(selectedCarId) : initValues();
    setValues(lastValues);
    setErrors(initErrors(lastValues));
  };

  useEffect(() => {
    // Reset component
    resetComponent();
  }, [selectedCarId]);

  const handleAdd = (): void => {
    let requirementError = false;
    let hasError = false;
    Object.keys(model).forEach((v: string) => {
      if (model[v].isRequired && !values[v]) {
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

  const onInputChange = (
    e: React.FormEvent<HTMLInputElement> | React.ChangeEvent<HTMLInputElement>,
    selector: string
  ): void => {
    const newValue = e.currentTarget.value;
    const newError = validate(selector, newValue);
    setValues({
      transmission: 'automatic', // default
      ...values,
      [selector]: newValue,
    });
    setErrors({
      ...errors,
      [selector]: newError,
    });
  };

  const IsError = isErrorExist(errors);

  return (
    <div className="right-side">
      <div className="form">
        {['model', 'manufacturer', 'transmission', 'co2', 'image'].map(
          (c: string) => (
            <CarInput
              onChange={onInputChange}
              isEdit={isEdit} // otherwise new car
              displayErrors={displayErrors}
              entityId={selectedCarId}
              key={c}
              selector={c}
              value={values[c]}
              error={errors[c]}
            />
          )
        )}
        <div className="car-action">
          <button onClick={handleAdd}>{selectedCarId ? 'Save' : 'Add'}</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
        {displayErrors && IsError && (
          <div className="warning-messages">
            You need to fix the above errors first
          </div>
        )}
      </div>
    </div>
  );
};

export default CarForm;
