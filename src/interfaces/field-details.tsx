import Car from './car';

interface FieldDetails {
  isEdit?: boolean;
  displayErrors?: boolean;
  car?: Car;
  selector: string;
  entityId?: string;
  error: boolean;
  value: string;
  onChange: (e: any, selector: string) => void;
}

export default FieldDetails;
