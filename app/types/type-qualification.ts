import { Nullable } from './common';

export interface TypeQualification {
  id_type_qual: number;
  name?: Nullable<string>;
  ceiling_score?: Nullable<number>;
  floor_score?: Nullable<number>;
  year?: Nullable<number>;
}

export interface CreateTypeQualificationDTO {
  name: string;
  ceiling_score: number;
  floor_score: number;
  year?: Nullable<number>;
}

export interface UpdateTypeQualificationDTO {
  id_type_qual: number;
  name?: Nullable<string>;
  ceiling_score?: Nullable<number>;
  floor_score?: Nullable<number>;
  year?: Nullable<number>;
}
