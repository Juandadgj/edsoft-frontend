import type { Enrollment, Student } from '@/app/types';


export enum EnrollmentCertificateType {
  Certificate1 = "student-enrollment-i",
  Certificate2 = "student-enrollment-ii",
}


export type ActionState = {
  success: boolean;
  message: string;
  data?: Enrollment;
};

export type StudentActionState = {
  success: boolean;
  message: string;
  data?: Student;
  students?: Student[];
};

export const DEFAULT_REVALIDATE_PATH = '/dashboard/programacion-anual/matriculas';
