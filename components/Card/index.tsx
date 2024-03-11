import React from "react";
import CTeachers from "./CTeachers";
import CInstitutions from "./CInstitutions";
import {
  AreaCard,
  GroupsCars,
  EnrollmentCard,
  ICard,
  InstitutionCard,
  QualifificationTypeCard,
  SecretariesCard,
  SetYearCard,
  SubjectCard,
  TeachersCard,
  CourseCard,
  StudentsByGroupCard
} from "./types";
import CScretaries from "./CScretaries";
import CQualificationType from "./CQualificationType";
import CGroups from "./CGroups";
import CAreas from "./CAreas";
import CSetYear from "./CSetYear";
import CSubject from "./CSubject";
import CEnrollment from "./CEnrollment";
import CCourses from "./CCourses";
import CStudentsByGroup from "./CStudentsByGroup";

const Card = ({ type, item }: ICard) => {
  switch (type) {
    case "institution":
      return <CInstitutions {...(item as InstitutionCard)} />;
    case "teacher":
      return <CTeachers {...(item as TeachersCard)} />;
    case "secretarie":
      return <CScretaries {...(item as SecretariesCard)} />;
    case "qualificationType":
      return <CQualificationType {...(item as QualifificationTypeCard)} />;
    case "setYear":
      return <CSetYear {...(item as SetYearCard)} />;
    case "groups":
      return <CGroups {...(item as GroupsCars)} />;
    case "area":
      return <CAreas {...(item as AreaCard)} />;
    case "subject":
      return <CSubject {...(item as SubjectCard)} />;
    case "enrollment":
      return <CEnrollment {...(item as EnrollmentCard)} />;
    case "courses":
      return <CCourses {...(item as CourseCard)} />;
    case "studentsByGroup":
      return <CStudentsByGroup {...(item as StudentsByGroupCard)}/>
    default:
      break;
  }
};

export default Card;
