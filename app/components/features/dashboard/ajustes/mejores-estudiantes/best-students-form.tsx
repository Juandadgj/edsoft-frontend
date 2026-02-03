'use client';

import { useState, useActionState } from 'react';
import { Check, RefreshCw } from 'lucide-react';
import { ContainerComponents } from '@/app/components/shared/container';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Checkbox } from 'antd';
import { 
  DEFAULT_BEST_STUDENTS_SETTINGS, 
  type BestStudentsSettings, 
  type BestStudent 
} from './constants';
import { updateBestStudentsSettingsAction, recalculateBestStudentsAction } from './actions';

interface BestStudentsFormProps {
  initialSettings?: BestStudentsSettings;
  initialStudents?: BestStudent[];
  periods?: Array<{ id: number; name: string }>;
  revalidatePath?: string;
}

const initialState = { success: false, message: '' };

// Mock data para demostración
const MOCK_STUDENTS: BestStudent[] = [
  { id: 1, name: 'Ana García', grade: '11°A', average: 4.8, position: 1 },
  { id: 2, name: 'Carlos López', grade: '10°B', average: 4.7, position: 2 },
  { id: 3, name: 'María Rodríguez', grade: '11°B', average: 4.6, position: 3 },
  { id: 4, name: 'Juan Martínez', grade: '9°A', average: 4.5, position: 4 },
  { id: 5, name: 'Laura Sánchez', grade: '10°A', average: 4.5, position: 5 },
];

export function BestStudentsForm({ 
  initialSettings = DEFAULT_BEST_STUDENTS_SETTINGS,
  initialStudents = MOCK_STUDENTS,
  periods = [],
  revalidatePath = '/dashboard/ajustes/mejores-estudiantes',
}: BestStudentsFormProps) {
  const [settings, setSettings] = useState<BestStudentsSettings>(initialSettings);
  const [students] = useState<BestStudent[]>(initialStudents);
  const [selectedPeriod, setSelectedPeriod] = useState<number | null>(null);
  
  const [settingsState, settingsAction, isSettingsPending] = useActionState(updateBestStudentsSettingsAction, initialState);
  const [recalcState, recalcAction, isRecalculating] = useActionState(recalculateBestStudentsAction, initialState);

  return (
    <ContainerComponents>
      <div className="w-full flex items-center justify-between my-3">
        <h3>
          <strong className="text-xl text-foreground ps-8">
            Mejores Estudiantes
          </strong>
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Configuración */}
        <Card className="rounded-box">
          <CardHeader>
            <CardTitle>Configuración</CardTitle>
            <CardDescription>
              Configura los parámetros para mostrar los mejores estudiantes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={settingsAction} className="space-y-4">
              <input type="hidden" name="revalidatePath" value={revalidatePath} />
              <input type="hidden" name="showInPortal" value={String(settings.showInPortal)} />
              <input type="hidden" name="maxStudents" value={String(settings.maxStudents)} />
              <input type="hidden" name="minimumAverage" value={String(settings.minimumAverage)} />

              <div className="flex items-center gap-2">
                <Checkbox
                  checked={settings.showInPortal}
                  onChange={(e) => setSettings({ ...settings, showInPortal: e.target.checked })}
                />
                <span className="text-sm">Mostrar en el portal</span>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Número máximo de estudiantes
                </label>
                <input
                  type="number"
                  value={settings.maxStudents}
                  onChange={(e) => setSettings({ ...settings, maxStudents: Number(e.target.value) })}
                  min={1}
                  max={50}
                  className="w-full p-2 border border-muted-foreground rounded-md bg-base-100 text-foreground"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Promedio mínimo requerido
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={settings.minimumAverage}
                  onChange={(e) => setSettings({ ...settings, minimumAverage: Number(e.target.value) })}
                  min={0}
                  max={5}
                  className="w-full p-2 border border-muted-foreground rounded-md bg-base-100 text-foreground"
                />
              </div>

              <Button
                type="submit"
                disabled={isSettingsPending}
                className="w-full bg-main-blue hover:bg-main-blue/90 text-white"
              >
                <Check className="h-4 w-4 mr-2" />
                {isSettingsPending ? 'Guardando...' : 'Guardar Configuración'}
              </Button>

              {settingsState.message && (
                <div className={`p-3 rounded-md text-sm ${settingsState.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {settingsState.message}
                </div>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Recalcular */}
        <Card className="rounded-box">
          <CardHeader>
            <CardTitle>Recalcular</CardTitle>
            <CardDescription>
              Recalcula los mejores estudiantes para un periodo específico
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={recalcAction} className="space-y-4">
              <input type="hidden" name="revalidatePath" value={revalidatePath} />
              <input type="hidden" name="periodId" value={String(selectedPeriod ?? '')} />

              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Seleccionar Periodo
                </label>
                <select
                  value={selectedPeriod ?? ''}
                  onChange={(e) => setSelectedPeriod(e.target.value ? Number(e.target.value) : null)}
                  className="w-full p-2 border border-muted-foreground rounded-md bg-base-100 text-foreground"
                >
                  <option value="">-- Todos los periodos --</option>
                  {periods.map((period) => (
                    <option key={period.id} value={period.id}>
                      {period.name}
                    </option>
                  ))}
                </select>
              </div>

              <Button
                type="submit"
                disabled={isRecalculating}
                variant="outline"
                className="w-full"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isRecalculating ? 'animate-spin' : ''}`} />
                {isRecalculating ? 'Recalculando...' : 'Recalcular Ahora'}
              </Button>

              {recalcState.message && (
                <div className={`p-3 rounded-md text-sm ${recalcState.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {recalcState.message}
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Lista de mejores estudiantes */}
      <Card className="rounded-box mt-6">
        <CardHeader>
          <CardTitle>Lista de Mejores Estudiantes</CardTitle>
          <CardDescription>
            Estudiantes con mejores promedios académicos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th className="text-center">Posición</th>
                  <th className="text-left">Nombre</th>
                  <th className="text-left">Grado</th>
                  <th className="text-center">Promedio</th>
                </tr>
              </thead>
              <tbody>
                {students.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-8 text-muted-foreground">
                      No hay estudiantes para mostrar
                    </td>
                  </tr>
                ) : (
                  students.map((student) => (
                    <tr key={student.id}>
                      <td className="text-center font-bold">{student.position}</td>
                      <td>{student.name}</td>
                      <td>{student.grade}</td>
                      <td className="text-center">
                        <span className="badge badge-success">{student.average.toFixed(1)}</span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </ContainerComponents>
  );
}
