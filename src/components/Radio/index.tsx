import React from 'react';

interface RadioInput {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

function Radio(props: RadioInput) {
  return (
    <div className="field-input">
      <div className="radio">
        <label>
          <input
            type="radio"
            value="automatic"
            checked={props.value === 'automatic'}
            onChange={props.onChange}
          />
          Automatic
        </label>
      </div>
      <div className="radio">
        <label>
          <input
            type="radio"
            value="manual"
            checked={props.value === 'manual'}
            onChange={props.onChange}
          />
          Manual
        </label>
      </div>
    </div>
  );
}

export default Radio;
