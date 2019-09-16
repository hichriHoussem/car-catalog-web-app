import React, { useEffect, useState } from 'react';
import Radio from '../Radio';
import Car from '../../interfaces/car';
import FieldDetails from '../../interfaces/field-details';
import NewCar from '../../interfaces/new-car';
import { validate } from '../../utils';

const getValues = (entityId?: string): Car => {
  const oldLostString = localStorage.getItem('cars') || '';
  const oldList = oldLostString ? JSON.parse(oldLostString) : [];

  return !!entityId
    ? oldList.filter((c: Car) => c.id === parseInt(entityId, 0))[0]
    : {
        model: '',
        manufacturer: '',
        transmission: '',
        co2: 0,
        image: '',
      };
};

function CarInput(props: FieldDetails) {
  const [currentValue, setCurrentValue] = useState<string | null>(null);
  const [errors, setErrors] = useState<object>({});
  const savedValues = getValues(props.entityId);

  const onInputChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const newValue = e.currentTarget.value;
    props.editFields(props.selector, e.currentTarget.value);
    setCurrentValue(e.currentTarget.value);
    setErrors(validate(props.selector, e.currentTarget.value, errors));
  };

  const onRadioChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    props.editFields(props.selector, e.target.value);
    setCurrentValue(e.currentTarget.value);
    setErrors(validate(props.selector, e.currentTarget.value, errors));
  };

  let inputType = (
    <input
      value={currentValue || savedValues[props.selector]}
      onChange={onInputChange}
    />
  );

  if (props.selector === 'transmission') {
    inputType = (
      <Radio
        value={currentValue || savedValues[props.selector]}
        onChange={onRadioChange}
      />
    );
  }
  if (props.selector === 'image') {
    // inputType = <Radio onChange={onRadioChange} />;
  }

  return (
    <div className="car-field">
      <label className="field-label">{props.selector}</label>
      <span>:</span>
      <div>
        {inputType}
        {errors[props.selector] && (
          <div className="error-message">{errors[props.selector]}</div>
        )}
      </div>
    </div>
  );
}

function Field(props: FieldDetails) {
  if (!!props.entityId || !props.car) {
    return <CarInput {...props} />;
  }
  return (
    <div className="info-line">
      <div className="label">{props.selector}</div>
      <span>:</span>
      {props.car[props.selector]}
    </div>
  );
}

export default Field;
