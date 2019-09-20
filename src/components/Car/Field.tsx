import React, { Component, useEffect, useState } from 'react';
import Radio from '../Radio';
import FieldDetails from '../../interfaces/field-details';
import IInfoLine from '../../interfaces/info-line';

export class CarInput extends Component<FieldDetails> {
  componentWillReceiveProps = (nextProps: FieldDetails): void => {
    // const { entityId, selector } = this.props;
    // if (entityId !== nextProps.entityId || selector !== nextProps.selector) {
    //   this.setState({
    //     value: getValues(nextProps.entityId)[nextProps.selector],
    //   });
    // }
  };

  onInputChange = (
    e: React.FormEvent<HTMLInputElement> | React.ChangeEvent<HTMLInputElement>
  ): void => this.props.onChange(e, this.props.selector);

  render() {
    const { selector, displayErrors, error, value } = this.props;

    let inputType = <input value={value || ''} onChange={this.onInputChange} />;

    if (selector === 'transmission') {
      inputType = <Radio value={value || ''} onChange={this.onInputChange} />;
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
  return (
    <div className="info-line">
      <div className="label">{selector}</div>
      <span>:</span>
      {car[selector]}
    </div>
  );
}
