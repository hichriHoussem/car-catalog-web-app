import Car from '../interfaces/car';
import NewCar from '../interfaces/new-car';

export function saveCarsList(cars: [Car]): void {
  localStorage.setItem('cars', JSON.stringify(cars));
}

export function getNewList(values: NewCar, currentId: string): any {
  const oldCarsString = localStorage.getItem('cars');
  if (!oldCarsString) {
    // first car
    return {
      newId: 1,
      newList: [
        {
          id: 1,
          ...values,
        },
      ],
    };
  }
  const oldCars = JSON.parse(oldCarsString);

  if (currentId) {
    // edit
    const newList = oldCars.map((c: Car) => {
      if (c.id === parseInt(currentId, 0)) {
        return {
          id: currentId,
          ...c,
          ...values,
        };
      } else {
        return c;
      }
    });
    return {
      newId: currentId,
      newList,
    };
  } else {
    // new car
    const idList = oldCars.map((c: NewCar) => c.id);
    const newElementId = Math.max(...idList) + 1;
    return {
      newId: newElementId,
      newList: [
        ...oldCars,
        {
          id: newElementId,
          ...values,
        },
      ],
    };
  }
}

export function getCurrentCars(): any {
  const oldCarsString = localStorage.getItem('cars');
  return oldCarsString ? JSON.parse(oldCarsString) : [];
}

export function removeCar(id: string): void {
  const currentCarsList = getCurrentCars();
  saveCarsList(currentCarsList.filter((c: Car) => c.id !== parseInt(id, 0)));
}

const validatorsMapper = {
  model: {
    isRequired: true,
    validate: (input: string): string | null => {
      if (!input) {
        return 'Required field';
      }
      return input.length > 30 ? 'reach limit' : null;
    },
  },
  manufacturer: {
    isRequired: true,
    validate: (input: string): string | null => {
      if (!input) {
        return 'Required field';
      }
      return input.length > 30 ? 'reach limit' : null;
    },
  },
  transmission: {
    isRequired: true,
    validate: (input: string): string | null => {
      if (!input) {
        return 'Required field';
      }
      return input.length > 30 ? 'reach limit' : null;
    },
  },
  co2: {
    isRequired: false,
  },
  image: {
    isRequired: false,
  },
};

export function validate(
  selector: string,
  input: string | number,
  oldError: object
): object {
  const error = {};
  const selectedValidator = validatorsMapper[selector];
  const result = selectedValidator.isRequired
    ? selectedValidator.validate(input)
    : null;
  if (result) {
    error[selector] = result;
  } else {
    return {
      ...oldError,
      [selector]: null,
    };
  }
  return {
    ...oldError,
    ...error,
  };
}

export function checkErrors(errors: object): boolean {
  return !!Object.keys(errors).filter((c: string) => !!errors[c]).length;
}
