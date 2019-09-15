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

  let inputType = <input />;
  let validator = getValidator(props.selector);

  switch (props.selector) {
    case 'model':
      inputType = <input onChange={onInputChange} />;
      break;
    case 'manufacturer':
      inputType = <input onChange={onInputChange} />;
      break;
    case 'transmission':
      inputType = <Radio onChange={onRadioChange} />;
      break;
    case 'co2':
      inputType = <input onChange={onInputChange} />;
      break;
    case 'image':
      inputType = <input onChange={onInputChange} />;
      break;

    default:
      inputType = <input onChange={onInputChange} />;
      break;
  }
  return <div>{inputType}</div>;
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
