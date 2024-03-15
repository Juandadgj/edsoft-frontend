import { StudentsByGroupCard, TeachersCard } from "./types";

const CStudentsByGroup = (props: StudentsByGroupCard) => {
  const { name, certified, info, leave, edit } = props;
  return (
    <div style={{ textDecoration: "none", width: "100%" }}>
      <tr className="flex w-full my-4 bg-gray1 border-none rounded-[20px] text-sm font-semibold">
        <td className="flex w-full justify-center items-center text-center py-0">
          {name}
        </td>
        <td className="flex w-full justify-center items-center text-center py-0">
          {certified}
        </td>
        <td className="flex w-full justify-center items-center text-center py-0">
          {info}
        </td>
        <td className="flex w-full justify-center items-center text-center py-0">
          {edit}
        </td>
        <td className="flex w-full justify-center items-center text-center py-0">
          {leave}
        </td>
      </tr>
    </div>
  );
};

export default CStudentsByGroup;
