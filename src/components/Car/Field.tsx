import React, { Component, useEffect, useState } from 'react';
import Radio from '../Radio';
import FieldDetails from '../../interfaces/field-details';
import IInfoLine from '../../interfaces/info-line';
import { validate, getValues } from '../../utils';

interface IState {
  value?: string;
  error?: object;
}

export class CarInput extends Component<FieldDetails, IState> {
  constructor(props: FieldDetails) {
    super(props);

    this.state = {
      value: getValues(props.entityId)[props.selector],
      error: validate(
        props.selector,
        getValues(props.entityId)[props.selector]
      ),
    };
  }

  componentWillReceiveProps = (nextProps: FieldDetails): void => {
    const { entityId, selector } = this.props;
    if (entityId !== nextProps.entityId || selector !== nextProps.selector) {
      this.setState({
        value: getValues(nextProps.entityId)[nextProps.selector],
      });
    }
  };
  onInputChange = (
    e: React.FormEvent<HTMLInputElement> | React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { selector, editFields } = this.props;

    const newValue = e.currentTarget.value;
    this.setState({ value: newValue || '' });
    const er = validate(selector, newValue);
    this.setState({ error: er });

    if (editFields) {
      editFields(selector, newValue, er[selector]);
    }
  };

  render() {
    const { selector, displayErrors, errors } = this.props;

    let inputType = (
      <input value={this.state.value || ''} onChange={this.onInputChange} />
    );

    if (selector === 'transmission') {
      inputType = (
        <Radio value={this.state.value || ''} onChange={this.onInputChange} />
      );
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
          {errors && [selector] && displayErrors && (
            <div className="error-message">{errors[selector]}</div>
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
