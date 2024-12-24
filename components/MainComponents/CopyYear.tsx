function CopyYear() {
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
        <div className="text-black h-full flex justify-center">
          <div className="h-full border-white gap-1 w-full max-w-md">
            <div className="form-control w-full">
              <label className="label cursor-pointer flex justify-between gap-10">
                <span className="label-text text-black">Asignaturas</span>
                <input
                  type="checkbox"
                  className="toggle [--tglbg:#efefef]  border-none bg-main-blue"
                  defaultChecked
                />
              </label>
            </div>
            <div className="form-control w-full">
              <label className="label cursor-pointer flex justify-between gap-10">
                <span className="label-text text-black">Recomendaciones</span>
                <input
                  type="checkbox"
                  className="toggle [--tglbg:#efefef] border-none bg-main-blue"
                  defaultChecked
                />
              </label>
            </div>
            <div className="form-control w-full">
              <label className="label cursor-pointer flex justify-between gap-10">
                <span className="label-text text-black">Logros</span>
                <input
                  type="checkbox"
                  className="toggle [--tglbg:#efefef] border-none bg-main-blue"
                  defaultChecked
                />
              </label>
            </div>
            <div className="form-control w-full">
              <label className="label cursor-pointer flex justify-between gap-10">
                <span className="label-text text-black">
                  Indicadores de Logros
                </span>
                <input
                  type="checkbox"
                  className="toggle [--tglbg:#efefef] border-none bg-main-blue"
                  defaultChecked
                />
              </label>
            </div>
          </div>
        </div>
        <div className="mx-auto bg-white border-2 shadow-2xl rounded-[2rem] p-5 flex justify-center flex-col">
          <div className="flex justify-center items-center my-2">
            <button className="btn btn-sm h-10 border-none rounded-[24px] text-white text-xs bg-[#0b5ed7] hover:bg-[#0b5ed7]">
              Generar copia
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CopyYear;
