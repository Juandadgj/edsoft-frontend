import TableComponent from "@/components/Table";
import { Button } from "@/components/ui/button";
import { FileUser } from "lucide-react";
import { useRouter } from "next/router";
import React, { useEffect, useState, useCallback } from "react";
import { studentService } from "@/services/api.service";
import type { Student } from "@/types/api.types";

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
  const [studentsByGroup, setStudentsByGroup] = useState<any[]>([]);
  const [loadingStudentsByGroup, setLoadingStudentsByGroup] = useState(false);
  const [errorStudentsByGroup, setErrorStudentsByGroup] = useState<string | null>(null);

  const fetchStudentsByGroup = useCallback(async (groupId: number) => {
    try {
      setLoadingStudentsByGroup(true);
      setErrorStudentsByGroup(null);
      const response = await studentService.getByGroup(groupId);
      setStudentsByGroup(processedStudentsByGroup(response));
    } catch (error) {
      console.error("Error fetching students by group:", error);
      setErrorStudentsByGroup(error instanceof Error ? error.message : "Error al cargar estudiantes");
      setStudentsByGroup([]);
    } finally {
      setLoadingStudentsByGroup(false);
    }
  }, []);

  useEffect(() => {
    if (g) {
      fetchStudentsByGroup(Number(g));
    }
  }, [g, fetchStudentsByGroup]);

  const handlerSelectStudent = async (s: number | undefined) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, s: s },
    });
  };

  const processedStudentsByGroup = (data: Student[]) => {
    if (!data) return [];
    return data.map((student) => ({
      id_student: student?.id_student,
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
      {studentsByGroup && studentsByGroup.length > 0 && (
        <TableComponent column={columnsStudent} data={studentsByGroup} />
      )}
      {errorStudentsByGroup && <h3>¡Ocurrio un error!</h3>}
    </div>
  );
};

export default Students;
