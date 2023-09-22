import React from 'react'
import { SubjectCard } from './types'

const CSubject = (props:SubjectCard) => {
    const {subjectName,subjects,teacherID} = props
  return (
    <div style={{ textDecoration: "none", width: "100%" }}>
    <tr className="flex w-full p-4 my-4 bg-gray1 border-none rounded-[20px] text-xl font-semibold">
      <td className="flex w-full justify-center items-center text-center">
        {subjectName}
      </td>
      <td className="flex w-full justify-center items-center text-center">
        {teacherID}
      </td>
      <td className="flex w-full justify-center items-center text-center">
        {subjects}
      </td>
    </tr>
  </div>
  )
}

export default CSubject