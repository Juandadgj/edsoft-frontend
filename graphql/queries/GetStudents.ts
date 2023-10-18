import { gql } from "@apollo/client";

export const GET_STUDENTS = gql`
query Query {
  students {
    id_student
    name
    last_name
    type_id
    identification
    sex
    direction
    phone
    guardian
    status
    birthday
    father
    mother
    email
  }
}
`