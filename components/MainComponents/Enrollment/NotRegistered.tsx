import React, { useEffect, useState, useCallback } from "react";
import useSchoolYear from "@/hooks/useSchoolYear";
import TableComponent from "@/components/Table";
import { getCourseLevel } from "@/shared/helpers/getCourseLevel";
import { enrollmentService } from "@/services/api.service";
import type { Enrollment } from "@/types/api.types";

const columns = [
  {
    title: "Curso",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Profesor",
    dataIndex: "teacher",
    key: "teacher",
  },
  {
    title: "Asignaturas",
    dataIndex: "subjects",
    key: "subjects",
  },
];

export const NotRegistered = () => {
  const { year } = useSchoolYear();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [data, setData] = useState<Enrollment[] | null>(null);
  const [processedCourses, setProcessedCourses] = useState<any[]>([]);

  const fetchEnrollments = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const enrollments = await enrollmentService.getAll({ year } as any);
      setData(enrollments);
      
      const processed = (enrollments || []).map((enrollment: Enrollment) => ({
        name: enrollment.id_group?.toString() || "N/A",
        jornada: enrollment.year?.toString() || "",
        group_teacher: enrollment.id_student?.toString() || "",
      }));
      setProcessedCourses(processed);
    } catch (err) {
      setError(err);
      console.error("Error fetching enrollments:", err);
    } finally {
      setLoading(false);
    }
  }, [year]);
  useEffect(() => {
    fetchEnrollments();
  }, [fetchEnrollments]);

  return (
    <div className="rounded-tl-[20px] w-full h-[100vh] overflow-hidden bg-gray1 p-5">
      <div className="pb-4">
        <div>
          <strong className="text-2xl text-black ps-8">
            Estudiantes no matriculados en el {year}
          </strong>
        </div>
      </div>
      <div className="mx-auto bg-white border-none border-2 shadow-2xl rounded-[2rem] p-5">
        {loading && (
          <div className="w-full h-full flex justify-center items-center">
            <span className="loading loading-dots loading-lg bg-main-blue"></span>
          </div>
        )}
        {data && (
          <div className="d-flex border-white py-4" style={{ height: "32rem" }}>
            <TableComponent column={columns} data={processedCourses} />
          </div>
        )}
        {error && (
          <div className="w-full h-full flex justify-center items-center">
            <h1 className="text-md text-red-500">{(error as any)?.message || "Error loading enrollments"}</h1>
          </div>
        )}
      </div>
    </div>
  );
};
