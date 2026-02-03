"use client";
import Link from "next/link";
import {
  BoxSelect,
  DatabaseBackup,
  Image as ImageIcon,
  KeyRound,
  ShieldCheck,
  Trophy,
} from "lucide-react";
import { usePathname } from "next/navigation";

const modules = [
  {
    slug: "logo-banner",
    title: "Logo y banner",
    description:
      "Actualiza las imágenes institucionales y mensajes principales.",
    icon: <ImageIcon />,
  },
  {
    slug: "default-data-settings",
    title: "Predeterminar datos",
    description: "Define qué módulos y vistas estarán activos por defecto.",
    icon: <BoxSelect />,
  },
  {
    slug: "security-copy",
    title: "Copias de seguridad",
    description: "Gestiona respaldos automáticos y descargas manuales.",
    icon: <DatabaseBackup />,
  },
  {
    slug: "best-students",
    title: "Mejores estudiantes",
    description: "Configura criterios de reconocimiento y publica rankings.",
    icon: <Trophy />,
  },
  {
    slug: "password",
    title: "Cambiar contraseña",
    description: "Refuerza la seguridad con políticas de acceso actualizadas.",
    icon: <KeyRound />,
  },
];

export function SettingsList() {
  const pathname = usePathname();
  return (
    <div className="h-full w-full">
      <div className="w-full flex items-center justify-between pb-6">
        <strong className="text-xl text-foreground ps-8">
          Configuración
        </strong>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {modules.map((item) => (
          <div
            className="flex items-start gap-2 flex-wrap font-semibold card bg-base-100"
            key={item.slug}
          >
            <Link href={`${pathname}/${item.slug}`} className="w-full">
              <div className="card-body w-full">
                <div className="card-title">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-foreground">{item.title}</span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
