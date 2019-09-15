import React, { useState } from 'react';

interface RadioInput {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Radio(props: RadioInput) {
  return (
    <div className="field-input">
      <div className="radio">
        <label>
          <input
            type="radio"
            value="option1"
            checked={true}
            onChange={props.onChange}
          />
          Option 1
        </label>
      </div>
      <div className="radio">
        <label>
          <input
            type="radio"
            value="option2"
            checked={false}
            onChange={props.onChange}
          />
          Option 2
        </label>
      </div>
    </div>
  );
}

export default Radio;
