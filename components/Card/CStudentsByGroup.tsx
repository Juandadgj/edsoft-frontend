import { StudentsByGroupCard, TeachersCard } from "./types";

const CStudentsByGroup = (props: StudentsByGroupCard) => {
  const { name, certified, info, leave, edit } = props;
  return (
    <div style={{ textDecoration: "none", width: "100%" }}>
      <tr className="flex w-full p-1 my-4 bg-gray1 border-none rounded-[20px] text-base font-semibold">
        <td className="flex w-full justify-center items-center text-center py-2">
          {name}
        </td>
        <td className="flex w-full justify-center items-center text-center">
          {certified}
        </td>
        <td className="flex w-full justify-center items-center text-center">
          {info}
        </td>
        <td className="flex w-full justify-center items-center text-center">
          {edit}
        </td>
        <td className="flex w-full justify-center items-center text-center">
          {leave}
        </td>
      </tr>
    </div>
  );
};

export default CStudentsByGroup;
