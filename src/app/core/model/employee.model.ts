import { Department } from './common.model';

export interface Employee {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  hireDate: string;
  department: Department;
}
