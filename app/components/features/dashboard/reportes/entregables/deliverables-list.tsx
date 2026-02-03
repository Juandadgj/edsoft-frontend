'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  GlobalOutlined,
  FileTextOutlined,
  UnorderedListOutlined,
  CloseSquareOutlined,
  SafetyCertificateOutlined,
  IdcardOutlined,
} from '@ant-design/icons';
import { DELIVERABLE_OPTIONS, type DeliverableOption } from './constants';

const iconMap = {
  global: <GlobalOutlined className="text-green-600" />,
  subject: <FileTextOutlined className="text-green-600" />,
  indicator: <UnorderedListOutlined className="text-green-600" />,
  error: <CloseSquareOutlined className="text-red-600" />,
  certificate: <SafetyCertificateOutlined className="text-green-600" />,
  card: <IdcardOutlined className="text-green-600" />,
};

export function DeliverablesList() {
  const pathname = usePathname();

  return (
    <div className="h-full w-full overflow-hidden">
      <div className="w-full flex items-center justify-between pb-6">
        <strong className="text-xl text-foreground ps-8">
          Crear entregable de
        </strong>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {DELIVERABLE_OPTIONS.map((item) => (
          <div
            className={`flex items-start gap-2 flex-wrap font-semibold card bg-base-100 ${
              !item.available ? 'opacity-60' : ''
            }`}
            key={item.id}
          >
            <Link
              href={item.available ? `${pathname}?opcion=${item.id}` : '#'}
              className={`w-full ${!item.available ? 'cursor-not-allowed' : ''}`}
              onClick={(e) => {
                if (!item.available) e.preventDefault();
              }}
            >
              <div className="card-body w-full">
                <div className="card-title">
                  <span className="text-2xl">{iconMap[item.icon]}</span>
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
