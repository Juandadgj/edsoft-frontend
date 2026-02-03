'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { INDICATOR_OPTIONS, type IndicatorOption } from './constants';

export function IndicatorsList() {
  const pathname = usePathname();

  return (
    <div className="h-full w-full">
      <div className="w-full flex items-center justify-between pb-6">
        <strong className="text-xl text-foreground ps-8">
          Indicadores
        </strong>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {INDICATOR_OPTIONS.map((item) => (
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
                  <span className="text-foreground">{item.title}</span>
                </div>
                {item.description && (
                  <p className="text-sm text-muted-foreground font-normal">
                    {item.description}
                  </p>
                )}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
