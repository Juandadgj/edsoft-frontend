import { Nullable } from './common';

export interface Teacher {
  id_teacher: number;
  name?: Nullable<string>;
  last_name?: Nullable<string>;
  identification?: Nullable<string>;
  type_id?: Nullable<number>;
  degree?: Nullable<string>;
  direction?: Nullable<string>;
  email?: Nullable<string>;
  phone?: Nullable<string>;
}

export interface CreateTeacherDTO {
  name: string;
  last_name: string;
  identification: string;
  type_id: number;
  phone: string;
  email?: Nullable<string>;
  degree?: Nullable<string>;
  direction?: Nullable<string>;
}

export interface UpdateTeacherDTO {
  id_teacher: number;
  name?: Nullable<string>;
  last_name?: Nullable<string>;
  identification?: Nullable<string>;
  type_id?: Nullable<number>;
  phone?: Nullable<string>;
  email?: Nullable<string>;
  degree?: Nullable<string>;
  direction?: Nullable<string>;
}

export interface FilterTeacherDTO {
  degree?: Nullable<string>;
  direction?: Nullable<string>;
  email?: Nullable<string>;
  identification?: Nullable<string>;
  last_name?: Nullable<string>;
  name?: Nullable<string>;
  phone?: Nullable<string>;
  type_id?: Nullable<number>;
}
