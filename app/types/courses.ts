import { Nullable } from './common';
import { Teacher } from './teachers';

export interface Area {
  id_area: number;
  name?: Nullable<string>;
  status?: Nullable<string>;
}

export interface Course {
  id_course: number;
  id_group: number;
  id_area: number;
  id_teacher: number;
  name: string;
  hour: number;
  asi_dimension?: Nullable<string>;
  average?: Nullable<string>;
  dim_codigo?: Nullable<number>;
  percentage?: Nullable<number>;
  position?: Nullable<number>;
  area?: Nullable<Area>;
  teacher?: Nullable<Teacher>;
}

export interface CreateAreaDTO {
  name: string;
  status?: Nullable<string>;
}

export interface UpdateAreaDTO {
  id_area: number;
  name?: Nullable<string>;
  status?: Nullable<string>;
}

export interface FilterAreaDTO {
  name?: Nullable<string>;
  status?: Nullable<string>;
}

export interface CreateCourseDTO {
  id_group: number;
  id_area: number;
  id_teacher: number;
  name: string;
  hour: number;
  asi_dimension?: Nullable<string>;
  average?: Nullable<string>;
  dim_codigo?: Nullable<number>;
  percentage?: Nullable<number>;
  position?: Nullable<number>;
}

export interface UpdateCourseDTO {
  id_course: number;
  id_group?: Nullable<number>;
  id_area?: Nullable<number>;
  id_teacher?: Nullable<number>;
  name?: Nullable<string>;
  hour?: Nullable<number>;
  asi_dimension?: Nullable<string>;
  average?: Nullable<string>;
  dim_codigo?: Nullable<number>;
  percentage?: Nullable<number>;
  position?: Nullable<number>;
}

export interface FilterCourseDTO {
  id_group?: Nullable<number>;
  id_area?: Nullable<number>;
  id_teacher?: Nullable<number>;
  name?: Nullable<string>;
  hour?: Nullable<number>;
  asi_dimension?: Nullable<string>;
  average?: Nullable<string>;
  dim_codigo?: Nullable<number>;
  percentage?: Nullable<number>;
  position?: Nullable<number>;
}
