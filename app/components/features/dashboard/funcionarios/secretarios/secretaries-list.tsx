'use client';

import { useMemo, useState } from 'react';
import { Space } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Teacher } from '@/app/types';
import { ContainerComponents } from '@/app/components/shared/container';
import Table from '@/app/components/ui/table';
import { Input } from '@/app/components/ui/input';
import Modal from '@/app/components/ui/modal';
import { SecretaryForm } from './secretary-form';
import { SecretaryDeleteModal } from './secretary-delete-modal';

interface SecretariesListProps {
  secretaries: Teacher[];
}

const emptySecretary: Teacher = {
  id_teacher: 0,
  name: '',
  last_name: '',
  type_id: 2,
  identification: '',
  direction: '',
  phone: '',
  email: '',
  degree: '',
};

export function SecretariesList({ secretaries }: SecretariesListProps) {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedSecretary, setSelectedSecretary] = useState<Teacher>(emptySecretary);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSecretaries = useMemo(() => {
    const filteredByType = secretaries.filter(secretary => secretary.type_id === 2);

    if (!searchTerm) {
      return filteredByType;
    }

    const term = searchTerm.toLowerCase();
    return filteredByType.filter(secretary => {
      const fullName = `${secretary.name ?? ''} ${secretary.last_name ?? ''}`.toLowerCase();
      const identification = secretary.identification ? secretary.identification.toString().toLowerCase() : '';
      return fullName.includes(term) || identification.includes(term);
    });
  }, [secretaries, searchTerm]);

  const handleCreate = () => {
    setSelectedSecretary(emptySecretary);
    setOpen(true);
  };

  const handleEdit = (secretary: Teacher) => {
    setSelectedSecretary(secretary);
    setOpen(true);
  };

  const handleDeleteClick = (secretary: Teacher) => {
    setSelectedSecretary(secretary);
    setOpenDelete(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedSecretary(emptySecretary);
  };

  const columns = [
    { title: 'Nombre', dataIndex: 'name', key: 'name' },
    { title: 'Grado', dataIndex: 'degree', key: 'degree' },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_: unknown, record: Teacher) => (
        <Space size="middle">
          <button className="border-0 bg-transparent cursor-pointer" onClick={() => handleEdit(record)}>
            <EditOutlined style={{ color: '#0055A6', fontSize: '20px' }} />
          </button>
          <button className="border-0 bg-transparent cursor-pointer" onClick={() => handleDeleteClick(record)}>
            <DeleteOutlined style={{ color: '#e11d48', fontSize: '20px' }} />
          </button>
        </Space>
      ),
    },
  ];

  return (
    <ContainerComponents>
      <div className="w-full flex items-center justify-between my-3">
        <h3>
          <strong className="text-xl text-foreground ps-8">Lista de Secretarios</strong>
        </h3>
        <div className="flex items-center gap-2">
          <Input
            type="text"
            className="grow"
            placeholder="Buscar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={handleCreate}
            className="btn btn-sm bg-main-blue mb-0 px-10 h-9 rounded-[10px] transition border-none hover:bg-[#0b5ed7] text-white text-xs"
          >
            Crear secretario
          </button>
        </div>
      </div>

      <div className="p-5 bg-base-100 rounded-2xl">
        {filteredSecretaries.length > 0 ? (
          <Table columns={columns} data={filteredSecretaries} rowKey="id_teacher" />
        ) : (
          <p className="text-sm text-muted-foreground">¡No hay secretarios registrados!</p>
        )}
      </div>

      <Modal open={open} title={selectedSecretary.id_teacher ? 'Editar Secretario' : 'Crear Secretario'}>
        <SecretaryForm secretary={selectedSecretary} onClose={handleCloseModal} />
      </Modal>

      <SecretaryDeleteModal
        open={openDelete}
        secretary={selectedSecretary}
        onClose={() => setOpenDelete(false)}
      />
    </ContainerComponents>
  );
}
