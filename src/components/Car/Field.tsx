import React, { useEffect, useState } from 'react';
import Radio from '../Radio';
import FieldDetails from '../../interfaces/field-details';
import { validate, checkErrors, getValues } from '../../utils';

function CarInput(props: FieldDetails) {
  const [currentValue, setCurrentValue] = useState<string | null>(
    getValues(props.entityId)[props.selector]
  );
  const [errors, setErrors] = useState<object>({});

  useEffect(() => {
    // Reset component
    setCurrentValue(getValues(props.entityId)[props.selector]);
    setErrors(validate(props.selector, currentValue, errors));
  }, [props.entityId]);

  const onInputChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const newValue = e.currentTarget.value;
    if (props.editFields) {
      props.editFields(
        props.selector,
        e.currentTarget.value,
        checkErrors(errors)
      );
    }

    setCurrentValue(e.currentTarget.value || '');
    setErrors(validate(props.selector, e.currentTarget.value, errors));
  };

  const onRadioChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (props.editFields) {
      props.editFields(props.selector, e.target.value, checkErrors(errors));
    }

    setCurrentValue(e.currentTarget.value || '');
    setErrors(validate(props.selector, e.currentTarget.value, errors));
  };

  let inputType = <input value={currentValue || ''} onChange={onInputChange} />;

  if (props.selector === 'transmission') {
    inputType = <Radio value={currentValue || ''} onChange={onRadioChange} />;
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
        {errors[props.selector] && props.displayErrors && (
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
