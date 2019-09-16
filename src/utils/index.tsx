import Car from '../interfaces/car';

interface NewCar {
  id?: number;
  model?: string;
  manufacturer?: string;
  transmission?: string;
  co2?: number;
  image?: string;
}

export function saveCarsList(cars: [Car]): void {
  localStorage.setItem('cars', JSON.stringify(cars));
}

export function getNewList(values: NewCar, currentId: string): any {
  const oldCarsString = localStorage.getItem('cars');
  if (!oldCarsString) {
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
  const idList = oldCars.map((c: NewCar) => c.id);
  const newElementId = Math.max(...idList) + 1;

  if (currentId) {
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
