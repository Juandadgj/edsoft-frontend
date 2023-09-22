import React from "react";
import CTeachers from "./CTeachers";
import CInstitutions from "./CInstitutions";
import { AreaCard, CourseCard, ICard, InstitutionCard, QualifificationTypeCard, SecretariesCard, SetYearCard, SubjectCard, TeachersCard } from "./types";
import CScretaries from "./CScretaries";
import CQualificationType from "./CQualificationType";
import CCourses from "./CCourses";
import CAreas from "./CAreas";
import CSetYear from "./CSetYear";
import CSubject from "./CSubject";

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
      return <CSetYear {...(item as SetYearCard)}/>;
    case "course":
      return <CCourses {...(item as CourseCard)} />;
    case "area":
      return <CAreas {...(item as AreaCard)} />;
    case "subject":
      return <CSubject {...(item as SubjectCard)} />
    default:
      break;
  }
};

export default Card;
