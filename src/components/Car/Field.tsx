import React from 'react';
import Radio from '../Radio';

interface CarType {
  id: number;
  model: string;
  manufacturer: string;
  transmission: string;
  co2: number;
  image: string;
}

interface FieldDetails {
  car?: CarType;
  selector: string;
  entityId?: string;
  editFields: (target: string, value: string) => void;
}

const getValidator = (selector: string) => {
  return (input: string): string => 'test';
};

const getValues = (entityId?: string): CarType => {
  const oldLostString = localStorage.getItem('cars') || '';

  const oldList = JSON.parse(oldLostString);

  return !!entityId
    ? oldList.filter((c: CarType) => c.id === parseInt(entityId, 0))[0]
    : {
        model: '',
        manufacturer: '',
        transmission: '',
        co2: '',
        image: '',
      };
};

function CarInput(props: FieldDetails) {
  const savedValues = getValues(props.entityId);

  const onInputChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const newValue = e.currentTarget.value;
    props.editFields(props.selector, e.currentTarget.value);
  };

  const onRadioChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    props.editFields(props.selector, e.target.value);
  };

  let inputType = (
    <input value={savedValues[props.selector]} onChange={onInputChange} />
  );
  let validator = getValidator(props.selector);

  if (props.selector === 'transmission') {
    inputType = (
      <Radio value={savedValues[props.selector]} onChange={onRadioChange} />
    );
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
  if (!!props.entityId || !props.car) {
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
