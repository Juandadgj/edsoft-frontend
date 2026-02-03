"use client";
import {
  startTransition,
  useActionState,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ContainerComponents } from "@/app/components/shared/container";
import { Button } from "@/app/components/ui/button";
import { DELIVERABLE_OPTIONS, type DeliverableOption } from "./constants";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Group, ScholarYear, Student } from "@/app/types";
import Table from "@/app/components/ui/table";
import { getCourseLevel } from "@/app/shared/course-level";
import { Edit, FileText } from "lucide-react";

import { certificateFormSchema } from "./schemas/student-certificate-schema";
import Configuration from "../shared/Configuration";
import { generateDeriverableByOptionsAction } from "./actions";
import {
  FieldValue,
  FormField,
} from "@/app/components/shared/render-field/types";
import { reportConfigurableSchema } from "./schemas/configurable-reports";

interface DeliverableReportProps {
  optionId: number;
  groups?: Group[];
  students?: Student[];
  periods?: Array<{ id: number; name: string }>;
  years?: ScholarYear[];
}

export function DeliverableReport({
  optionId,
  groups = [],
  students = [],
  periods = [],
  years = [],
}: DeliverableReportProps) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const groupId = params.get("group");
  const studentId = params.get("student");
  const periodId = params.get("period");
  const yearId = params.get("year");
  const option = DELIVERABLE_OPTIONS.find((opt) => opt.id === optionId);
  const [state, action, isPending] = useActionState(
    generateDeriverableByOptionsAction,
    { success: false, message: "" },
  );
  const certificateFields = certificateFormSchema;
  let initialData: Record<string, FieldValue> = {};
  const [formData, setFormData] = useState<Record<string, FieldValue>>(() => {
    const defaultState: Record<string, FieldValue> = {};
    certificateFields.forEach((field) => {
      const initializeField = (f: FormField) => {
        if (f.type === "group" && f.subFields) {
          f.subFields.forEach(initializeField);
        } else if (f.type === "checkboxGroup" && f.subFields) {
          f.subFields.forEach(initializeField);
        } else if (f.id) {
          defaultState[f.id] = initialData[f.id] ?? f.defaultValue ?? "";
        }
      };
      initializeField(field);
    });
    return defaultState;
  });
  const [formData2, setFormData2] = useState<Record<string, FieldValue>>(() => {
    const defaultState: Record<string, FieldValue> = {};
    reportConfigurableSchema.forEach((field) => {
      const initializeField = (f: FormField) => {
        if (f.type === "group" && f.subFields) {
          f.subFields.forEach(initializeField);
        } else if (f.type === "checkboxGroup" && f.subFields) {
          f.subFields.forEach(initializeField);
        } else if (f.id) {
          defaultState[f.id] = initialData[f.id] ?? f.defaultValue ?? "";
        }
      };
      initializeField(field);
    });
    return defaultState;
  });
  const handleChange = useCallback((id: string, value: FieldValue) => {
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  }, []);
  const handleChange2 = useCallback((id: string, value: FieldValue) => {
    setFormData2((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  }, []);
  const [isGenerating, setIsGenerating] = useState(false);

  const handlerSelectStudent = async (s: number | undefined) => {
    const currentParams = new URLSearchParams(params.toString());
    console.log(currentParams.toString(), pathname);
    currentParams.set("student", String(s));
    router.push(`${pathname}?${currentParams.toString()}`);
  };

  useEffect(() => {
    if (state.success) {
      console.log(state.data);
      window.open()?.document.write(state.data?.report_content || "");
    }
  }, [state]);

  const groupsColumns = [
    {
      title: "Curso",
      key: "name",
      render: (_: unknown, record: Group) =>
        getCourseLevel(record.level, record.sublevel),
    },
    {
      title: "Profesor del Grupo",
      dataIndex: "representative",
      key: "representative",
      render: (_: unknown, record: Group) => record.representative || "-",
    },
    {
      title: "Asignaturas",
      dataIndex: "coursesCount",
      key: "coursesCount",
      render: (_: unknown, record: Group) => record.coursesCount ?? 0,
    },
    {
      title: "Ver",
      key: "select",
      render: (_: unknown, record: Group) => {
        return (
          <Button
            type="button"
            onClick={() => {
              const currentParams = new URLSearchParams(params.toString());
              currentParams.set("group", String(record.id_group));
              router.push(`${pathname}?${currentParams.toString()}`);
            }}
          >
            Ver estudiantes
          </Button>
        );
      },
    },
  ];

  const studentsColumns = useMemo(() => {
    const cols: Array<any> = [
      {
        title: "Nombre",
        dataIndex: "name",
        key: "name",
        render: (_: unknown, record: Student) => {
          return (
            <div>
              <div>
                {record.name} {record.last_name}
              </div>
            </div>
          );
        },
      },
    ];
    if (option?.type !== "student-certificate") {
      cols.push(
        {
          title: "Per. 1",
          dataIndex: "indicator1",
          key: "indicator1",
          render: (_: unknown, record: Student) => {
            return (
              <Button
                type="button"
                onClick={() =>
                  handleGenerateOrRedirect({
                    reportType: option?.type ?? "student-certificate",
                    groupId: Number(groupId),
                    studentId: Number(record.id_student),
                    periodId: 1,
                  })
                }
              >
                <Edit size={16} />
              </Button>
            );
          },
        },
        {
          title: "Per. 2",
          dataIndex: "indicator2",
          key: "indicator2",
          render: (_: unknown, record: Student) => {
            return (
              <Button
                type="button"
                onClick={() =>
                  handleGenerateOrRedirect({
                    reportType: option?.type ?? "student-certificate",
                    groupId: Number(groupId),
                    studentId: Number(record.id_student),
                    periodId: 2,
                  })
                }
              >
                <Edit size={16} />
              </Button>
            );
          },
        },
        {
          title: "Per. 3",
          dataIndex: "indicator3",
          key: "indicator3",
          render: (_: unknown, record: Student) => {
            return (
              <Button
                type="button"
                onClick={() =>
                  handleGenerateOrRedirect({
                    reportType: option?.type ?? "student-certificate",
                    groupId: Number(groupId),
                    studentId: Number(record.id_student),
                    periodId: 3,
                  })
                }
              >
                <Edit size={16} />
              </Button>
            );
          },
        },
        {
          title: "Per. 4",
          dataIndex: "indicator4",
          key: "indicator4",
          render: (_: unknown, record: Student) => {
            return (
              <Button
                type="button"
                onClick={() =>
                  handleGenerateOrRedirect({
                    reportType: option?.type ?? "student-certificate",
                    groupId: Number(groupId),
                    studentId: Number(record.id_student),
                    periodId: 4,
                  })
                }
              >
                <Edit size={16} />
              </Button>
            );
          },
        },
      );
    }
    if (option?.type === "student-certificate") {
      cols.push({
        title: "Certificado",
        key: "certificate",
        render: (_: unknown, record: Student) => {
          return (
            <Button
              variant={"outline"}
              type="button"
              onClick={() => handlerSelectStudent(record.id_student)}
            >
              <FileText size={16} />
            </Button>
          );
        },
      });
    }
    return cols;
  }, [option?.type, params]);

  const yearsColumns = [
    {
      title: "Año",
      dataIndex: "name",
      key: "name",
      render: (_: unknown, record: ScholarYear) => {
        return (
          <div>
            <Button
              className="cursor-pointer"
              type="button"
              onClick={() => {
                const currentParams = new URLSearchParams(params.toString());
                currentParams.set("year", String(record.id_year));
                router.push(`${pathname}?${currentParams.toString()}`);
              }}
            >
              {record.id_year}
            </Button>
          </div>
        );
      },
    },
    {
      title: "Rector",
      dataIndex: "rector",
      key: "rector",
    },
    {
      title: "Secretario",
      dataIndex: "secretary",
      key: "secretary",
    },
  ];

  if (!option) {
    return (
      <ContainerComponents>
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            Opción de entregable no válida
          </p>
        </div>
      </ContainerComponents>
    );
  }

  const handleGenerateOrRedirect = async ({
    reportType,
    groupId,
    studentId,
    periodId,
  }: {
    reportType: string;
    groupId: number;
    studentId: number;
    periodId: number;
  }) => {
    if (reportType === "configurable-reports") {
      const currentParams = new URLSearchParams(params.toString());
      currentParams.set("student", String(studentId));
      currentParams.set("period", String(periodId));
      router.push(`${pathname}?${currentParams.toString()}`);
      return;
    }
    startTransition(() => {
      action({
        reportType: reportType,
        groupId: Number(groupId),
        studentId: Number(studentId),
        periodId: Number(periodId),
      });
    });
  };

  if (option.type !== "student-certificate" && !groupId && !studentId) {
    return (
      <ContainerComponents>
        <div className="w-full flex items-center justify-between mb-6">
          <h3>
            <strong className="text-xl text-foreground ps-8">
              {option.title}
            </strong>
          </h3>
        </div>
        <div className="space-y-6">
          {/* Botones de acción */}
          <div className="p-5 bg-base-100 rounded-2xl">
            {groups.length ? (
              <Table columns={groupsColumns} data={groups} rowKey="id_group" />
            ) : (
              <div className="text-center py-10 text-sm text-foreground/70">
                No hay grupos registrados para el año seleccionado.
              </div>
            )}
          </div>
        </div>
      </ContainerComponents>
    );
  }
  if (
    option.type === "student-certificate" &&
    !groupId &&
    !studentId &&
    !yearId
  ) {
    return (
      <div className="p-5 bg-base-100 rounded-2xl">
        {years.length ? (
          <Table columns={yearsColumns} data={years} rowKey="id_year" />
        ) : (
          <div className="text-center py-10 text-sm text-foreground/70">
            No hay años escolares registrados.
          </div>
        )}
      </div>
    );
  }
  if (yearId && !groupId && !studentId) {
    return (
      <div className="p-5 bg-base-100 rounded-2xl">
        {groups.length ? (
          <Table columns={groupsColumns} data={groups} rowKey="id_group" />
        ) : (
          <div className="text-center py-10 text-sm text-foreground/70">
            No hay grupos registrados para el año seleccionado.
          </div>
        )}
      </div>
    );
  }
  if (groupId && !studentId) {
    return (
      <div className="p-5 bg-base-100 rounded-2xl">
        {students.length ? (
          <Table
            columns={studentsColumns}
            data={students}
            rowKey="id_student"
          />
        ) : (
          <div className="text-center py-10 text-sm text-foreground/70">
            No hay estudiantes registrados para el grupo seleccionado.
          </div>
        )}
      </div>
    );
  }
  if (studentId && option.type === "student-certificate" && groupId && yearId) {
    const handleGenerateCertificate = async () => {
      startTransition(() => {
        action({
          reportType: option.type,
          groupId: Number(groupId),
          studentId: Number(studentId),
          report_options: {
            showRectorSignature: formData.showRectorSignature,
            showSecretarySignature: formData.showSecretarySignature,
            showGroupProfessorSignature: formData.showGroupProfessorSignature,
            gradeDisplayConfig: formData.gradeDisplayConfig,
            headerTitleSize: formData.headerTitleSize,
            hour: formData.showIntensidadHoraria,
            showLogo: formData.showLogo,
            showHeaderSubtitle: formData.showSubtitleHeader,
            showIdentification: formData.showIdentification,
            qualification_per1: formData.showNotesPeriodOne,
            qualification_per2: formData.showNotesPeriodTwo,
            qualification_per3: formData.showNotesPeriodThree,
            qualification_per4: formData.showNotesPeriodFour,
            qualification_per5: formData.showNotesPeriodFive,
            average_per: formData.showAverageFourPeriods,
          },
        });
      });
    };
    return (
      <div className="p-5 bg-base-100 rounded-2xl">
        <Configuration
          fields={certificateFields}
          onSubmit={handleGenerateCertificate}
          formData={formData}
          onChange={handleChange}
        />
      </div>
    );
  }
  if (
    studentId &&
    option.type === "configurable-reports" &&
    groupId &&
    periodId
  ) {
    const handleGenerateCertificate = async () => {
      startTransition(() => {
        action({
          reportType: option.type,
          groupId: Number(groupId),
          studentId: Number(studentId),
          report_options: {
            professor_course: formData2.professor_course as boolean,
            average_general: formData2.average_general as boolean,
            average_group: formData2.average_group as boolean,
            average_area: formData2.average_area as boolean,
            position: formData2.position as boolean,
            hour: formData2.showIntensidadHoraria as boolean,
            absences: formData2.absences as boolean,
            all_qualifications: formData2.all_qualifications as boolean,
            qualification_per1: formData2.qualification_per1 as boolean,
            qualification_per2: formData2.qualification_per2 as boolean,
            qualification_per3: formData2.qualification_per3 as boolean,
            qualification_per4: formData2.qualification_per4 as boolean,
            average_per: formData2.average_per as boolean,
            showRectorSignature: formData2.showRectorSignature,
            showSecretarySignature: formData2.showSecretarySignature,
            showGroupProfessorSignature: formData2.showGroupProfessorSignature,
          },
        });
      });
    };
    return (
      <div className="p-5 bg-base-100 rounded-2xl">
        <Configuration
          fields={reportConfigurableSchema}
          onSubmit={handleGenerateCertificate}
          formData={formData2}
          onChange={handleChange2}
        />
      </div>
    );
  }
}
