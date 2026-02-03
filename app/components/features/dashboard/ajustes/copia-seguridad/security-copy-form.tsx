'use client';

import { useState, useActionState } from 'react';
import {
  Download,
  AlertCircle,
  CheckCircle2,
  Clock,
  Trash2,
  RotateCcw,
} from 'lucide-react';
import { ContainerComponents } from '@/app/components/shared/container';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import type { BackupFile } from './constants';
import { createBackupAction, deleteBackupAction } from './actions';

interface SecurityCopyFormProps {
  initialBackups?: BackupFile[];
  revalidatePath?: string;
}

const initialState = { success: false, message: '' };

// Mock data para demostración
const MOCK_BACKUPS: BackupFile[] = [
  {
    id: '1',
    name: 'copia_seguridad/1089/base_de_datos_2025_12_05_06_28.sql.gz',
    date: '2025-12-05 06:28',
    size: '45.2 MB',
    status: 'success',
  },
  {
    id: '2',
    name: 'copia_seguridad/1089/base_de_datos_2025_12_04_15_30.sql.gz',
    date: '2025-12-04 15:30',
    size: '43.8 MB',
    status: 'success',
  },
  {
    id: '3',
    name: 'copia_seguridad/1089/base_de_datos_2025_12_03_12_15.sql.gz',
    date: '2025-12-03 12:15',
    size: '44.1 MB',
    status: 'success',
  },
];

export function SecurityCopyForm({ 
  initialBackups = MOCK_BACKUPS,
  revalidatePath = '/dashboard/ajustes/copia-seguridad',
}: SecurityCopyFormProps) {
  const [backups, setBackups] = useState<BackupFile[]>(initialBackups);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const [createState, createAction, isCreating] = useActionState(createBackupAction, initialState);

  const handleCreateBackup = async () => {
    setError(null);
    setSuccess(null);

    // Simular creación de backup local mientras backend no está listo
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const newBackup: BackupFile = {
        id: String(backups.length + 1),
        name: `copia_seguridad/1089/base_de_datos_${new Date()
          .toISOString()
          .slice(0, 10)}_${new Date().toTimeString().slice(0, 5).replace(':', '_')}.sql.gz`,
        date: new Date().toLocaleString('es-CO'),
        size: (Math.random() * (50 - 40) + 40).toFixed(1) + ' MB',
        status: 'success',
      };

      setBackups([newBackup, ...backups]);
      setSuccess('Copia de seguridad creada exitosamente');
    } catch (err) {
      setError('No se pudo crear la copia de seguridad. Por favor, asegúrese de que dispone de privilegios de escritura.');
    }
  };

  const handleDownloadBackup = (backup: BackupFile) => {
    // TODO: Implementar descarga real
    console.log('Descargando:', backup.name);
    alert('Funcionalidad de descarga pendiente de implementación');
  };

  const handleRestoreBackup = (backup: BackupFile) => {
    // TODO: Implementar restauración real
    console.log('Restaurando:', backup.name);
    alert('Funcionalidad de restauración pendiente de implementación');
  };

  const handleDeleteBackup = (id: string) => {
    setBackups(backups.filter((b) => b.id !== id));
    setSuccess('Copia de seguridad eliminada');
  };

  return (
    <ContainerComponents>
      {/* Encabezado */}
      <div className="w-full flex items-center justify-between my-3">
        <h3>
          <strong className="text-xl text-foreground ps-8">
            Descargar copias de seguridad
          </strong>
        </h3>
      </div>

      {/* Mensaje de error */}
      {error && (
        <Card className="border-red-200 bg-red-50 mb-4">
          <CardContent className="flex gap-3 pt-6">
            <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-red-900">
                Error al crear copia de seguridad
              </p>
              <p className="text-sm text-red-800 mt-1">{error}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Mensaje de éxito */}
      {success && (
        <Card className="border-green-200 bg-green-50 mb-4">
          <CardContent className="flex gap-3 pt-6">
            <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
            <p className="font-medium text-green-900">{success}</p>
          </CardContent>
        </Card>
      )}

      {/* Sección de crear nueva copia */}
      <Card className="rounded-box mb-4">
        <CardHeader>
          <CardTitle>Nueva copia de seguridad</CardTitle>
          <CardDescription>
            Crea una nueva copia de seguridad de tu base de datos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={handleCreateBackup}
            disabled={isCreating}
            className="w-full bg-main-blue hover:bg-main-blue/50 text-white font-medium py-2 rounded-md"
          >
            {isCreating ? (
              <>
                <Clock className="h-4 w-4 mr-2 animate-spin" />
                Creando copia de seguridad...
              </>
            ) : (
              'Crear nueva copia de seguridad'
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Lista de copias de seguridad */}
      <Card className="rounded-box">
        <CardHeader>
          <CardTitle>Copias de seguridad existentes</CardTitle>
          <CardDescription>
            Gestiona tus copias de seguridad anteriores
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th className="text-left">Nombre</th>
                  <th className="text-left">Fecha</th>
                  <th className="text-left">Tamaño</th>
                  <th className="text-left">Estado</th>
                  <th className="text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {backups.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-muted-foreground">
                      No hay copias de seguridad disponibles
                    </td>
                  </tr>
                ) : (
                  backups.map((backup) => (
                    <tr key={backup.id}>
                      <td className="text-sm truncate max-w-xs">{backup.name}</td>
                      <td className="text-sm">{backup.date}</td>
                      <td className="text-sm">{backup.size}</td>
                      <td>
                        <span className={`badge ${
                          backup.status === 'success' 
                            ? 'badge-success' 
                            : backup.status === 'error'
                            ? 'badge-error'
                            : 'badge-warning'
                        }`}>
                          {backup.status === 'success' ? 'Completado' : 
                           backup.status === 'error' ? 'Error' : 'Pendiente'}
                        </span>
                      </td>
                      <td className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDownloadBackup(backup)}
                            title="Descargar"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRestoreBackup(backup)}
                            title="Restaurar"
                          >
                            <RotateCcw className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteBackup(backup.id)}
                            title="Eliminar"
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
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
