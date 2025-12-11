"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { ContainerComponents } from "@/components/ContainerComponents";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "antd";

interface MenuItemSetting {
  id: string;
  label: string;
  visible: boolean;
}

interface DefaultDataSettings {
  menuItems: MenuItemSetting[];
}

interface DefaultDataItem {
  id: string;
  label: string;
  checked: boolean;
}

interface DefaultDataSection {
  title: string;
  items: DefaultDataItem[];
}

// Items disponibles del menú que pueden ser mostrados/ocultados
const AVAILABLE_MENU_ITEMS = [
  { id: "funcionarios", label: "Funcionarios", icon: "👥" },
  { id: "programacion", label: "Programación Anual", icon: "📅" },
  { id: "proceso-academico", label: "Proceso Académico", icon: "📚" },
  { id: "reportes", label: "Reportes", icon: "📊" },
  { id: "ajustes", label: "Ajustes", icon: "⚙️" },
];

const DEFAULT_DATA_SECTIONS: DefaultDataSection[] = [
  {
    title: "Predeterminar datos",
    items: [
      { id: "logos", label: "Activar los logos", checked: true },
      {
        id: "muro-mensajes",
        label: "Activar el Muro de mensajes",
        checked: true,
      },
      {
        id: "lista-asignaturas",
        label: "Activar la vista de lista de asignaturas con sus docentes",
        checked: true,
      },
      {
        id: "vista-eventos",
        label: "Activar la vista de la lista de eventos",
        checked: true,
      },
      {
        id: "notas-estudiantes",
        label: "Activar la vista de las notas de los estudiantes en su usuario",
        checked: true,
      },
      {
        id: "encuesta-portal",
        label: 'Activar la encuesta "¿Que parece el portal del colegio?"',
        checked: true,
      },
      {
        id: "personal-colegio",
        label:
          "Activar la vista del personal del colegio (Rector, secretario y docentes)",
        checked: true,
      },
      {
        id: "publicaciones-docentes",
        label: "Activar la vista de las publicaciones de los docentes",
        checked: true,
      },
      { id: "nota-minima", label: "Nota Mínima", checked: true },
      {
        id: "indicadores-logros",
        label: "Activar los indicadores de logros",
        checked: true,
      },
      {
        id: "mensajes-acudientes",
        label: "Activar mensajes de estudiantes a acudidor",
        checked: false,
      },
      {
        id: "estatus-general",
        label: "Activar la vista de estatus general",
        checked: true,
      },
      {
        id: "mejores-curso",
        label: "Activar la vista de los mejores por curso",
        checked: true,
      },
      {
        id: "pagos-estudiantes",
        label: "Activar la vista de los pagos de los estudiantes en su usuario",
        checked: true,
      },
      {
        id: "calculo-automatico",
        label:
          "Haga Click aquí para volver a cero las votaciones de la encuesta (79 votantes)",
        checked: false,
      },
      {
        id: "auditar-publicaciones",
        label: "Auditar las publicaciones de los docentes",
        checked: false,
      },
      { id: "menu-dinamico", label: "Menu Dinámico", checked: false },
    ],
  },
  {
    title: "Permisos para docentes",
    items: [
      { id: "ingresar-logos", label: "Ingresar logos", checked: true },
      { id: "calificar-p1", label: "Calificar período uno", checked: true },
      { id: "calificar-p2", label: "Calificar período dos", checked: true },
      { id: "calificar-p3", label: "Calificar período tres", checked: true },
      { id: "calificar-pf", label: "Calificar período final", checked: true },
      {
        id: "imprimir-boletin",
        label: "Imprimir boletín Profesor de grupo",
        checked: true,
      },
      { id: "editar-logos", label: "Editar logos", checked: true },
      {
        id: "calificar-p2-docentes",
        label: "Calificar período dos",
        checked: true,
      },
      { id: "calificar-p4", label: "Calificar período cuatro", checked: true },
      { id: "editar-notas", label: "Editar notas", checked: true },
    ],
  },
];

export function DefaultDataSettings() {
  const [settings, setSettings] = useState<DefaultDataSettings>({
    menuItems: AVAILABLE_MENU_ITEMS.map((item) => ({
      id: item.id,
      label: item.label,
      visible: true,
    })),
  });

  const [tempSettings, setTempSettings] = useState<DefaultDataSettings>(
    settings
  );
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [sections, setSections] = useState<DefaultDataSection[]>(
    DEFAULT_DATA_SECTIONS
  );

  const handleToggleItem = (itemId: string) => {
    setTempSettings({
      ...tempSettings,
      menuItems: tempSettings.menuItems.map((item) =>
        item.id === itemId ? { ...item, visible: !item.visible } : item
      ),
    });
  };

  const handleSelectAll = () => {
    setTempSettings({
      ...tempSettings,
      menuItems: tempSettings.menuItems.map((item) => ({
        ...item,
        visible: true,
      })),
    });
  };

  const handleDeselectAll = () => {
    setTempSettings({
      ...tempSettings,
      menuItems: tempSettings.menuItems.map((item) => ({
        ...item,
        visible: false,
      })),
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simular guardado - reemplazar con API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSettings(tempSettings);
    setIsEditing(false);
    setIsSaving(false);
  };

  const handleCancel = () => {
    setTempSettings(settings);
    setIsEditing(false);
  };

  const visibleCount = tempSettings.menuItems.filter((item) => item.visible)
    .length;
  const totalCount = tempSettings.menuItems.length;

  const handleToggleSectionItem = (sectionIndex: number, itemIndex: number) => {
    const newSections = [...sections];
    newSections[sectionIndex].items[itemIndex].checked = !newSections[
      sectionIndex
    ].items[itemIndex].checked;
    setSections(newSections);
  };

  return (
    <ContainerComponents>
      <div className="space-y-8">
        {sections.map((section, sectionIndex) => (
          <div key={section.title}>
            <div className="w-full flex items-center justify-between my-3">
              <h3>
                <strong className="text-xl text-black ps-8">
                  {section.title}
                </strong>
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {section.items.map((item, itemIndex) => (
                <div key={item.id} className="flex items-start gap-3">
                  <Checkbox
                    id={item.id}
                    checked={item.checked}
                    onChange={() =>
                      handleToggleSectionItem(sectionIndex, itemIndex)
                    }
                    className="mt-1 h-5 w-5 accent-purple-600"
                  />
                  <label
                    htmlFor={item.id}
                    className="text-sm font-medium text-gray-700 leading-relaxed cursor-pointer hover:text-gray-900 transition-colors"
                  >
                    {item.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Botón de guardar */}
      <div className="mt-8 flex justify-center">
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-2 rounded-md font-medium"
        >
          {isSaving ? "Guardando..." : "Guardar configuración"}
        </Button>
      </div>
    </ContainerComponents>
  );
}
