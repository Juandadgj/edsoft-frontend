import { Checkbox } from "../ui/checkbox";
import { useState } from "react";
import { FieldValue } from "./forms/dinamyc-form/types/types";
import { Button } from "../ui/button";

function CopyYear() {
  const [formData, setFormdata] = useState<Record<string, FieldValue>>({});
  const options = [
    {
      label: "Asignaturas",
      value: "asignaturas",
    },
    {
      label: "Recomendaciones",
      value: "recomendaciones",
    },
    {
      label: "Logros",
      value: "logros",
    },
    {
      label: "Indicadores de Logros",
      value: "indicatores",
    },
  ];

  const handleChange = (e: any) => {
    setFormdata({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className="w-full overflow-hidden h-full">
      <div className="mx-auto bg-white border-none border-2 shadow-2xl rounded-[10px] h-full py-4 px-2">
        <div className="w-full flex items-center justify-between my-3">
          <h3>
            <strong className="text-xl text-black ps-8">
              Copiar Año Anterior
            </strong>
          </h3>
        </div>
        <div className="p-4 rounded-md mb-3 flex justify-center items-center text-black">
          <div className="w-full max-w-2xl border-2 border-main-blue p-4 rounded-md">
            <p>
              Usted puede hacer un copiado de los cursos del a�o inmediatamente
              anterior, y puede escoger si se copia a la vez las asignaturas, los
              logros o los indicadores de logros...
            </p>
          </div>
        </div>
        <div className="text-black flex justify-center mb-3">
          <div className="gap-1 w-full max-w-md grid grid-cols-1">
            {options.map((option) => (
              <Checkbox
                key={option.value}
                name={option.value}
                value={option.value}
                onChange={handleChange}
                label={option.label}
              />
            ))}
          </div>
        </div>
        <div className="flex justify-center flex-col">
          <div className="flex justify-center items-center my-2">
            <Button className="bg-[#0b5ed7] hover:bg-[#0b5ed7]">
              Generar copia
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CopyYear;
