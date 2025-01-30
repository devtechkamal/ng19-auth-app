import { Role } from './common.model';

export interface User {
  id: number;
  email: string;
  role: Role;
}

export interface Auth {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
