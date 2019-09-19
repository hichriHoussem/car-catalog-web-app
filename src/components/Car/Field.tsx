import React, { useEffect, useState } from 'react';
import Radio from '../Radio';
import FieldDetails from '../../interfaces/field-details';
import IInfoLine from '../../interfaces/info-line';
import { validate, getValues } from '../../utils';

export function CarInput(props: FieldDetails) {
  const { entityId, selector, editFields, displayErrors } = props;
  const [currentValue, setCurrentValue] = useState<string | null>(
    getValues(entityId)[selector]
  );
  const [errors, setErrors] = useState<object>(
    validate(selector, currentValue)
  );

  useEffect(() => {
    // Reset component
    setCurrentValue(getValues(entityId)[selector]);
  }, [entityId, selector]);

  const onInputChange = (
    e: React.FormEvent<HTMLInputElement> | React.ChangeEvent<HTMLInputElement>
  ): void => {
    const newValue = e.currentTarget.value;
    setCurrentValue(newValue || '');
    const er = validate(selector, newValue);
    setErrors(er);
    if (editFields) {
      editFields(selector, newValue, er[selector]);
    }
  };

  let inputType = <input value={currentValue || ''} onChange={onInputChange} />;

  if (selector === 'transmission') {
    inputType = <Radio value={currentValue || ''} onChange={onInputChange} />;
  }
  if (selector === 'image') {
    // inputType = <Radio onChange={onRadioChange} />;
  }

  return (
    <div className="car-field">
      <label className="field-label">{selector}</label>
      <span>:</span>
      <div>
        {inputType}
        {errors[selector] && displayErrors && (
          <div className="error-message">{errors[selector]}</div>
        )}
      </div>
    </div>
  );
}

export function InfoLine(props: IInfoLine) {
  const { selector, car } = props;
  return (
    <div className="info-line">
      <div className="label">{selector}</div>
      <span>:</span>
      {car[selector]}
    </div>
  );
}
