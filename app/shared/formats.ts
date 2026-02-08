import { workingTimeLabels } from "../components/features/dashboard/programacion-anual/groups";
import { Group, Teacher } from "../types";
import { getCourseLevel } from "./course-level";

export const formatWorkingTime = (value?: string | null) => {
  if (!value) {
    return '-';
  }

  return workingTimeLabels[value] || value;
};

export const formatGroupName = (group: Group) => {
  const name = getCourseLevel(group.level ?? null);
  const suffix = group.sublevel ? ` ${group.sublevel}` : '';
  return `${name}${suffix}`.trim();
};

export const buildTeacherLookup = (teachers: Teacher[]) => {
  const map = new Map<number, string>();

  teachers.forEach((teacher) => {
    const label = [teacher.name, teacher.last_name].filter(Boolean).join(' ').trim();
    if (teacher.id_teacher) {
      map.set(teacher.id_teacher, label || 'Sin nombre');
    }
  });

  return map;
};