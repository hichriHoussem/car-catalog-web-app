import Car from './car';

interface FieldDetails {
  isEdit?: boolean;
  displayErrors?: boolean;
  car?: Car;
  selector: string;
  entityId?: string;
  errors?: boolean;
  editFields?: (
    target: string,
    value: string | number,
    isErrors: boolean
  ) => void;
}

export default FieldDetails;
