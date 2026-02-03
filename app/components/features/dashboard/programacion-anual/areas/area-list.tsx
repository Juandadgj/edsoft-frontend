'use client';

import { useMemo, useState } from 'react';
import { Area } from '@/app/types';
import { ContainerComponents } from '@/app/components/shared/container';
import { Input } from '@/app/components/ui/input';
import Table from '@/app/components/ui/table';
import Modal from '@/app/components/ui/modal';
import { AreaForm } from './area-form';
import { AreaDeleteModal } from './area-delete-modal';
import { DEFAULT_REVALIDATE_PATH } from './constants';

interface AreaListProps {
  areas: Area[];
  revalidatePath?: string;
}

export function AreaList({ areas, revalidatePath = DEFAULT_REVALIDATE_PATH }: AreaListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState<Area | null>(null);

  const filtered = useMemo(() => {
    if (!searchTerm.trim()) {
      return areas;
    }

    const term = searchTerm.toLowerCase();
    return areas.filter((item) => (item.name ?? '').toLowerCase().includes(term));
  }, [searchTerm, areas]);

  const columns = useMemo(
    () => [
      { title: 'Nombre', dataIndex: 'name', key: 'name' },
      {
        title: 'Estado',
        dataIndex: 'status',
        key: 'status',
        render: (_: unknown, record: Area) => (
          <span className={record.status === 'active' ? 'text-success' : 'text-warning'}>
            {record.status === 'active' ? 'Activo' : 'Inactivo'}
          </span>
        ),
      },
      {
        title: 'Editar',
        key: 'edit',
        render: (_: unknown, record: Area) => (
          <button
            type="button"
            className="btn btn-ghost btn-sm text-main-blue"
            onClick={() => {
              setSelectedArea(record);
              setIsFormOpen(true);
            }}
          >
            Editar
          </button>
        ),
      },
      {
        title: 'Eliminar',
        key: 'delete',
        render: (_: unknown, record: Area) => (
          <button
            type="button"
            className="btn btn-ghost btn-sm text-error"
            onClick={() => {
              setSelectedArea(record);
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
    setSelectedArea(null);
  };

  return (
    <ContainerComponents>
      <div className="w-full flex flex-wrap items-center justify-between gap-4 my-3">
        <div>
          <strong className="text-xl text-foreground ps-1">Listado de Áreas</strong>
          <p className="text-sm text-foreground/70">Administre las áreas de conocimiento del sistema.</p>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Input
            type="text"
            className="grow"
            placeholder="Buscar por nombre"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <button
            type="button"
            className="btn btn-sm bg-main-blue mb-0 px-6 h-9 rounded-[10px] transition border-none hover:bg-[#0b5ed7] text-white text-xs"
            onClick={() => {
              setSelectedArea(null);
              setIsFormOpen(true);
            }}
          >
            + Nueva Área
          </button>
        </div>
      </div>

      <div className="p-5 bg-base-100 rounded-2xl">
        {filtered.length ? (
          <Table columns={columns} data={filtered} rowKey="id_area" />
        ) : (
          <div className="text-center py-10 text-sm text-foreground/70">
            {searchTerm ? 'No se encontraron áreas con ese criterio.' : 'Aún no hay áreas registradas.'}
          </div>
        )}
      </div>

      <Modal open={isFormOpen} title={selectedArea ? 'Editar área' : 'Nueva área'}>
        <AreaForm
          area={selectedArea}
          revalidatePath={revalidatePath}
          onClose={closeForm}
        />
      </Modal>

      <AreaDeleteModal
        open={isDeleteOpen}
        area={selectedArea}
        revalidatePath={revalidatePath}
        onClose={() => {
          setIsDeleteOpen(false);
          setSelectedArea(null);
        }}
      />
    </ContainerComponents>
  );
}
