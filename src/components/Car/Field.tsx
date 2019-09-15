import React from 'react';
import Radio from '../Radio';

interface FieldDetails {
  car?: CarType;
  selector: string;
  isEditMode: boolean;
  editFields?: (target: string, value: string) => void;
}

interface CarType {
  id: number;
  model: string;
  manufacturer: string;
  transmission: string;
  co2: number;
  image: string;
}

const getValidator = (selector: string) => {
  return (input: string): string => 'test';
};

function CarInput(props: FieldDetails) {
  const onInputChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const newValue = e.currentTarget.value;
  };

  const onRadioChange = (e: React.ChangeEvent<HTMLInputElement>): void => {};

  let inputType = <input onChange={onInputChange} />;
  let validator = getValidator(props.selector);

  if (props.selector === 'transmission') {
    inputType = <Radio onChange={onRadioChange} />;
  }
  if (props.selector === 'image') {
    // inputType = <Radio onChange={onRadioChange} />;
  }

  return (
    <div className="car-field">
      <label className="field-label">{props.selector}</label>
      <span>:</span>
      {inputType}
    </div>
  );
}

function Field(props: FieldDetails) {
  if (props.isEditMode || !props.car) {
    return <CarInput {...props} />;
  }
  return (
    <div>
      <span>{props.selector}</span>
      {props.car[props.selector]}
    </div>
  );
}

export default Field;
