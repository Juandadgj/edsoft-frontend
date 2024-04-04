function CopyYear() {
  return (
    <div className="rounded-tl-[20px] w-full h-[100vh] overflow-hidden bg-gray1 p-10 pb-3">
      <div className="pb-4">
        <div>
          <strong className="text-xl text-black ps-8">
            Copiar Año Anterior
          </strong>
        </div>
      </div>
      <div className="mx-auto bg-white border-2 shadow-2xl rounded-[2rem] p-5 flex justify-center flex-col">
        <div className="flex flex-col justify-center items-center mx-auto text-sm">
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
        <div className="flex justify-center items-center my-2">
          <button className="btn btn-sm h-10 border-none rounded-[24px] text-white text-xs bg-[#0b5ed7] hover:bg-[#0b5ed7]">
            Generar copia
          </button>
        </div>
      </div>
    </div>
  );
}

export default CopyYear;
