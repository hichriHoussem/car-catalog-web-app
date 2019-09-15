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
  const oldCars = oldCarsString ? JSON.parse(oldCarsString) : [];
  const newElementId = Math.max(oldCars.map((c: NewCar) => c.id)) + 1;
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
