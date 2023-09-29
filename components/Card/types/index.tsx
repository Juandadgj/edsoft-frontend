export interface ICard {
  type: string;
  item:
    | InstitutionCard
    | TeachersCard
    | QualifificationTypeCard
    | SetYearCard
    | CourseCard
    | AreaCard
    | EnrollmentCard
    | SubjectCard;
}

export interface EnrollmentCard {
  id: number
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
export interface CourseCard {
  name: string;
  jornada: string;
  group_teacher: string;
  editar: string;
  borrar: string;
}
export interface AreaCard {
  name: string;
  edit: any;
  borrar: any;
}

export interface SubjectCard {
  subjectName: string;
  teacherID: string;
  subjects: string;
}
