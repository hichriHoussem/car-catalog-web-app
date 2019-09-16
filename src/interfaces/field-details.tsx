import Car from './car';

interface FieldDetails {
  displayErrors?: boolean;
  car?: Car;
  selector: string;
  entityId?: string;
  editFields?: (
    target: string,
    value: string | number,
    isErrors: boolean
  ) => void;
}

export default FieldDetails;
