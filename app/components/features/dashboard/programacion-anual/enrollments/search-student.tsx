'use client';

import { ChangeEvent, useActionState, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Student } from '@/app/types';
import { searchStudentsAction } from './actions';
import { StudentActionState, DEFAULT_REVALIDATE_PATH } from './constants';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import Table from '@/app/components/ui/table';
import { Edit, Info, UserMinus } from 'lucide-react';

interface SearchStudentProps {
  revalidatePath?: string;
}

const initialState: StudentActionState = {
  success: false,
  message: '',
  students: [],
};

export function SearchStudent({
  revalidatePath = DEFAULT_REVALIDATE_PATH,
}: SearchStudentProps) {
  const router = useRouter();
  const [name, setName] = useState('');
  const [identification, setIdentification] = useState('');
  const [localState, setLocalState] = useState({ success: false, message: '' });
  const [searchedStudents, setSearchedStudents] = useState<Student[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const wasPendingRef = useRef(false);

  const [state, formAction, isPending] = useActionState(searchStudentsAction, initialState);

  // Procesar resultado solo cuando la acción termina
  useEffect(() => {
    if (wasPendingRef.current && !isPending) {
      if (state.success) {
        setSearchedStudents(state.students || []);
        setLocalState({ success: true, message: state.message });
        setHasSearched(true);
      } else if (state.message) {
        setLocalState({ success: false, message: state.message });
        setSearchedStudents([]);
      }
    }
    wasPendingRef.current = isPending;
  }, [isPending, state]);

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleIdentificationChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIdentification(event.target.value);
  };

  const studentsColumns = useMemo(
    () => [
      {
        title: 'Apellido y Nombre',
        key: 'fullName',
        render: (_: unknown, record: Student) =>
          `${record.last_name || ''} ${record.name || ''}`,
      },
      {
        title: 'Identificación',
        dataIndex: 'identification',
        key: 'identification',
      },
      {
        title: 'Teléfono',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: 'Estado',
        key: 'status',
        render: (_: unknown, record: Student) => (
          <span
            className={`badge ${
              record.status === 'active' ? 'badge-success' : 'badge-warning'
            }`}
          >
            {record.status === 'active' ? 'Activo' : record.status || 'N/A'}
          </span>
        ),
      },
      {
        title: 'Info',
        key: 'info',
        render: (_: unknown, record: Student) => (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => router.push(`/dashboard/estudiante/${record.id_student}`)}
            title="Ver información del estudiante"
          >
            <Info size={16} />
          </Button>
        ),
      },
      {
        title: 'Acciones',
        key: 'actions',
        render: (_: unknown, record: Student) => (
          <div className="flex items-center justify-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                router.push(`${revalidatePath}?opcion=1&studentId=${record.id_student}`)
              }
              title="Editar estudiante"
            >
              <Edit size={16} />
            </Button>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={() => handleRemoveStudent(record.id_student)}
              title="Retirar estudiante"
            >
              <UserMinus size={16} />
            </Button>
          </div>
        ),
      },
    ],
    [router, revalidatePath]
  );

  const handleRemoveStudent = (idStudent: number) => {
    // TODO: Implementar remoción de estudiante
    console.log('Retirar estudiante:', idStudent);
  };

  const isSearchDisabled = !name.trim() && !identification.trim();

  return (
    <div className="space-y-6">
      {/* Formulario de búsqueda */}
      <div className="w-full flex flex-col items-center">
        <div className="w-full max-w-2xl bg-base-100 rounded-2xl p-6 shadow-sm">
          <p className="text-center text-foreground mb-4">
            Ingrese la identificación-código del estudiante o parte del nombre o
            apellido para realizar la búsqueda.
          </p>

          <form action={formAction} className="space-y-4">
            <input type="hidden" name="revalidatePath" value={revalidatePath} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                name="name"
                label="Nombre o Apellido"
                placeholder="Nombre o apellido del estudiante"
                value={name}
                onChange={handleNameChange}
              />
              <Input
                name="identification"
                label="Identificación"
                placeholder="Número de identificación"
                value={identification}
                onChange={handleIdentificationChange}
              />
            </div>

            {localState.message && !localState.success && (
              <div className="alert alert-error text-sm">{localState.message}</div>
            )}

            <div className="flex justify-center">
              <Button type="submit" disabled={isPending || isSearchDisabled}>
                {isPending ? 'Buscando...' : 'Buscar Estudiante'}
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Resultados */}
      {hasSearched && (
        <div className="w-full bg-base-100 rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-center mb-4 text-foreground">
            Resultados de la búsqueda
          </h3>

          {localState.success && (
            <p className="text-center text-sm text-foreground/70 mb-4">
              {localState.message}
            </p>
          )}

          {searchedStudents.length > 0 ? (
            <Table
              columns={studentsColumns}
              data={searchedStudents}
              rowKey="id_student"
            />
          ) : (
            <p className="text-center text-foreground/70 py-10">
              No se encontraron estudiantes con los criterios de búsqueda.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
