'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  GlobalOutlined,
  FileTextOutlined,
  UnorderedListOutlined,
  CloseSquareOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import { SPREADSHEET_OPTIONS, type SpreadsheetOption } from './constants';

const iconMap = {
  global: <GlobalOutlined className="text-green-600" />,
  subject: <FileTextOutlined className="text-green-600" />,
  indicator: <UnorderedListOutlined className="text-green-600" />,
  absence: <CloseSquareOutlined className="text-red-600" />,
  calendar: <CalendarOutlined className="text-red-600" />,
};

export function SpreadsheetList() {
  const pathname = usePathname();

  return (
    <div className="h-full w-full">
      <div className="w-full flex items-center justify-between pb-6">
        <strong className="text-xl text-foreground ps-8">
          Crear planilla de:
        </strong>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {SPREADSHEET_OPTIONS.map((item) => (
          <div
            className="flex items-start gap-2 flex-wrap font-semibold card bg-base-100"
            key={item.id}
          >
            <Link
              href={`${pathname}?opcion=${item.id}`}
              className="w-full"
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
