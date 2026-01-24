import TableComponent from "@/components/Table";
import { Button } from "@/components/ui/button";
import { useGetStudentsByGroupLazyQuery } from "@/generated/graphql";
import { FileUser } from "lucide-react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const columnsStudent = [
  {
    title: "Apellido y Nombre",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Certificado",
    dataIndex: "certi",
    key: "certi",
  },
  { title: "Libro final", dataIndex: "book", key: "book" },
];

const Students = () => {
  const router = useRouter();
  const { g } = router.query;
  const [
    getStudentsByGroup,
    {
      data: dataStudentsByGroup,
      loading: loadingStudentsByGroup,
      error: errorStudentsByGroup,
    },
  ] = useGetStudentsByGroupLazyQuery({
    fetchPolicy: "network-only",
  });
  const [studentsByGroup, setStudentsByGroup] = useState<any[]>([]);
  useEffect(() => {
    if (g) {
      getStudentsByGroup({ variables: { idGroup: Number(g) } });
    }
  }, [router]);
  useEffect(() => {
    if (dataStudentsByGroup) {
      setStudentsByGroup(
        processedStudentsByGroup(dataStudentsByGroup.studentsByGroup),
      );
    }
  }, [dataStudentsByGroup]);
  const handlerSelectStudent = async (s: number | undefined) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, s: s },
    });
  };
  const processedStudentsByGroup = (data: any) => {
    if (!data) return [];
    return data.map((student: any, index: any) => ({
      id_student: student?.id_course,
      name: `${student.name} ${student.last_name}`,
      certi: (
        <Button variant={"outline"} onClick={() => handlerSelectStudent(student?.id_student)}>
          <FileUser size={25} color="#0055a6" />
        </Button>
      ),
      book: (
        <Button variant={"outline"} onClick={() => handlerSelectStudent(student?.id_student)}>
          <FileUser size={25} color="#0055a6" />
        </Button>
      ),
    }));
  };
  return (
    <div className="h-full">
      {loadingStudentsByGroup && (
        <div className="w-full h-full flex justify-center items-center">
          <span className="loading loading-dots loading-lg bg-main-blue"></span>
        </div>
      )}
      {dataStudentsByGroup?.studentsByGroup && (
        <TableComponent column={columnsStudent} data={studentsByGroup} />
      )}
      {errorStudentsByGroup && <h3>¡Ocurrio un error!</h3>}
    </div>
  );
};

export default Students;
