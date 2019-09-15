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
            value="automatic"
            checked={true}
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
            checked={false}
            onChange={props.onChange}
          />
          Manual
        </label>
      </div>
    </div>
  );
}

export default Radio;
