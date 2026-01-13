import {
  CloudUploadOutlined,
  FileImageOutlined,
  LockOutlined,
  SecurityScanOutlined,
  StarOutlined,
} from "@ant-design/icons";

import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export const SettingsList = () => {
  const router = useRouter();
  return (
    <div className="w-full h-full">
      <div className="w-full flex items-center justify-between my-3">
        <h3>
          <strong className="text-xl text-black ps-8">Lista de Docentes</strong>
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div className="flex items-start gap-2 flex-wrap font-semibold card bg-white">
          <Link href={`${router.pathname}/logo-banner`} className="w-full">
            <div className="card-body w-full">
              <div className="card-title">
                <FileImageOutlined />
                Logo y banner
              </div>
            </div>
          </Link>
        </div>
        <div className="flex items-start gap-2 flex-wrap font-semibold card bg-white">
          <Link href={`${router.pathname}/default-data`} className="w-full">
            <div className="card-body">
              <div className="card-title">
                <SecurityScanOutlined />
                Predeterminar datos
              </div>
            </div>
          </Link>
        </div>
        <div className="flex items-start gap-2 flex-wrap font-semibold card bg-white">
          <Link href={`${router.pathname}/security-copy`} className="w-full">
            <div className="card-body">
              <div className="card-title">
                <CloudUploadOutlined />
                Copias de seguridad
              </div>
            </div>
          </Link>
        </div>
        <div className="flex items-start gap-2 flex-wrap font-semibold card bg-white">
          <Link href={`${router.pathname}/best-students`} className="w-full">
            <div className="card-body">
              <div className="card-title">
                <StarOutlined />
                Mejores estudiantes
              </div>
            </div>
          </Link>
        </div>
        <div className="flex items-start gap-2 flex-wrap font-semibold card bg-white">
          <Link href={`${router.pathname}/password`} className="w-full">
            <div className="card-body">
              <div className="card-title">
                <LockOutlined />
                Cambiar contraseña
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
