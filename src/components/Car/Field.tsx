import React, { Component } from 'react';
import Radio from '../Radio';
import FieldDetails from '../../interfaces/field-details';
import IInfoLine from '../../interfaces/info-line';
import FileBase64 from 'react-file-base64';

export class CarInput extends Component<FieldDetails> {
  onInputChange = (e: any): void => this.props.onChange(e, this.props.selector);

  render() {
    const { selector, displayErrors, error, value } = this.props;

    let inputType = (
      <input
        className={selector}
        value={value || ''}
        onChange={this.onInputChange}
      />
    );

    if (selector === 'transmission') {
      inputType = <Radio value={value || ''} onChange={this.onInputChange} />;
    }
    if (selector === 'image') {
      inputType = <FileBase64 onDone={this.onInputChange} />;
    }

    return (
      <div className="car-field">
        <label className="field-label">{selector}</label>
        <span>:</span>
        <div>
          {inputType}
          {error && displayErrors && (
            <div className="error-message">{error}</div>
          )}
        </div>
      </div>
    );
  }
}

export function InfoLine(props: IInfoLine) {
  const { selector, car } = props;

  if (!car[selector]) {
    return null;
  }

  return (
    <div className={`info-line ${selector}`}>
      <div className="label">{selector}</div>
      <span>:</span>
      {car[selector]}
    </div>
  );
}
