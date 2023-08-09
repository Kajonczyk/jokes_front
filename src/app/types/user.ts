import { Game } from './room';

export interface Login {
  userName: string;
  password: string;
}

export interface Register {
  userName: string;
  password: string;
  confirmPassword: string;
}

export interface User {
  id: string;
  userName: string;
  role: number;
}
