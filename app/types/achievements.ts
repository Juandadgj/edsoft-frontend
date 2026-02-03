import { Nullable } from './common';

export interface Achievement {
  id_achievement: number;
  description?: Nullable<string>;
  id_course?: Nullable<number>;
  period?: Nullable<number>;
}

export interface CreateAchievementDTO {
  description: string;
  id_course: number;
  period: number;
}

export interface UpdateAchievementDTO {
  id_achievement: number;
  description?: Nullable<string>;
  id_course?: Nullable<number>;
  period?: Nullable<number>;
}

export interface FilterAchievementDTO {
  description?: Nullable<string>;
  id_course?: Nullable<number>;
  period?: Nullable<number>;
}
