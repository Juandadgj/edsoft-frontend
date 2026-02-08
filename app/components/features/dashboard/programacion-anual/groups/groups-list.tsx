'use client';

import { useMemo, useState } from 'react';
import { Space } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Group, Teacher } from '@/app/types';
import { ContainerComponents } from '@/app/components/shared/container';
import Table from '@/app/components/ui/table';
import { Input } from '@/app/components/ui/input';
import Modal from '@/app/components/ui/modal';
import { GroupForm } from './group-form';
import { GroupDeleteModal } from './group-delete-modal';
import { getCourseLevel } from '@/app/shared/course-level';
import { DEFAULT_REVALIDATE_PATH } from './constants';
import { buildTeacherLookup, formatGroupName, formatWorkingTime } from '@/app/shared/formats';

interface GroupsListProps {
  groups: Group[];
  teachers: Teacher[];
  selectedYearId: number | null;
  revalidatePath?: string;
}

export function GroupsList({ groups, teachers, selectedYearId, revalidatePath = DEFAULT_REVALIDATE_PATH }: GroupsListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState<Group | null>(null);
  const [groupToDelete, setGroupToDelete] = useState<Group | null>(null);

  const teacherLookup = useMemo(() => buildTeacherLookup(teachers), [teachers]);

  const filteredGroups = useMemo(() => {
    if (!searchTerm.trim()) {
      return groups;
    }

    const term = searchTerm.toLowerCase();
    return groups.filter((group) => {
      const name = formatGroupName(group).toLowerCase();
      const workingTime = formatWorkingTime(group.working_time).toLowerCase();
      const coursesCount = String(group.coursesCount ?? 0);
      const representativeRaw = group.representative ? String(group.representative) : '';
      const representativeId = Number(representativeRaw);
      const representativeName = teacherLookup.get(representativeId);
      const representative = (representativeName || representativeRaw).toLowerCase();

      return (
        name.includes(term) ||
        workingTime.includes(term) ||
        coursesCount.includes(term) ||
        representative.includes(term)
      );
    });
  }, [groups, searchTerm, teacherLookup]);

  const handleCreate = () => {
    setEditingGroup(null);
    setIsFormOpen(true);
  };

  const handleEdit = (group: Group) => {
    setEditingGroup(group);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (group: Group) => {
    setGroupToDelete(group);
    setIsDeleteOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingGroup(null);
  };

  const handleCloseDelete = () => {
    setIsDeleteOpen(false);
    setGroupToDelete(null);
  };

  const columns = [
    {
      title: 'Curso',
      dataIndex: 'name',
      key: 'name',
      render: (_: unknown, record: Group) => formatGroupName(record),
    },
    {
      title: 'Jornada',
      dataIndex: 'working_time',
      key: 'working_time',
      render: (_: unknown, record: Group) => formatWorkingTime(record.working_time),
    },
    {
      title: 'Asignaturas',
      dataIndex: 'coursesCount',
      key: 'coursesCount',
      render: (_: unknown, record: Group) => record.coursesCount ?? 0,
    },
    {
      title: 'Profesor del grupo',
      dataIndex: 'representative',
      key: 'representative',
      render: (_: unknown, record: Group) => {
        if (!record.representative) {
          return '-';
        }

        const representativeId = Number(record.representative);
        return teacherLookup.get(representativeId) || record.representative;
      },
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_: unknown, record: Group) => (
        <Space size="middle">
          <button
            className="border-0 bg-transparent cursor-pointer"
            onClick={() => handleEdit(record)}
          >
            <EditOutlined style={{ color: '#0055A6', fontSize: '20px' }} />
          </button>
          <button
            className="border-0 bg-transparent cursor-pointer"
            onClick={() => handleDeleteClick(record)}
          >
            <DeleteOutlined style={{ color: '#e11d48', fontSize: '20px' }} />
          </button>
        </Space>
      ),
    },
  ];

  return (
    <ContainerComponents>
      <div className="w-full flex flex-wrap items-center justify-between gap-4 my-3">
        <div>
          <strong className="text-xl text-foreground ps-1">
            {selectedYearId ? `Grupos del año ${selectedYearId}` : 'Grupos disponibles'}
          </strong>
          {!selectedYearId && (
            <p className="text-sm text-foreground/70">
              Seleccione un año en Programación Anual &gt; Establecer año para crear grupos.
            </p>
          )}
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Input
            type="text"
            className="grow"
            placeholder="Buscar grupo"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <button
            onClick={handleCreate}
            className="btn btn-sm bg-main-blue mb-0 px-6 h-9 rounded-[10px] transition border-none hover:bg-[#0b5ed7] text-white text-xs"
            disabled={!selectedYearId}
          >
            + Nuevo grupo
          </button>
        </div>
      </div>

      <div className="p-5 bg-base-100 rounded-2xl">
        {filteredGroups.length ? (
          <Table columns={columns} data={filteredGroups} rowKey="id_group" />
        ) : (
          <div className="text-center py-10 text-sm text-foreground/70">
            {searchTerm ? 'No se encontraron grupos con ese criterio.' : 'Aún no hay grupos registrados para el año seleccionado.'}
          </div>
        )}
      </div>

      <Modal
        open={isFormOpen}
        title={editingGroup ? 'Editar grupo' : 'Crear grupo'}
      >
        <GroupForm
          key={editingGroup ? editingGroup.id_group : 'new-group'}
          group={editingGroup}
          teachers={teachers}
          selectedYearId={selectedYearId}
          revalidatePath={revalidatePath}
          onClose={handleCloseForm}
        />
      </Modal>

      <GroupDeleteModal
        open={isDeleteOpen}
        group={groupToDelete}
        revalidatePath={revalidatePath}
        onClose={handleCloseDelete}
      />
    </ContainerComponents>
  );
}
