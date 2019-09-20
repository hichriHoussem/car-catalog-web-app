import Car from '../interfaces/car';
import { model } from '../db/model';

export function validate(
  selector: string,
  input: string | number | null
): object {
  const selectedValidator = model[selector];
  return selectedValidator.validate(input);
}

export const getValuesFor = (entityId?: string): Car => {
  const oldLostString = localStorage.getItem('cars') || '';
  const oldList = oldLostString ? JSON.parse(oldLostString) : [];

  return !!entityId
    ? oldList.filter((c: Car) => c.id === parseInt(entityId, 0))[0]
    : {
        model: '',
        manufacturer: '',
        transmission: 'automatic',
        co2: '',
        image: '',
      };
};

export const isErrorExist = (errors: object): boolean => {
  return errors
    ? !!Object.keys(errors).filter((e: string) => !!errors[e]).length
    : false;
};

export const initErrors = (values: object): object => {
  const result = {};
  Object.keys(model).forEach((v: string) => {
    result[v] = validate(v, values[v]);
  });

  return result;
};

export const initValues = (): object => {
  const result = {};
  Object.keys(model).forEach((v: string) => {
    result[v] = v === 'transmission' ? 'automatic' : '';
  });
  return result;
};
