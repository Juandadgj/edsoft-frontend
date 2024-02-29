export interface ICard {
  type: string;
  item:
    | InstitutionCard
    | TeachersCard
    | QualifificationTypeCard
    | SetYearCard
    | GroupsCars
    | AreaCard
    | EnrollmentCard
    | CourseCard
    | SubjectCard
    | StudentsByGroupCard;
}

export interface CourseCard {
  id_course: number;
  id_group: number;
  name: string;
  teacher: string;
  route: string;
  periodo1: number;
  periodo2: number;
  periodo3: number;
  periodo4: number;
}

export interface EnrollmentCard {
  id: number;
  icon: any;
  title: string;
}

export interface InstitutionCard {
  id: string;
  name: string;
  address: string;
}
export interface TeachersCard {
  name: string;
  lastName: string;
  degree: string;
  editar: any;
  borrar: any;
}
export interface SecretariesCard {
  name: string;
  lastName: string;
  editar: any;
  borrar: any;
}
export interface QualifificationTypeCard {
  qualificationName: string;
  floor: string;
  ceiling: string;
  notes: any;
  year: string;
  edit: any;
  borrar: any;
}
export interface SetYearCard {
  year: string;
  rector: string;
  secretary: string;
  details: string;
  edit: any;
}
export interface GroupsCars {
  name: string;
  jornada?: string;
  group_teacher: string;
  id_group?: number;
  editar?: string;
  borrar?: string;
  asignaturas?: number;
  students?: number;
  see?: string;
  click?: () => void;
}
export interface AreaCard {
  name: string;
  edit: any;
  borrar: any;
}

export interface SubjectCard {
  name: string;
  area: any;
  teacher: string;
  hour: any;
  percentage: number;
  average: string;
  editar: any;
  borrar: any;
}

export interface StudentsByGroupCard {
  id_student: number,
  name: string,
  certified: any,
  info: any,
  edit: any,
  leave: any
}

export interface Qualification {}
