"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LISTING_OPTIONS } from "./constants";
import { startTransition, use, useActionState, useEffect } from "react";
import { generateListingReportAction } from "./actions";
import { Button } from "@/app/components/ui/button";

export function ListingsList() {
  const pathname = usePathname();
  const [state, action, isPending] = useActionState(
    generateListingReportAction,
    {
      success: false,
      message: "",
    },
  );
  const handleGenerate = async ({ reportType }: { reportType: string }) => {
    startTransition(() => {
      action({
        reportType,
      });
    });
  };
  useEffect(() => {
    if (state.success) {
      console.log(state.data, "Estado de listados generados");
      window.open()?.document.write(state.data?.report_content || "");
    }
  }, [state]);
  return (
    <div className="h-full w-full">
      <div className="w-full flex items-center justify-between pb-6">
        <strong className="text-xl text-foreground ps-8">Listados</strong>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {LISTING_OPTIONS.map((item) => {
          if (item.type === "qualified-teachers") {
            return (
              <div
                className="flex items-start gap-2 flex-wrap font-semibold card bg-base-100"
                key={item.id}
              >
                <button
                  type="button"
                  onClick={() => handleGenerate({ reportType: item.type })}
                  className="w-full cursor-pointer"
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
                </button>
              </div>
            );
          }
          return (
            <div
              className="flex items-start gap-2 flex-wrap font-semibold card bg-base-100"
              key={item.id}
            >
              <Link href={`${pathname}?opcion=${item.id}`} className="w-full">
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
          );
        })}
      </div>
    </div>
  );
}
