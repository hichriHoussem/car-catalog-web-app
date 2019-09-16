import Car from './car';

interface FieldDetails {
  car?: Car;
  selector: string;
  entityId?: string;
  editFields: (target: string, value: string, isErrors: boolean) => void;
}

export default FieldDetails;
