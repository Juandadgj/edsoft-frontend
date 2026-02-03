'use client';

import { useState } from 'react';
import { Space } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Teacher } from '@/app/types';
import { ContainerComponents } from '@/app/components/shared/container';
import Table from '@/app/components/ui/table';
import { Input } from '@/app/components/ui/input';
import Modal from '@/app/components/ui/modal';
import { TeacherForm } from './teacher-form';
import { TeacherDeleteModal } from './teacher-delete-modal';

interface TeachersListProps {
  teachers: Teacher[];
}

const emptyTeacher: Teacher = {
  id_teacher: 0,
  name: '',
  last_name: '',
  type_id: 1,
  identification: '',
  direction: '',
  phone: '',
  email: '',
  degree: '',
};

export function TeachersList({ teachers }: TeachersListProps) {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher>(emptyTeacher);
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleCreate = () => {
    setSelectedTeacher(emptyTeacher);
    setOpen(true);
  };

  const handleEdit = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setOpen(true);
  };

  const handleDeleteClick = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setOpenDelete(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedTeacher(emptyTeacher);
  };

  const filteredTeachers = searchTerm
    ? teachers.filter(t =>
        t.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.last_name?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : teachers;

  return (
    <ContainerComponents>
      <div className="w-full flex items-center justify-between my-3">
        <h3>
          <strong className="text-xl text-foreground ps-8">Lista de Docentes</strong>
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
            Crear docente
          </button>
        </div>
      </div>

      <div className="p-5 bg-base-100 rounded-2xl">
        <Table columns={columns} data={filteredTeachers} rowKey="id_teacher" />
      </div>

      <Modal open={open} title={selectedTeacher.id_teacher ? 'Editar Docente' : 'Crear Docente'}>
        <TeacherForm teacher={selectedTeacher} onClose={handleCloseModal} />
      </Modal>

      <TeacherDeleteModal
        open={openDelete}
        teacher={selectedTeacher}
        onClose={() => setOpenDelete(false)}
      />
    </ContainerComponents>
  );
}
