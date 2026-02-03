import { Nullable } from './common';

export interface Institution {
  id_institution: number;
  name: string;
  direction: string;
  phone: string;
  user: string;
  register: string;
  responsable: string;
  title: string;
  message: string;
  information: string;
  status: string;
  version: number;
  day: string;
  month: string;
  year: string;
  logo?: Nullable<string>;
  monthly_pay: number;
  pay_inscription: number;
}
