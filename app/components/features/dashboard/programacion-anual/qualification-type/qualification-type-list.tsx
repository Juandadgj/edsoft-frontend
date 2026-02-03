'use client';

import { useMemo, useState } from 'react';
import { TypeQualification } from '@/app/types';
import { ContainerComponents } from '@/app/components/shared/container';
import { Input } from '@/app/components/ui/input';
import Table from '@/app/components/ui/table';
import Modal from '@/app/components/ui/modal';
import { QualificationTypeForm } from './qualification-type-form';
import { QualificationTypeDeleteModal } from './qualification-type-delete-modal';
import { DEFAULT_REVALIDATE_PATH } from './constants';

interface QualificationTypeListProps {
  typeQualifications: TypeQualification[];
  revalidatePath?: string;
}

export function QualificationTypeList({ typeQualifications, revalidatePath = DEFAULT_REVALIDATE_PATH }: QualificationTypeListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<TypeQualification | null>(null);

  const filtered = useMemo(() => {
    if (!searchTerm.trim()) {
      return typeQualifications;
    }

    const term = searchTerm.toLowerCase();
    return typeQualifications.filter((item) => {
      return (
        (item.name ?? '').toLowerCase().includes(term) ||
        `${item.floor_score ?? ''}`.includes(term) ||
        `${item.ceiling_score ?? ''}`.includes(term) ||
        `${item.year ?? ''}`.includes(term)
      );
    });
  }, [searchTerm, typeQualifications]);

  const columns = useMemo(
    () => [
      { title: 'Nombre', dataIndex: 'name', key: 'name' },
      { title: 'Piso', dataIndex: 'floor_score', key: 'floor_score' },
      { title: 'Techo', dataIndex: 'ceiling_score', key: 'ceiling_score' },
      { title: 'Año', dataIndex: 'year', key: 'year' },
      {
        title: 'Eliminar',
        key: 'delete',
        render: (_: unknown, record: TypeQualification) => (
          <button
            type="button"
            className="btn btn-ghost btn-sm text-error"
            onClick={() => {
              setSelectedType(record);
              setIsDeleteOpen(true);
            }}
          >
            Eliminar
          </button>
        ),
      },
    ],
    []
  );

  const closeForm = () => {
    setIsFormOpen(false);
    setSelectedType(null);
  };

  return (
    <ContainerComponents>
      <div className="w-full flex flex-wrap items-center justify-between gap-4 my-3">
        <div>
          <strong className="text-xl text-foreground ps-1">Tipos de calificación</strong>
          <p className="text-sm text-foreground/70">Administre los rangos de notas utilizados en el sistema.</p>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Input
            type="text"
            className="grow"
            placeholder="Buscar por nombre o año"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <button
            type="button"
            className="btn btn-sm bg-main-blue mb-0 px-6 h-9 rounded-[10px] transition border-none hover:bg-[#0b5ed7] text-white text-xs"
            onClick={() => {
              setSelectedType(null);
              setIsFormOpen(true);
            }}
          >
            + Nuevo tipo
          </button>
        </div>
      </div>

      <div className="p-5 bg-base-100 rounded-2xl">
        {filtered.length ? (
          <Table columns={columns} data={filtered} rowKey="id_type_qual" />
        ) : (
          <div className="text-center py-10 text-sm text-foreground/70">
            {searchTerm ? 'No se encontraron tipos de calificación con ese criterio.' : 'Aún no hay tipos de calificación registrados.'}
          </div>
        )}
      </div>

      <Modal open={isFormOpen} title={selectedType ? 'Editar tipo de calificación' : 'Nuevo tipo de calificación'}>
        <QualificationTypeForm
          typeQualification={selectedType}
          revalidatePath={revalidatePath}
          onClose={closeForm}
        />
      </Modal>

      <QualificationTypeDeleteModal
        open={isDeleteOpen}
        typeQualification={selectedType}
        revalidatePath={revalidatePath}
        onClose={() => {
          setIsDeleteOpen(false);
          setSelectedType(null);
        }}
      />
    </ContainerComponents>
  );
}
