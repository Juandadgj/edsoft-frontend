"use client";

import { startTransition, useActionState, useMemo, useState } from "react";
import { ScholarYear } from "@/app/types";
import { ContainerComponents } from "@/app/components/shared/container";
import Table from "@/app/components/ui/table";
import { Input } from "@/app/components/ui/input";
import Modal from "@/app/components/ui/modal";
import { SetYearForm } from "./set-year-form";
import { selectScholarYearAction } from "./actions";
import { DEFAULT_REVALIDATE_PATH } from "./constants";

interface SetYearListProps {
  scholarYears: ScholarYear[];
  selectedYearId: number | null;
  revalidatePath?: string;
}

export function SetYearList({
  scholarYears,
  selectedYearId,
  revalidatePath = DEFAULT_REVALIDATE_PATH,
}: SetYearListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingYear, setEditingYear] = useState<ScholarYear | null>(null);
  const [detailYear, setDetailYear] = useState<ScholarYear | null>(null);

  const selectYear = useMemo(() => selectScholarYearAction, []);

  const filteredYears = useMemo(() => {
    if (!searchTerm.trim()) {
      return scholarYears;
    }

    const term = searchTerm.toLowerCase();
    return scholarYears.filter((year) => {
      return (
        String(year.id_year).includes(term) ||
        (year.rector ?? "").toLowerCase().includes(term) ||
        (year.secretary ?? "").toLowerCase().includes(term) ||
        (year.comment ?? "").toLowerCase().includes(term)
      );
    });
  }, [scholarYears, searchTerm]);

  const tableData = filteredYears.map((year) => ({
    key: year.id_year,
    id_year: year.id_year,
    selected:
      selectedYearId === year.id_year ? (
        <span className="badge badge-success badge-outline">Actual</span>
      ) : null,
    year: (
      <button
        onClick={() => {
          startTransition(() => {
            selectScholarYearAction(year.id_year);
          });
        }}
        type="submit"
        className="btn btn-link px-0 text-main-blue hover:no-underline"
      >
        {year.id_year}
      </button>
    ),
    rector: year.rector ?? "-",
    secretary: year.secretary ?? "-",
    details: (
      <button
        type="button"
        className="btn btn-ghost btn-sm text-main-blue"
        onClick={() => setDetailYear(year)}
      >
        Ver
      </button>
    ),
    edit: (
      <button
        type="button"
        className="btn btn-ghost btn-sm text-main-blue"
        onClick={() => {
          setEditingYear(year);
          setIsFormOpen(true);
        }}
      >
        Editar
      </button>
    ),
  }));

  const columns = useMemo(
    () => [
      { title: "", dataIndex: "selected", key: "selected", width: 90 },
      { title: "Año", dataIndex: "year", key: "year" },
      { title: "Rector(a)", dataIndex: "rector", key: "rector" },
      { title: "Secretario(a)", dataIndex: "secretary", key: "secretary" },
      { title: "Detalle", dataIndex: "details", key: "details", width: 120 },
      { title: "Editar", dataIndex: "edit", key: "edit", width: 120 },
    ],
    [],
  );

  const existingYears = useMemo(
    () => scholarYears.map((year) => year.id_year),
    [scholarYears],
  );

  const handleCreateClick = () => {
    setEditingYear(null);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingYear(null);
  };

  return (
    <ContainerComponents>
      <div className="w-full flex flex-wrap items-center justify-between gap-4 my-3">
        <div>
          <strong className="text-xl text-foreground ps-1">
            Elegir año académico {selectedYearId ?? "—"}
          </strong>
          <p className="text-sm text-foreground/70">
            Seleccione el año vigente para que se refleje en los demás módulos.
          </p>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Input
            type="text"
            className="grow"
            placeholder="Buscar por año, rector o comentario"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <button
            type="button"
            className="btn btn-sm bg-main-blue mb-0 px-6 h-9 rounded-[10px] transition border-none hover:bg-[#0b5ed7] text-white text-xs"
            onClick={handleCreateClick}
          >
            + Nuevo año
          </button>
        </div>
      </div>

      <div className="p-5 bg-base-100 rounded-2xl">
        {tableData.length ? (
          <Table columns={columns} data={tableData} rowKey="id_year" />
        ) : (
          <div className="text-center py-10 text-sm text-foreground/70">
            {searchTerm
              ? "No se encontraron años académicos con ese criterio."
              : "Aún no hay años académicos registrados."}
          </div>
        )}
      </div>

      <Modal
        open={isFormOpen}
        title={editingYear ? "Editar año académico" : "Nuevo año académico"}
      >
        <SetYearForm
          year={editingYear}
          existingYears={existingYears}
          revalidatePath={revalidatePath}
          onClose={closeForm}
        />
      </Modal>

      <Modal open={Boolean(detailYear)} title="Detalles del año académico">
        {detailYear && (
          <div className="space-y-2 text-sm text-foreground">
            <p>
              <span className="font-semibold">Año:</span> {detailYear.id_year}
            </p>
            <p>
              <span className="font-semibold">Rector(a):</span>{" "}
              {detailYear.rector || "—"}
            </p>
            <p>
              <span className="font-semibold">Secretario(a):</span>{" "}
              {detailYear.secretary || "—"}
            </p>
            <p>
              <span className="font-semibold">Comentarios:</span>{" "}
              {detailYear.comment || "Sin comentarios"}
            </p>
            <div className="flex justify-end">
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => setDetailYear(null)}
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
        {!detailYear && (
          <div className="text-center text-sm text-foreground/70">
            Sin información para mostrar.
          </div>
        )}
      </Modal>
    </ContainerComponents>
  );
}
