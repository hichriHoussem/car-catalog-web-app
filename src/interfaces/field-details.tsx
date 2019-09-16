import Car from './car';

interface FieldDetails {
  car?: Car;
  selector: string;
  entityId?: string;
  editFields: (target: string, value: string) => void;
}

export default FieldDetails;
