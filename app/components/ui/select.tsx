import { cn } from "@/app/lib/cn";
import { cva, VariantProps } from "class-variance-authority";
import * as React from "react";

const selectVariants = cva("", {
  variants: {
    variant: {
      default: "",
      destructive: "border-destructive",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

function Select({
  className,
  variant,
  label,
  children,
  ...props
}: React.ComponentProps<"select"> &
  VariantProps<typeof selectVariants> & { label?: string }) {
  return (
    <div className={cn("form-control w-full", className)}>
      {label && (
        <div className="label text-foreground p-1">
          <label className="">{label}</label>
        </div>
      )}
      <select
        data-slot="select"
        className={cn(
          "text-foreground bg-base-200 selection:bg-red-500 selection:text-black border-foreground w-full min-w-0  rounded-md border px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",

          className,
          selectVariants({ variant }),
        )}
        {...props}
      >
        {children}
      </select>
    </div>
  );
}

export { Select };
