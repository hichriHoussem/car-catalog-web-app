import Car from '../interfaces/car';
import NewCar from '../interfaces/new-car';

export function removeCar(id: string): void {
  const currentCarsList = getCurrentCars();
  saveCarsList(currentCarsList.filter((c: Car) => c.id !== parseInt(id, 0)));
}

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
    const newElementId = idList.length ? Math.max(...idList) + 1 : 1;
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
