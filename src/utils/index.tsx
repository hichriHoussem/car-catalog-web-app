interface NewCar {
  id?: number;
  model?: string;
  manufacturer?: string;
  transmission?: string;
  co2?: number;
  image?: string;
}

export function getNewList(values: NewCar): any {
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

export function getCurrentCars(): any {
  const oldCarsString = localStorage.getItem('cars');
  return oldCarsString ? JSON.parse(oldCarsString) : [];
}
