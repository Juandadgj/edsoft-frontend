import { useEffect, useState } from "react";

function Settings() {
  const [active, setActive] = useState(false);
  useEffect(() => {
    setActive(true);
  }, []);

  return (
    <div className="h-full w-full rounded-tl-[20px] overflow-hidden bg-gray1 p-9">
      <div className="pb-8">
        <div>
          <h1 className="text-black fs-2 text-2xl font-bold ps-4 animate-fade-down">
            Cambiar Contraseña
          </h1>
        </div>
      </div>
      <div className="bg-white border-gray4 rounded-[2rem] p-5 shadow-2xl">
        <div className="pe-10">
          <h1
            className={`text-black text-center text-lg font-medium animate-fade-left `}
          >
            Contraseña actual
          </h1>
        </div>
        <div className="text-center pe-10">
          <input className="text-black bg-white border rounded-[0.5rem] border-gray4 ps-6 fs-5 w-[70%]" />
        </div>

        <div className="pe-10">
          <h2
            className={`text-black text-center text-lg font-medium animate-fade-left`}
          >
            Nueva Contraseña
          </h2>
        </div>
        <div className="text-center pe-10">
          <input className="text-black bg-white border rounded-[0.5rem] border-gray4 ps-6 fs-5 w-[70%]" />
        </div>
        <div className="pe-10">
          <h3
            className={`text-black text-lg text-center font-medium animate-fade-left `}
          >
            Confirme Contraseña
          </h3>
        </div>
        <div className="text-center pe-10">
          <input className="text-black bg-white border rounded-[0.5rem] border-gray4 ps-6 fs-5 w-[70%]" />
        </div>
        <div className="flex justify-center items-center">
          <button
            type="button"
            className={`btn bg-main-blue btn-primary w-[80%] rounded-4 hover:bg-[#0b5ed7] animate-fade-up`}
          >
            <h4 className="text-white">Guardar</h4>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
