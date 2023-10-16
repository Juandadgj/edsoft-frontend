import React from "react";

const NewStudent = () => {
  return (
    <div>
      <div className="mx-auto bg-white border-none border-2 shadow-2xl rounded-[2rem] p-5 h-full text-black">
        <div>
          <h1 className="text-lg">Estudiante nuevo en el sistema</h1>
        </div>
        <div className="overflow-x-auto h-96">
          <table className="table text-sm flex justify-center w-full ">
            <tbody>
              <tr className="border-none [&>td]:py-1 [&>td]:px-1 ">
                <td className="w-[50%]">
                  <label className="label justify-end text-right">
                    <span>Apellidos</span>
                  </label>
                </td>
                <td className="w-[50%]">
                  <input
                    type="text"
                    name=""
                    id=""
                    className="input border-gray5 w-full max-w-xs h-8 bg-transparent text-sm"
                  />
                </td>
              </tr>
              <tr className="border-none [&>td]:py-1 [&>td]:px-1 ">
                <td>
                  <label className="label justify-end text-right">
                    <span>Nombres</span>
                  </label>
                </td>
                <td>
                  <input
                    type="text"
                    name=""
                    id=""
                    className="input border-gray5 w-full max-w-xs h-8 bg-transparent text-sm"
                  />
                </td>
              </tr>
              <tr className="border-none [&>td]:py-1 [&>td]:px-1">
                <td>
                  <label className="label justify-end text-right">
                    <p className="break-words ">Tipo de Identificación</p>
                  </label>
                </td>
                <td>
                  <select className="select select-bordered select-sm border-gray5  w-full max-w-xs bg-transparent font-normal">
                    <option disabled selected>
                      Who shot first?
                    </option>
                    <option>Han Solo</option>
                    <option>Greedo</option>
                  </select>
                </td>
              </tr>
              <tr className="border-none [&>td]:py-1 [&>td]:px-1">
                <td>
                  <label className="label justify-end text-right">
                    <span>Identificación / Codigo</span>
                  </label>
                </td>
                <td>
                  <input
                    type="text"
                    name=""
                    id=""
                    className="input border-gray5 w-full max-w-xs h-8 bg-transparent text-sm"
                  />
                </td>
              </tr>
              <tr className="border-none [&>td]:py-1 [&>td]:px-1 ">
                <td>
                  <label className="label justify-end text-right">
                    <p className="break-words ">Sexo</p>
                  </label>
                </td>
                <td>
                  <select className="select select-bordered select-sm border-gray5  w-full max-w-xs bg-transparent font-normal">
                    <option disabled selected>
                      Who shot first?
                    </option>
                    <option>Han Solo</option>
                    <option>Greedo</option>
                  </select>
                </td>
              </tr>
              <tr className="border-none [&>td]:py-1 [&>td]:px-1 ">
                <td>
                  <label className="label justify-end text-right">
                    <p className="break-words ">Fecha de nacimiento</p>
                  </label>
                </td>
                <td>
                  <input
                    type="date"
                    className="input border-gray5 w-full max-w-xs h-8 bg-transparent text-sm"
                    placeholder="Select date"
                  />
                </td>
              </tr>
              <tr className="border-none [&>td]:py-1 [&>td]:px-1">
                <td>
                  <label className="label justify-end text-right">
                    <span>Lugar de nacimiento</span>
                  </label>
                </td>
                <td>
                  <input
                    type="text"
                    name=""
                    id=""
                    className="input border-gray5 w-full max-w-xs h-8 bg-transparent text-sm"
                  />
                </td>
              </tr>
              <tr className="border-none [&>td]:py-1 [&>td]:px-1">
                <td>
                  <label className="label justify-end text-right">
                    <span>Direccion</span>
                  </label>
                </td>
                <td>
                  <input
                    type="text"
                    name=""
                    id=""
                    className="input border-gray5 w-full max-w-xs h-8 bg-transparent text-sm"
                  />
                </td>
              </tr>
              <tr className="border-none [&>td]:py-1 [&>td]:px-1">
                <td>
                  <label className="label justify-end text-right">
                    <span>Telefono</span>
                  </label>
                </td>
                <td>
                  <input
                    type="text"
                    name=""
                    id=""
                    className="input border-gray5 w-full max-w-xs h-8 bg-transparent text-sm"
                  />
                </td>
              </tr>
              <tr className="border-none [&>td]:py-1 [&>td]:px-1">
                <td>
                  <label className="label justify-end text-right">
                    <span>Foto</span>
                  </label>
                </td>
                <td>
                  <input
                    type="file"
                    className="file-input file-input-bordered border-gray5  file-input-sm w-full max-w-xs bg-transparent"
                  />
                </td>
              </tr>
              <tr className="border-none [&>td]:py-1 [&>td]:px-1">
                <td>
                  <label className="label justify-end text-right">
                    <span>Nombre y apellido del acudiente</span>
                  </label>
                </td>
                <td>
                  <input
                    type="text"
                    className="input border-gray5 w-full max-w-xs h-8 bg-transparent text-sm"
                  />
                </td>
              </tr>
              <tr className="border-none [&>td]:py-1 [&>td]:px-1">
                <td>
                  <label className="label justify-end text-right">
                    <span>Identificacion Acudiente</span>
                  </label>
                </td>
                <td>
                  <input
                    type="text"
                    className="input border-gray5 w-full max-w-xs h-8 bg-transparent text-sm"
                  />
                </td>
              </tr>
              <tr className="border-none [&>td]:py-1 [&>td]:px-1">
                <td>
                  <label className="label justify-end text-right">
                    <span>Nombre y apellido de la madre</span>
                  </label>
                </td>
                <td>
                  <input
                    type="text"
                    className="input border-gray5 w-full max-w-xs h-8 bg-transparent text-sm"
                  />
                </td>
              </tr>{" "}
              <tr className="border-none [&>td]:py-1 [&>td]:px-1">
                <td>
                  <label className="label justify-end text-right">
                    <span>Identificacion de la madre</span>
                  </label>
                </td>
                <td>
                  <input
                    type="text"
                    className="input border-gray5 w-full max-w-xs h-8 bg-transparent text-sm"
                  />
                </td>
              </tr>{" "}
              <tr className="border-none [&>td]:py-1 [&>td]:px-1">
                <td>
                  <label className="label justify-end text-right">
                    <span>Nombre y apellido del padre</span>
                  </label>
                </td>
                <td>
                  <input
                    type="text"
                    className="input border-gray5 w-full max-w-xs h-8 bg-transparent text-sm"
                  />
                </td>
              </tr>{" "}
              <tr className="border-none [&>td]:py-1 [&>td]:px-1">
                <td>
                  <label className="label justify-end text-right">
                    <span>Identificacion del padre</span>
                  </label>
                </td>
                <td>
                  <input
                    type="text"
                    className="input border-gray5 w-full max-w-xs h-8 bg-transparent text-sm"
                  />
                </td>
              </tr>
              <tr className="border-none [&>td]:py-1 [&>td]:px-1">
                <td>
                  <label className="label justify-end text-right">
                    <span>Sisben</span>
                  </label>
                </td>
                <td>
                  <input
                    type="text"
                    className="input border-gray5 w-full max-w-xs h-8 bg-transparent text-sm"
                  />
                </td>
              </tr>
              <tr className="border-none [&>td]:py-1 [&>td]:px-1">
                <td>
                  <label className="label justify-end text-right">
                    <span>Estrato</span>
                  </label>
                </td>
                <td>
                  <input
                    type="text"
                    className="input border-gray5 w-full max-w-xs h-8 bg-transparent text-sm"
                  />
                </td>
              </tr>
              <tr className="border-none [&>td]:py-1 [&>td]:px-1">
                <td>
                  <label className="label justify-end text-right">
                    <span>Discapacidad</span>
                  </label>
                </td>
                <td>
                  <input
                    type="text"
                    className="input border-gray5 w-full max-w-xs h-8 bg-transparent text-sm"
                  />
                </td>
              </tr>
              <tr className="border-none [&>td]:py-1 [&>td]:px-1">
                <td>
                  <label className="label justify-end text-right">
                    <span>Indígena</span>
                  </label>
                </td>
                <td className="flex gap-2">
                  <input
                    type="radio"
                    name="radio-1"
                    className="radio  border-gray5"
                  />
                  <input
                    type="radio"
                    name="radio-1"
                    className="radio border-gray5"
                  />
                  <input
                    type="radio"
                    name="radio-1"
                    className="radio border-gray5"
                  />
                </td>
              </tr>
              <tr className="border-none [&>td]:py-1 [&>td]:px-1">
                <td>
                  <label className="label justify-end text-right">
                    <span>Desplazado</span>
                  </label>
                </td>
                <td className="flex gap-2">
                  <input
                    type="radio"
                    name="radio-1"
                    className="radio  border-gray5"
                  />
                  <input
                    type="radio"
                    name="radio-1"
                    className="radio border-gray5"
                  />
                  <input
                    type="radio"
                    name="radio-1"
                    className="radio border-gray5"
                  />
                </td>
              </tr>
              <tr className="border-none [&>td]:py-1 [&>td]:px-1">
                <td>
                  <label className="label justify-end text-right">
                    <span>Hijo(a) de madre cabeza de familia</span>
                  </label>
                </td>
                <td className="flex gap-2">
                  <input
                    type="radio"
                    name="radio-1"
                    className="radio  border-gray5"
                  />
                  <input
                    type="radio"
                    name="radio-1"
                    className="radio border-gray5"
                  />
                  <input
                    type="radio"
                    name="radio-1"
                    className="radio border-gray5"
                  />
                </td>
              </tr>
              <tr className="border-none [&>td]:py-1 [&>td]:px-1">
                <td>
                  <label className="label justify-end text-right">
                    <span>Indígena</span>
                  </label>
                </td>
                <td className="flex gap-2">
                  <input
                    type="radio"
                    name="radio-1"
                    className="radio  border-gray5"
                  />
                  <input
                    type="radio"
                    name="radio-1"
                    className="radio border-gray5"
                  />
                  <input
                    type="radio"
                    name="radio-1"
                    className="radio border-gray5"
                  />
                </td>
              </tr>
              <tr className="border-none [&>td]:py-1 [&>td]:px-1">
                <td>
                  <label className="label justify-end text-right">
                    <span>Hijo(a) de desmovilizados</span>
                  </label>
                </td>
                <td className="flex gap-2">
                  <input
                    type="radio"
                    name="radio-1"
                    className="radio  border-gray5"
                  />
                  <input
                    type="radio"
                    name="radio-1"
                    className="radio border-gray5"
                  />
                  <input
                    type="radio"
                    name="radio-1"
                    className="radio border-gray5"
                  />
                </td>
              </tr>
              <tr className="border-none [&>td]:py-1 [&>td]:px-1">
                <td>
                  <label className="label justify-end text-right">
                    <span>Sisben</span>
                  </label>
                </td>
                <td className="flex gap-2">
                  <input
                    type="radio"
                    name="radio-1"
                    className="radio  border-gray5"
                  />
                  <input
                    type="radio"
                    name="radio-1"
                    className="radio border-gray5"
                  />
                  <input
                    type="radio"
                    name="radio-1"
                    className="radio border-gray5"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NewStudent;
