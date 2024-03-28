import React from "react";

const NewStudent = () => {
  return (
    <div className="h-full">
      <div className="h-[6%]">
        <strong className="text-xl text-black">
          Estudiante nuevo en el sistema
        </strong>
      </div>
      <div className="overflow-auto bg-white shadow-2xl rounded-[2rem] p-5 text-black text-xs h-[94%]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5 h-full">
          <div className="flex items-center">
            <div className="w-full">
              <label className="label">
                <p>Apellidos</p>
              </label>
              <input
                type="text"
                className="input border-gray5 w-full h-9 bg-transparent text-xs"
              />
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-full">
              <label className="label">
                <p className="w-full">Nombres</p>
              </label>
              <input
                type="text"
                className="input border-gray5 w-full h-9 bg-transparent text-xs"
              />
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-full">
              <label className="label">
                <p className=" w-full">Tipo de Identificación</p>
              </label>
              <div className="w-full">
                <select className="border rounded-btn border-gray5 w-full h-11 bg-transparent font-normal">
                  <option disabled selected>
                    Who shot first?
                  </option>
                  <option>Han Solo</option>
                  <option>Greedo</option>
                </select>
              </div>
            </div>
          </div>

          <div className="w-full">
            <label className="label">
              <p className="w-full">Identificación / Código</p>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full h-9 bg-transparent text-xs"
            />
          </div>

          <div className="w-full">
            <label className="label">
              <p className="w-full">Sexo</p>
            </label>
            <select className="border rounded-btn border-gray5 w-full h-11 bg-transparent font-normal">
              <option disabled selected>
                Who shot first?
              </option>
              <option>Han Solo</option>
              <option>Greedo</option>
            </select>
          </div>
          <div className="w-full">
            <label className="label">
              <span>Lugar de nacimiento</span>
            </label>
            <input
              type="text"
              name=""
              id=""
              className="input border-gray5 w-full  h-9 bg-transparent text-xs"
            />
          </div>
          <div className="w-full">
            <label className="label">
              <span>Direccion</span>
            </label>
            <input
              type="text"
              name=""
              id=""
              className="input border-gray5 w-full  h-9 bg-transparent text-xs"
            />
          </div>

          <div className="w-full">
            <label className="label">
              <span>Telefono</span>
            </label>
            <input
              type="text"
              name=""
              id=""
              className="input border-gray5 w-full  h-9 bg-transparent text-xs"
            />
          </div>

          <div className="items-center">
            <label className="label">
              <span>Foto</span>
            </label>
            <input
              type="file"
              className="file-input file-input-bordered border-gray5 file-input-sm w-full max-w-xs bg-transparent text-xs"
            />
          </div>
          <div className="items-center">
            <label className="label">
              <span>Nombre y apellido del acudiente</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full  h-9 bg-transparent text-xs"
            />
          </div>

          <div className="items-center">
            <label className="label">
              <span>Correo</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full  h-9 bg-transparent text-xs"
            />
          </div>

          <div className="items-center">
            <label className="label">
              <span>Barrio</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full  h-9 bg-transparent text-xs"
            />
          </div>

          <div className="items-center">
            <label className="label">
              <span>Sistema salud</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full  h-9 bg-transparent text-xs"
            />
          </div>

          <div className="items-center">
            <label className="label">
              <span>Tipo de sangre</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full  h-9 bg-transparent text-xs"
            />
          </div>

          <div className="items-center">
            <label className="label">
              <span>EPS</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full  h-9 bg-transparent text-xs"
            />
          </div>

          <div className="items-center">
            <label className="label">
              <span>Capacidad excepcional</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full  h-9 bg-transparent text-xs"
            />
          </div>

          <div className="items-center">
            <label className="label">
              <span>Código</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full  h-9 bg-transparent text-xs"
            />
          </div>

          <div className="items-center">
            <label className="label">
              <span>Código Municipio. Exp</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full  h-9 bg-transparent text-xs"
            />
          </div>

          <div className="items-center">
            <label className="label">
              <span>Sisben</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full  h-9 bg-transparent text-xs"
            />
          </div>

          <div className="items-center">
            <label className="label">
              <span>Estrato</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full  h-9 bg-transparent text-xs"
            />
          </div>

          <div className="items-center">
            <label className="label">
              <span>Discapacidad</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full  h-9 bg-transparent text-xs"
            />
          </div>
          <div className="items-center">
            <label className="label">
              <span>Identificación acudiente</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full  h-9 bg-transparent text-xs"
            />
          </div>

          <div className="items-center">
            <label className="label">
              <span>Dirección del acudiente</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full  h-9 bg-transparent text-xs"
            />
          </div>

          <div className="items-center">
            <label className="label">
              <span>Número celular del acudiente</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full  h-9 bg-transparent text-xs"
            />
          </div>
          <div className="items-center">
            <label className="label">
              <p className="break-words">Fecha de nacimiento del acudiente</p>
            </label>
            <input
              type="date"
              className="input border-gray5 w-full  h-9 bg-transparent text-xs"
              placeholder="Select date"
            />
          </div>

          <div className="items-center">
            <label className="label">
              <span>Nombre y apellido de la madre</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full  h-9 bg-transparent text-xs"
            />
          </div>

          <div className="items-center">
            <label className="label">
              <span>Identificacion de la madre</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full  h-9 bg-transparent text-xs"
            />
          </div>
          <div className="items-center">
            <label className="label">
              <span>Dirección de la madre</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full  h-9 bg-transparent text-xs"
            />
          </div>

          <div className="items-center">
            <label className="label">
              <span>Número celular de la madre</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full  h-9 bg-transparent text-xs"
            />
          </div>

          <div className="items-center">
            <label className="label">
              <p className="break-words">Fecha de nacimiento de la madre</p>
            </label>
            <input
              type="date"
              className="input border-gray5 w-full  h-9 bg-transparent text-xs"
              placeholder="Select date"
            />
          </div>

          <div className="items-center">
            <label className="label">
              <span>Estudios de la madre</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full  h-9 bg-transparent text-xs"
            />
          </div>

          <div className="items-center">
            <label className="label">
              <span>Profesión de la madre</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full  h-9 bg-transparent text-xs"
            />
          </div>

          <div className="items-center">
            <label className="label">
              <span>Nombre y apellido del padre</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full  h-9 bg-transparent text-xs"
            />
          </div>
          <div className="items-center">
            <label className="label">
              <span>Identificacion del padre</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full  h-9 bg-transparent text-xs"
            />
          </div>

          <div className="items-center">
            <label className="label">
              <span>Dirección del padre</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full  h-9 bg-transparent text-xs"
            />
          </div>

          <div className="items-center">
            <label className="label">
              <span>Número celular del padre</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full  h-9 bg-transparent text-xs"
            />
          </div>

          <div className="items-center">
            <label className="label">
              <p className="break-words">Fecha de nacimiento del padre</p>
            </label>
            <input
              type="date"
              className="input border-gray5 w-full  h-9 bg-transparent text-xs"
              placeholder="Select date"
            />
          </div>
          <h1
            className="col-span-1 md:col-span-2 lg:col-span-3 text-center font-bold"
            text-sm
          >
            Población Víctima del Conflicto (Debe presentar la certificación
            correspondiente)
          </h1>

          <div className="flex items-center">
            <div className="w-full">
              <label className="label">
                <span>
                  Beneficiario Hijos dependientes de Madre Cabeza de Familia
                </span>
              </label>
              <input
                type="text"
                className="input border-gray5 w-full h-9 bg-transparent text-xs"
              />
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-full">
              <label className="label">
                <span>Alumno Madre Cabeza de Familia</span>
              </label>
              <input
                type="text"
                className="input border-gray5 w-full  h-9 bg-transparent text-xs"
              />
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-full">
              <label className="label">
                <span>Alumno Madre Cabeza de Familia</span>
              </label>
              <input
                type="text"
                className="input border-gray5 w-full  h-9 bg-transparent text-xs"
              />
            </div>
          </div>

          <div className="items-center">
            <label className="label">
              <span>Beneficiario Veterano Fuerza Pública</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full  h-9 bg-transparent text-xs"
            />
          </div>

          <div className="items-center">
            <label className="label">
              <span>Beneficiario Héroe Nación</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full  h-9 bg-transparent text-xs"
            />
          </div>

          <h1 className="col-span-1 md:col-span-2 lg:col-span-3 text-center font-bold">
            En situación de desplazamiento
          </h1>

          <div className="items-center">
            <label className="label">
              <span>Departamento expulsor</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full  h-9 bg-transparent text-xs"
            />
          </div>

          <div className="items-center">
            <label className="label">
              <span>Municipio expulsor</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full  h-9 bg-transparent text-xs"
            />
          </div>
          <h1 className="col-span-1 md:col-span-2 lg:col-span-3 text-center font-bold text-sm">
            Procedencia Académica (instituciones anteriores)
          </h1>

          <div className="items-center">
            <label className="label w-1/4 justify-start text-left">
              <p className="break-words">Estado</p>
            </label>
            <select className="border rounded-btn h-11 border-gray5 w-full bg-transparent font-normal">
              <option disabled selected>
                Nuevo
              </option>
              <option>Nuevo-Repitente</option>
              <option>Antiguo</option>
              <option>Antiguo-Repitente</option>
            </select>
          </div>

          <div className="items-center">
            <label className="label">
              <span>Estudio vigencia anterior</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full  h-9 bg-transparent text-xs"
            />
          </div>

          <div className="items-center">
            <label className="label">
              <span>Institucion Educativa Procedencia</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full  h-9 bg-transparent text-xs"
            />
          </div>
          <div className="items-center">
            <label className="label">
              <span>Grado procedencia</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full  h-9 bg-transparent text-xs"
            />
          </div>

          <div className="items-center">
            <label className="label">
              <span>Año procedencia</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full  h-9 bg-transparent text-xs"
            />
          </div>

          <div className="items-center">
            <label className="label">
              <span>Ciudad procedencia</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full  h-9 bg-transparent text-xs"
            />
          </div>

          <h1 className="col-span-1 md:col-span-2 lg:col-span-3 text-center font-bold">
            Etnias
          </h1>
          <div className="items-center">
            <label className="label">
              <span>Afrodesendiente</span>
            </label>
            <td className="flex gap-2">
              <input
                type="radio"
                name="radio-1"
                className="radio border-gray5"
              />
              Sí
              <input
                type="radio"
                name="radio-1"
                className="radio border-gray5 "
              />
              No
            </td>
          </div>

          <div className="items-center">
            <label className="label">
              <span>Negritudes</span>
            </label>
            <td className="flex gap-2">
              <input
                type="radio"
                name="radio-2"
                className="radio border-gray5"
              />
              Sí
              <input
                type="radio"
                name="radio-2"
                className="radio border-gray5 "
              />
              No
            </td>
          </div>

          <div className="items-center">
            <label className="label">
              <span>ROM</span>
            </label>
            <td className="flex gap-2">
              <input
                type="radio"
                name="radio-3"
                className="radio border-gray5"
              />
              Sí
              <input
                type="radio"
                name="radio-3"
                className="radio border-gray5 "
              />
              No
            </td>
          </div>

          <div className="items-center">
            <label className="label">
              <span>ZENÚ</span>
            </label>
            <td className="flex gap-2">
              <input
                type="radio"
                name="radio-4"
                className="radio border-gray5"
              />
              Sí
              <input
                type="radio"
                name="radio-4"
                className="radio border-gray5 "
              />
              No
            </td>
          </div>

          <h1 className="col-span-1 md:col-span-2 lg:col-span-3 text-center font-bold">
            Listado de categorías de discapacidad
          </h1>

          <div className="items-center">
            <label className="label">
              <span>Discapacidad Física</span>
            </label>
            <td className="flex gap-2">
              <input
                type="radio"
                name="radio-5"
                className="radio border-gray5"
              />
              Sí
              <input
                type="radio"
                name="radio-5"
                className="radio border-gray5 "
              />
              No
            </td>
          </div>

          <div className="items-center">
            <label className="label">
              <span>Discapacidad Auditiva</span>
            </label>
            <td className="flex gap-2">
              <input
                type="radio"
                name="radio-6"
                className="radio border-gray5"
              />
              Sí
              <input
                type="radio"
                name="radio-6"
                className="radio border-gray5 "
              />
              No
            </td>
          </div>

          <div className="items-center">
            <label className="label">
              <span>Discapacidad Visual</span>
            </label>
            <td className="flex gap-2">
              <input
                type="radio"
                name="radio-7"
                className="radio border-gray5"
              />
              Sí
              <input
                type="radio"
                name="radio-7"
                className="radio border-gray5 "
              />
              No
            </td>
          </div>

          <div className="items-center">
            <label className="label">
              <span>Sordo ceguera</span>
            </label>
            <td className="flex gap-2">
              <input
                type="radio"
                name="radio-8"
                className="radio border-gray5"
              />
              Sí
              <input
                type="radio"
                name="radio-8"
                className="radio border-gray5 "
              />
              No
            </td>
          </div>

          <div className="items-center">
            <label className="label">
              <span>Discapacidad Intelectual</span>
            </label>
            <td className="flex gap-2">
              <input
                type="radio"
                name="radio-9"
                className="radio border-gray5"
              />
              Sí
              <input
                type="radio"
                name="radio-9"
                className="radio border-gray5 "
              />
              No
            </td>
          </div>

          <div className="items-center">
            <label className="label">
              <span>Discapacidad psicosocial</span>
            </label>
            <td className="flex gap-2">
              <input
                type="radio"
                name="radio-10"
                className="radio border-gray5"
              />
              Sí
              <input
                type="radio"
                name="radio-10"
                className="radio border-gray5 "
              />
              No
            </td>
          </div>

          <div className="items-center">
            <label className="label">
              <span>Discapacidad múltiple</span>
            </label>
            <td className="flex gap-2">
              <input
                type="radio"
                name="radio-11"
                className="radio border-gray5"
              />
              Sí
              <input
                type="radio"
                name="radio-11"
                className="radio border-gray5 "
              />
              No
            </td>
          </div>

          <div className="items-center">
            <label className="label">
              <span>Enfermedad que padece el estudiante</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full  h-9 bg-transparent text-xs"
            />
          </div>

          <h1 className="col-span-1 md:col-span-2 lg:col-span-3 text-center font-bold">
            Listado de capacidades y/o talentos excepcionales
          </h1>

          <div className="items-center">
            <label className="label">
              <span>En tecnología</span>
            </label>
            <td className="flex gap-2">
              <input
                type="radio"
                name="radio-12"
                className="radio border-gray5"
              />
              Sí
              <input
                type="radio"
                name="radio-12"
                className="radio border-gray5 "
              />
              No
            </td>
          </div>

          <div className="items-center">
            <label className="label">
              <span>En Liderazgo y emprendimiento</span>
            </label>
            <td className="flex gap-2">
              <input
                type="radio"
                name="radio-13"
                className="radio border-gray5"
              />
              Sí
              <input
                type="radio"
                name="radio-13"
                className="radio border-gray5 "
              />
              No
            </td>
          </div>

          <div className="items-center">
            <label className="label">
              <span>En ciencias naturales o básicas</span>
            </label>
            <td className="flex gap-2">
              <input
                type="radio"
                name="radio-14"
                className="radio border-gray5"
              />
              Sí
              <input
                type="radio"
                name="radio-14"
                className="radio border-gray5 "
              />
              No
            </td>
          </div>

          <div className="items-center">
            <label className="label">
              <span>En artes o letras</span>
            </label>
            <td className="flex gap-2">
              <input
                type="radio"
                name="radio-15"
                className="radio border-gray5"
              />
              Sí
              <input
                type="radio"
                name="radio-15"
                className="radio border-gray5 "
              />
              No
            </td>
          </div>

          <div className="items-center">
            <label className="label">
              <span>En Actividad física, ejercicio y deporte</span>
            </label>
            <td className="flex gap-2">
              <input
                type="radio"
                name="radio-16"
                className="radio border-gray5"
              />
              Sí
              <input
                type="radio"
                name="radio-16"
                className="radio border-gray5 "
              />
              No
            </td>
          </div>

          <div className="items-center">
            <label className="label">
              <span>En Ciencias Sociales o humanas</span>
            </label>
            <td className="flex gap-2">
              <input
                type="radio"
                name="radio-17"
                className="radio border-gray5"
              />
              Sí
              <input
                type="radio"
                name="radio-17"
                className="radio border-gray5 "
              />
              No
            </td>

            <br />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewStudent;
