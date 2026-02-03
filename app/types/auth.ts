import { Nullable } from './common';

export interface Auth {
  role?: Nullable<string>;
  token?: Nullable<string>;
}

export interface SignInDTO {
  id_institution: number;
  user: string;
  password: string;
}
