"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Download,
  AlertCircle,
  CheckCircle2,
  Clock,
  Trash2,
  RotateCcw,
} from "lucide-react";
import { ContainerComponents } from "@/components/ContainerComponents";

interface BackupFile {
  id: string;
  name: string;
  date: string;
  size: string;
  status: "success" | "error" | "pending";
}

export function SecurityCopy() {
  const [backups, setBackups] = useState<BackupFile[]>([
    {
      id: "1",
      name: "copia_seguridad/1089/base_de_datos_2025_12_05_06_28.sql.gz",
      date: "2025-12-05 06:28",
      size: "45.2 MB",
      status: "success",
    },
    {
      id: "2",
      name: "copia_seguridad/1089/base_de_datos_2025_12_04_15_30.sql.gz",
      date: "2025-12-04 15:30",
      size: "43.8 MB",
      status: "success",
    },
    {
      id: "3",
      name: "copia_seguridad/1089/base_de_datos_2025_12_03_12_15.sql.gz",
      date: "2025-12-03 12:15",
      size: "44.1 MB",
      status: "success",
    },
  ]);

  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleCreateBackup = async () => {
    setIsCreating(true);
    setError(null);
    setSuccess(null);

    try {
      // Simular creación de backup
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const newBackup: BackupFile = {
        id: String(backups.length + 1),
        name: `copia_seguridad/1089/base_de_datos_${new Date()
          .toISOString()
          .slice(0, 10)}_${new Date().toTimeString().slice(0, 5)}.sql.gz`,
        date: new Date().toLocaleString("es-CO"),
        size: Math.random() * (50 - 40) + 40 + " MB",
        status: "success",
      };

      setBackups([newBackup, ...backups]);
      setSuccess("Copia de seguridad creada exitosamente");
    } catch (err) {
      setError(
        "No se pudo crear la copia de seguridad. Por favor, asegúrese de que dispone de privilegios de escritura."
      );
    } finally {
      setIsCreating(false);
    }
  };

  const handleDownloadBackup = (backup: BackupFile) => {
    // Simular descarga
    console.log("Descargando:", backup.name);
  };

  const handleRestoreBackup = (backup: BackupFile) => {
    // Simular restauración
    console.log("Restaurando:", backup.name);
  };

  const handleDeleteBackup = (id: string) => {
    setBackups(backups.filter((b) => b.id !== id));
  };

  return (
    <ContainerComponents>
      {/* Encabezado */}
      <div className="w-full flex items-center justify-between my-3">
        <h3>
          <strong className="text-xl text-black ps-8">
            Descargar copias de seguridad
          </strong>
        </h3>
      </div>
      {/* Mensaje de error */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="flex gap-3 pt-6">
            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
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
        <Card className="border-green-200 bg-green-50">
          <CardContent className="flex gap-3 pt-6">
            <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
            <p className="font-medium text-green-900">{success}</p>
          </CardContent>
        </Card>
      )}

      {/* Sección de crear nueva copia */}
      <Card className="rounded-box mb-2">
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
              <>
                <Download className="h-4 w-4 mr-2" />
                Descargar nueva copia
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Historial de copias */}
      <div>
        <h2 className="text-lg font-bold text-gray-800 mb-4">
          Anteriores copias de seguridad
        </h2>

        {backups.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <AlertCircle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-600">
                No hay copias de seguridad disponibles
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-main-blue text-white">
                  <th className="px-4 py-3 text-left font-semibold">
                    Copias de base de datos
                  </th>
                  <th className="px-4 py-3 text-left font-semibold">Fecha</th>
                  <th className="px-4 py-3 text-left font-semibold">Tamaño</th>
                  <th className="px-4 py-3 text-center font-semibold">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {backups.map((backup) => (
                  <tr
                    key={backup.id}
                    className="border-b border-gray6  transition-colors"
                  >
                    <td className="px-4 py-3 text-sm text-gray-700 font-mono">
                      <span className="flex items-center gap-2">
                        {backup.status === "success" ? (
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-red-600" />
                        )}
                        {backup.name}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {backup.date}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {backup.size}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          onClick={() => handleDownloadBackup(backup)}
                          variant="ghost"
                          size="sm"
                          className="t "
                          title="Descargar"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          onClick={() => handleRestoreBackup(backup)}
                          variant="ghost"
                          size="sm"
                          className="text-green-600 hover:text-green-800"
                          title="Restaurar"
                        >
                          <RotateCcw className="h-4 w-4" />
                        </Button>
                        <Button
                          onClick={() => handleDeleteBackup(backup.id)}
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-500"
                          title="Eliminar"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </ContainerComponents>
  );
}
