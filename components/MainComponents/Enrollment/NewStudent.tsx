import React from "react";
import Grid from "@mui/material/Grid";

const NewStudent = () => {
  return (
    <div className="h-full">
      <Grid container>
        <Grid item xs={6}>
          <strong className="text-2xl text-black ps-8 pb-4">
            Estudiante nuevo en el sistema
          </strong>
        </Grid>
      </Grid>
      <div className=" overflow-auto bg-white shadow-2xl rounded-[2rem] h-full p-5 text-black">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
          <div className="flex flex-row items-center">
            <label className="label w-1/4 text-left ">
              <p className="w-full">Apellidos</p>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full h-10 bg-transparent text-sm"
            />
          </div>

          <div className="flex flex-row items-center">
            <label className="label w-1/4 text-left break-words">
              <p className="w-full">Nombres</p>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full h-10 bg-transparent text-sm"
            />
          </div>

          <div className="flex flex-row items-center w-full">
            <label className="label w-1/4 text-left break-words">
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

          <div className="flex flex-row items-center w-full">
            <label className="label w-1/4 text-left break-all">
              <p className="w-full">Identificación / Código</p>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full h-10 bg-transparent text-sm"
            />
          </div>

          <div className="flex flex-row items-center">
            <label className="label w-1/4 text-left">
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
          <div className="flex flex-row items-center">
            <label className="label w-1/4 text-left">
              <span>Lugar de nacimiento</span>
            </label>
            <input
              type="text"
              name=""
              id=""
              className="input border-gray5 w-full  h-10 bg-transparent text-sm"
            />
          </div>
          <div className="flex flex-row items-center">
            <label className="label w-1/4  text-left break-all">
              <span>Direccion</span>
            </label>
            <input
              type="text"
              name=""
              id=""
              className="input border-gray5 w-full  h-10 bg-transparent text-sm"
            />
          </div>

          <div className="flex flex-row items-center">
            <label className="label w-1/4  text-left break-all">
              <span>Telefono</span>
            </label>
            <input
              type="text"
              name=""
              id=""
              className="input border-gray5 w-full  h-10 bg-transparent text-sm"
            />
          </div>

          <div className="flex flex-row items-center">
            <label className="label w-1/4  text-left break-all">
              <span>Foto</span>
            </label>
            <input
              type="file"
              className="file-input file-input-bordered border-gray5 file-input-sm w-full max-w-xs bg-transparent"
            />
          </div>
          <div className="flex flex-row items-center">
            <label className="label w-1/4  text-left break-all">
              <span>Nombre y apellido del acudiente</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full  h-10 bg-transparent text-sm"
            />
          </div>

          <div className="flex flex-row items-center">
            <label className="label w-1/4  text-left break-all">
              <span>Correo</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full  h-10 bg-transparent text-sm"
            />
          </div>

          <div className="flex flex-row items-center">
            <label className="label w-1/4  text-left break-all">
              <span>Barrio</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full  h-10 bg-transparent text-sm"
            />
          </div>

          <div className="flex flex-row items-center">
            <label className="label w-1/4  text-left break-all">
              <span>Sistema salud</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full  h-10 bg-transparent text-sm"
            />
          </div>

          <div className="flex flex-row items-center">
            <label className="label w-1/4  text-left break-all">
              <span>Tipo de sangre</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full  h-10 bg-transparent text-sm"
            />
          </div>

          <div className="flex flex-row items-center">
            <label className="label w-1/4  text-left break-all">
              <span>EPS</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full  h-10 bg-transparent text-sm"
            />
          </div>

          <div className="flex flex-row items-center">
            <label className="label w-1/4  text-left break-all">
              <span>Capacidad excepcional</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full  h-10 bg-transparent text-sm"
            />
          </div>

          <div className="flex flex-row items-center">
            <label className="label w-1/4  text-left break-all">
              <span>Código</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full  h-10 bg-transparent text-sm"
            />
          </div>

          <div className="flex flex-row items-center">
            <label className="label w-1/4  text-left break-all">
              <span>Código Municipio. Exp</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full  h-10 bg-transparent text-sm"
            />
          </div>

          <div className="flex flex-row items-center">
            <label className="label w-1/4  text-left break-all">
              <span>Sisben</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full  h-10 bg-transparent text-sm"
            />
          </div>

          <div className="flex flex-row items-center">
            <label className="label w-1/4  text-left break-all">
              <span>Estrato</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full  h-10 bg-transparent text-sm"
            />
          </div>

          <div className="flex flex-row items-center">
            <label className="label w-1/4  text-left break-all">
              <span>Discapacidad</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full  h-10 bg-transparent text-sm"
            />
          </div>
          <div className="flex flex-row items-center">
            <label className="label w-1/4  text-left break-all">
              <span>Identificación acudiente</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full  h-10 bg-transparent text-sm"
            />
          </div>

          <div className="flex flex-row items-center">
            <label className="label w-1/4  text-left break-all">
              <span>Dirección del acudiente</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full  h-10 bg-transparent text-sm"
            />
          </div>

          <div className="flex flex-row items-center">
            <label className="label w-1/4  text-left break-all">
              <span>Número celular del acudiente</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full  h-10 bg-transparent text-sm"
            />
          </div>
          <div className="flex flex-row items-center">
            <label className="label w-1/4  text-left break-all">
              <p className="break-words">Fecha de nacimiento del acudiente</p>
            </label>
            <input
              type="date"
              className="input border-gray5 w-full  h-10 bg-transparent text-sm"
              placeholder="Select date"
            />
          </div>

          <div className="flex flex-row items-center">
            <label className="label w-1/4  text-left break-all">
              <span>Nombre y apellido de la madre</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full  h-10 bg-transparent text-sm"
            />
          </div>

          <div className="flex flex-row items-center">
            <label className="label w-1/4  text-left break-all">
              <span>Identificacion de la madre</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full  h-10 bg-transparent text-sm"
            />
          </div>
          <div className="flex flex-row items-center">
            <label className="label w-1/4  text-left break-all">
              <span>Dirección de la madre</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full  h-10 bg-transparent text-sm"
            />
          </div>

          <div className="flex flex-row items-center">
            <label className="label w-1/4  text-left break-all">
              <span>Número celular de la madre</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full  h-10 bg-transparent text-sm"
            />
          </div>

          <div className="flex flex-row items-center">
            <label className="label w-1/4  text-left break-all">
              <p className="break-words">Fecha de nacimiento de la madre</p>
            </label>
            <input
              type="date"
              className="input border-gray5 w-full  h-10 bg-transparent text-sm"
              placeholder="Select date"
            />
          </div>

          <div className="flex flex-row items-center">
            <label className="label w-1/4  text-left break-all">
              <span>Estudios de la madre</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full  h-10 bg-transparent text-sm"
            />
          </div>

          <div className="flex flex-row items-center">
            <label className="label w-1/4  text-left break-all">
              <span>Profesión de la madre</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full  h-10 bg-transparent text-sm"
            />
          </div>

          <div className="flex flex-row items-center">
            <label className="label w-1/4  text-left break-all">
              <span>Nombre y apellido del padre</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full  h-10 bg-transparent text-sm"
            />
          </div>
          <div className="flex flex-row items-center">
            <label className="label w-1/4  text-left break-all">
              <span>Identificacion del padre</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full  h-10 bg-transparent text-sm"
            />
          </div>

          <div className="flex flex-row items-center">
            <label className="label w-1/4  text-left break-all">
              <span>Dirección del padre</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full  h-10 bg-transparent text-sm"
            />
          </div>

          <div className="flex flex-row items-center">
            <label className="label w-1/4  text-left break-all">
              <span>Número celular del padre</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full  h-10 bg-transparent text-sm"
            />
          </div>

          <div className="flex flex-row items-center">
            <label className="label w-1/4  text-left break-all">
              <p className="break-words">Fecha de nacimiento del padre</p>
            </label>
            <input
              type="date"
              className="input border-gray5 w-full  h-10 bg-transparent text-sm"
              placeholder="Select date"
            />
          </div>
          <h1 className="col-span-1 md:col-span-2 lg:col-span-3 text-center font-bold">
            Población Víctima del Conflicto (Debe presentar la certificación
            correspondiente)
          </h1>

          <div className="flex flex-row items-center">
            <label className="label w-1/4  text-left break-all">
              <span>
                Beneficiario Hijos dependientes de Madre Cabeza de Familia
              </span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full  h-10 bg-transparent text-sm"
            />
          </div>

          <div className="flex flex-row items-center">
            <label className="label w-1/4  text-left break-all">
              <span>Alumno Madre Cabeza de Familia</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full  h-10 bg-transparent text-sm"
            />
          </div>

          <div className="flex flex-row items-center">
            <label className="label w-1/4  text-left break-all">
              <span>Alumno Madre Cabeza de Familia</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full  h-10 bg-transparent text-sm"
            />
          </div>

          <div className="flex flex-row items-center">
            <label className="label w-1/4  text-left break-all">
              <span>Beneficiario Veterano Fuerza Pública</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full  h-10 bg-transparent text-sm"
            />
          </div>

          <div className="flex flex-row items-center">
            <label className="label w-1/4  text-left break-all">
              <span>Beneficiario Héroe Nación</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full  h-10 bg-transparent text-sm"
            />
          </div>

          <h1 className="col-span-1 md:col-span-2 lg:col-span-3 text-center font-bold">
            En situación de desplazamiento
          </h1>

          <div className="flex flex-row items-center">
            <label className="label w-1/4  text-left break-all">
              <span>Departamento expulsor</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full  h-10 bg-transparent text-sm"
            />
          </div>

          <div className="flex flex-row items-center">
            <label className="label w-1/4  text-left break-all">
              <span>Municipio expulsor</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full  h-10 bg-transparent text-sm"
            />
          </div>
          <h1 className="col-span-1 md:col-span-2 lg:col-span-3 text-center font-bold">
            Procedencia Académica (instituciones anteriores)
          </h1>

          <div className="flex flex-row items-center">
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

          <div className="flex flex-row items-center">
            <label className="label w-1/4  text-left break-all">
              <span>Estudio vigencia anterior</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full  h-10 bg-transparent text-sm"
            />
          </div>

          <div className="flex flex-row items-center">
            <label className="label w-1/4  text-left break-all">
              <span>Institucion Educativa Procedencia</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full  h-10 bg-transparent text-sm"
            />
          </div>
          <div className="flex flex-row items-center">
            <label className="label w-1/4  text-left break-all">
              <span>Grado procedencia</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full  h-10 bg-transparent text-sm"
            />
          </div>

          <div className="flex flex-row items-center">
            <label className="label w-1/4  text-left break-all">
              <span>Año procedencia</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full  h-10 bg-transparent text-sm"
            />
          </div>

          <div className="flex flex-row items-center">
            <label className="label w-1/4  text-left break-all">
              <span>Ciudad procedencia</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full  h-10 bg-transparent text-sm"
            />
          </div>

          <h1 className="col-span-1 md:col-span-2 lg:col-span-3 text-center font-bold">
            Etnias
          </h1>
          <div className="flex flex-row items-center">
            <label className="label w-1/4  text-left break-all">
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

          <div className="flex flex-row items-center">
            <label className="label w-1/4  text-left break-all">
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

          <div className="flex flex-row items-center">
            <label className="label w-1/4  text-left break-all">
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

          <div className="flex flex-row items-center">
            <label className="label w-1/4  text-left break-all">
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

          <div className="flex flex-row items-center">
            <label className="label w-1/4  text-left break-all">
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

          <div className="flex flex-row items-center">
            <label className="label w-1/4  text-left break-all">
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

          <div className="flex flex-row items-center">
            <label className="label w-1/4  text-left break-all">
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

          <div className="flex flex-row items-center">
            <label className="label w-1/4  text-left break-all">
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

          <div className="flex flex-row items-center">
            <label className="label w-1/4  text-left break-all">
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

          <div className="flex flex-row items-center">
            <label className="label w-1/4  text-left break-all">
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

          <div className="flex flex-row items-center">
            <label className="label w-1/4  text-left break-all">
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

          <div className="flex flex-row items-center">
            <label className="label w-1/4  text-left break-all">
              <span>Enfermedad que padece el estudiante</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full  h-10 bg-transparent text-sm"
            />
          </div>

          <h1 className="col-span-1 md:col-span-2 lg:col-span-3 text-center font-bold">
            Listado de capacidades y/o talentos excepcionales
          </h1>

          <div className="flex flex-row items-center">
            <label className="label w-1/4  text-left break-all">
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

          <div className="flex flex-row items-center">
            <label className="label w-1/4  text-left break-all">
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

          <div className="flex flex-row items-center">
            <label className="label w-1/4  text-left break-all">
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

          <div className="flex flex-row items-center">
            <label className="label w-1/4  text-left break-all">
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

          <div className="flex flex-row items-center">
            <label className="label w-1/4  text-left break-all">
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

          <div className="flex flex-row items-center">
            <label className="label w-1/4  text-left break-all">
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
