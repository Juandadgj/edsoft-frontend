import { CourseLevelEnum } from "../enums/CourseLevelEnum"
export const getCourseLevel = (level?: number | null) => {
  return level ? CourseLevelEnum[level] : CourseLevelEnum.DEFAULT
}