import React from "react";
import Grid from "@mui/material/Grid";

const NewStudent = () => {
  return (
    <div>
      <Grid container className="pb-4">
        <Grid item xs={12}>
          <strong className="text-2xl text-black ps-8">
            Estudiante nuevo en el sistema
          </strong>
        </Grid>
      </Grid>
      
      <div className="mx-auto overflow-x-auto bg-white shadow-2xl rounded-[2rem] p-9 h-96 text-black">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          
          <div className="flex flex-row items-center">
            <label className="label text-left">
              <span>Apellidos</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full max-w-sm h-10 bg-transparent text-sm"
            />
          </div>

          <div className="flex flex-row items-center">
            <label className="label  text-left">
              <span>Nombres</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full max-w-sm h-10 bg-transparent text-sm"
            />
          </div>

          <div className="flex flex-row items-center">
            <label className="label justify-start text-left">
              <p className="break-words">Tipo de Identificación</p>
            </label>
            <select className="select select-bordered select-sm border-gray5 w-full max-w-xs bg-transparent font-normal">
              <option disabled selected>
                Who shot first?
              </option>
              <option>Han Solo</option>
              <option>Greedo</option>
            </select>
          </div>

          <div className="flex flex-row items-center">
            <label className="label  text-left">
              <span>Identificación / Código</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full max-w-sm h-10 bg-transparent text-sm"
            />
          </div>

          <div className="flex flex-row items-center">
            <label className="label  text-left">
              <p className="break-words">Sexo</p>
            </label>
            <select className="select select-bordered select-sm border-gray5 w-full max-w-xs bg-transparent font-normal">
              <option disabled selected>
                Who shot first?
              </option>
              <option>Han Solo</option>
              <option>Greedo</option>
            </select>
          </div>

          <div className="flex flex-row items-center">
            <label className="label  text-left">
              <p className="break-words">Fecha de nacimiento</p>
            </label>
            <input
              type="date"
              className="input border-gray5 w-full max-w-sm h-10 bg-transparent text-sm"
              placeholder="Select date"
            />
          </div>

          <div className="flex flex-row items-center">
            <label className="label  text-left">
              <span>Lugar de nacimiento</span>
            </label>
            <input
              type="text"
              name=""
              id=""
              className="input border-gray5 w-full max-w-sm h-10 bg-transparent text-sm"
            />
          </div>

          <div className="flex flex-row items-center">
            <label className="label  text-left">
              <span>Direccion</span>
            </label>
            <input
              type="text"
              name=""
              id=""
              className="input border-gray5 w-full max-w-sm h-10 bg-transparent text-sm"
            />
          </div>

          <div className="flex flex-row items-center">
            <label className="label  text-left">
              <span>Telefono</span>
            </label>
            <input
              type="text"
              name=""
              id=""
              className="input border-gray5 w-full max-w-sm h-10 bg-transparent text-sm"
            />
          </div>

          <div className="flex flex-row items-center">
            <label className="label  text-left">
              <span>Foto</span>
            </label>
            <input
              type="file"
              className="file-input file-input-bordered border-gray5 file-input-sm w-full max-w-xs bg-transparent"
            />
          </div>

          <div className="flex flex-row items-center">
            <label className="label  text-left">
              <span>Nombre y apellido del acudiente</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full max-w-sm h-10 bg-transparent text-sm"
            />
          </div>

          <div className="flex flex-row items-center">
            <label className="label  text-left">
              <span>Correo</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full max-w-sm h-10 bg-transparent text-sm"
            />
          </div>

          <div className="flex flex-row items-center">
            <label className="label  text-left">
              <span>Barrio</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full max-w-sm h-10 bg-transparent text-sm"
            />
          </div>

          <div className="flex flex-row items-center">
            <label className="label  text-left">
              <span>Sistema salud</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full max-w-sm h-10 bg-transparent text-sm"
            />
          </div>

          <div className="flex flex-row items-center">
            <label className="label  text-left">
              <span>Tipo de sangre</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full max-w-sm h-10 bg-transparent text-sm"
            />
          </div>

          <div className="flex flex-row items-center">
            <label className="label  text-left">
              <span>EPS</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full max-w-sm h-10 bg-transparent text-sm"
            />
          </div>

          <div className="flex flex-row items-center">
            <label className="label  text-left">
              <span>Capacidad excepcional</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full max-w-sm h-10 bg-transparent text-sm"
            />
          </div>

          <div className="flex flex-row items-center">
            <label className="label  text-left">
              <span>Código</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full max-w-sm h-10 bg-transparent text-sm"
            />
          </div>

          <div className="flex flex-row items-center">
            <label className="label  text-left">
              <span>Código Municipio. Exp</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full max-w-sm h-10 bg-transparent text-sm"
            />
          </div>

          <div className="flex flex-row items-center">
            <label className="label  text-left">
              <span>Sisben</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full max-w-sm h-10 bg-transparent text-sm"
            />
          </div>

          <div className="flex flex-row items-center">
            <label className="label  text-left">
              <span>Estrato</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full max-w-sm h-10 bg-transparent text-sm"
            />
          </div>

          <div className="flex flex-row items-center">
            <label className="label  text-left">
              <span>Discapacidad</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full max-w-sm h-10 bg-transparent text-sm"
            />
          </div>

          <div className="border-t-4 rounded-[2rem] border-gray5 col-span-3"></div>

        
          <div className="flex flex-row items-center">
            <label className="label  text-left">
              <span>Identificación acudiente</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full max-w-sm h-10 bg-transparent text-sm"
            />
          </div>

          <div className="flex flex-row items-center">
            <label className="label  text-left">
              <span>Dirección del acudiente</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full max-w-sm h-10 bg-transparent text-sm"
            />
          </div>

          <div className="flex flex-row items-center">
            <label className="label  text-left">
              <span>Número celular del acudiente</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full max-w-sm h-10 bg-transparent text-sm"
            />
          </div>

          <div className="flex flex-row items-center">
            <label className="label  text-left">
              <p className="break-words">Fecha de nacimiento del acudiente</p>
            </label>
            <input
              type="date"
              className="input border-gray5 w-full max-w-sm h-10 bg-transparent text-sm"
              placeholder="Select date"
            />
          </div>

          <div className="border-t-4 rounded-[2rem] border-gray5 col-span-3"></div>

          <div className="flex flex-row items-center">
            <label className="label  text-left">
              <span>Nombre y apellido de la madre</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full max-w-sm h-10 bg-transparent text-sm"
            />
          </div>

          <div className="flex flex-row items-center">
            <label className="label  text-left">
              <span>Identificacion de la madre</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full max-w-sm h-10 bg-transparent text-sm"
            />
          </div>

          <div className="flex flex-row items-center">
            <label className="label  text-left">
              <span>Dirección de la madre</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full max-w-sm h-10 bg-transparent text-sm"
            />
          </div>

          <div className="flex flex-row items-center">
            <label className="label  text-left">
              <span>Número celular de la madre</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full max-w-sm h-10 bg-transparent text-sm"
            />
          </div>

          <div className="flex flex-row items-center">
            <label className="label  text-left">
              <p className="break-words">Fecha de nacimiento de la madre</p>
            </label>
            <input
              type="date"
              className="input border-gray5 w-full max-w-sm h-10 bg-transparent text-sm"
              placeholder="Select date"
            />
          </div>

          <div className="flex flex-row items-center">
            <label className="label  text-left">
              <span>Estudios de la madre</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full max-w-sm h-10 bg-transparent text-sm"
            />
          </div>

          <div className="flex flex-row items-center">
            <label className="label  text-left">
              <span>Profesión de la madre</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full max-w-sm h-10 bg-transparent text-sm"
            />
          </div>

          <div className="border-t-4 rounded-[2rem] border-gray5 col-span-3"></div>

          <div className="flex flex-row items-center">
            <label className="label  text-left">
              <span>Nombre y apellido del padre</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full max-w-sm h-10 bg-transparent text-sm"
            />
          </div>

          <div className="flex flex-row items-center">
            <label className="label  text-left">
              <span>Identificacion del padre</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full max-w-sm h-10 bg-transparent text-sm"
            />
          </div>

          <div className="flex flex-row items-center">
            <label className="label  text-left">
              <span>Dirección del padre</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full max-w-sm h-10 bg-transparent text-sm"
            />
          </div>

          <div className="flex flex-row items-center">
            <label className="label  text-left">
              <span>Número celular del padre</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full max-w-sm h-10 bg-transparent text-sm"
            />
          </div>

          <div className="flex flex-row items-center">
            <label className="label  text-left">
              <p className="break-words">Fecha de nacimiento del padre</p>
            </label>
            <input
              type="date"
              className="input border-gray5 w-full max-w-sm h-10 bg-transparent text-sm"
              placeholder="Select date"
            />
          </div>

          <div className="flex flex-row items-center">
            <label className="label  text-left">
              <span>Estudios del padre</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full max-w-sm h-10 bg-transparent text-sm"
            />
          </div>

          <div className="flex flex-row items-center">
            <label className="label  text-left">
              <span>Profesión del padre</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full max-w-sm h-10 bg-transparent text-sm"
            />
          </div>

          <div className="border-t-4 rounded-[2rem] border-gray5 col-span-3"></div>
          <br />

          <h1 className="col-span-3 text-center font-bold">Población Víctima del Conflicto (Debe presentar la certificación correspondiente)</h1>
          <div className="flex flex-row items-center col-span-1">
            <label className="label  text-left">
              <span>Beneficiario Hijos dependientes de Madre Cabeza de Familia</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full max-w-sm h-10 bg-transparent text-sm"
            />
          </div>

          <div className="flex flex-row items-center">
            <label className="label  text-left">
              <span>Alumno Madre Cabeza de Familia</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full max-w-sm h-10 bg-transparent text-sm"
            />
          </div>

          <div className="flex flex-row items-center">
            <label className="label  text-left">
              <span>Beneficiario Veterano Fuerza Pública</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full max-w-sm h-10 bg-transparent text-sm"
            />
          </div>

          <div className="flex flex-row items-center">
            <label className="label  text-left">
              <span>Beneficiario Héroe Nación</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full max-w-sm h-10 bg-transparent text-sm"
            />
          </div>

          <h1 className="col-span-3 text-center font-bold">En situación de desplazamiento</h1>
          <div className="flex flex-row items-center">
            <label className="label  text-left">
              <span>Departamento expulsor</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full max-w-sm h-10 bg-transparent text-sm"
            />
          </div>

          <div className="flex flex-row items-center">
            <label className="label  text-left">
              <span>Municipio expulsor</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full max-w-sm h-10 bg-transparent text-sm"
            />
          </div>

          <div className="border-t-4 rounded-[2rem] border-gray5 col-span-3"></div>
          <br />
          <h1 className="col-span-3 text-center font-bold">Procedencia Académica (instituciones anteriores)</h1>

          <div className="flex flex-row items-center">
            <label className="label justify-start text-left">
              <p className="break-words">Estado</p>
            </label>
            <select className="select select-bordered select-sm border-gray5 w-full max-w-xs bg-transparent font-normal">
              <option disabled selected>
                Nuevo
              </option>
              <option>Nuevo-Repitente</option>
              <option>Antiguo</option>
              <option>Antiguo-Repitente</option>
            </select>
          </div>

          <div className="flex flex-row items-center">
            <label className="label  text-left">
              <span>Estudio vigencia anterior</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full max-w-sm h-10 bg-transparent text-sm"
            />
          </div>

          <div className="flex flex-row items-center">
            <label className="label  text-left">
              <span>Institucion Educativa Procedencia</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full max-w-sm h-10 bg-transparent text-sm"
            />
          </div>

          <div className="flex flex-row items-center">
            <label className="label  text-left">
              <span>Grado procedencia</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full max-w-sm h-10 bg-transparent text-sm"
            />
          </div>
          
          <div className="flex flex-row items-center">
            <label className="label  text-left">
              <span>Año procedencia</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full max-w-sm h-10 bg-transparent text-sm"
            />
          </div>
          
          <div className="flex flex-row items-center">
            <label className="label  text-left">
              <span>Ciudad procedencia</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full max-w-sm h-10 bg-transparent text-sm"
            />
          </div>

          <div className="border-t-4 rounded-[2rem] border-gray5 col-span-3"></div>
          <br />
          <h1 className="col-span-3 text-center font-bold">Etnias</h1>

          <div className="flex flex-row items-center">
            <label className="label  text-left">
              <span>Afrodesendiente</span>
            </label>
            <td className="flex gap-2">
              <input
                type="radio"
                name="radio-1"
                className="radio border-gray5"
              />Sí
              <input
                type="radio"
                name="radio-1"
                className="radio border-gray5 "
              />No
            </td>
          </div>

          <div className="flex flex-row items-center">
            <label className="label  text-left">
              <span>Negritudes</span>
            </label>
            <td className="flex gap-2">
              <input
                type="radio"
                name="radio-2"
                className="radio border-gray5"
              />Sí
              <input
                type="radio"
                name="radio-2"
                className="radio border-gray5 "
              />No
            </td>
          </div>

          <div className="flex flex-row items-center">
            <label className="label  text-left">
              <span>ROM</span>
            </label>
            <td className="flex gap-2">
              <input
                type="radio"
                name="radio-3"
                className="radio border-gray5"
              />Sí
              <input
                type="radio"
                name="radio-3"
                className="radio border-gray5 "
              />No
            </td>
          </div>

          <div className="flex flex-row items-center">
            <label className="label  text-left">
              <span>ZENÚ</span>
            </label>
            <td className="flex gap-2">
              <input
                type="radio"
                name="radio-4"
                className="radio border-gray5"
              />Sí
              <input
                type="radio"
                name="radio-4"
                className="radio border-gray5 "
              />No
            </td>
          </div>

          <div className="border-t-4 rounded-[2rem] border-gray5 col-span-3"></div>
          <br />
          <h1 className="col-span-3 text-center font-bold">Listado de categorías de discapacidad</h1>

          <div className="flex flex-row items-center">
            <label className="label  text-left">
              <span>Discapacidad Física</span>
            </label>
            <td className="flex gap-2">
              <input
                type="radio"
                name="radio-5"
                className="radio border-gray5"
              />Sí
              <input
                type="radio"
                name="radio-5"
                className="radio border-gray5 "
              />No
            </td>
          </div>

          <div className="flex flex-row items-center">
            <label className="label  text-left">
              <span>Discapacidad Auditiva</span>
            </label>
            <td className="flex gap-2">
              <input
                type="radio"
                name="radio-6"
                className="radio border-gray5"
              />Sí
              <input
                type="radio"
                name="radio-6"
                className="radio border-gray5 "
              />No
            </td>
          </div>

          <div className="flex flex-row items-center">
            <label className="label  text-left">
              <span>Discapacidad Visual</span>
            </label>
            <td className="flex gap-2">
              <input
                type="radio"
                name="radio-7"
                className="radio border-gray5"
              />Sí
              <input
                type="radio"
                name="radio-7"
                className="radio border-gray5 "
              />No
            </td>
          </div>

          <div className="flex flex-row items-center">
            <label className="label  text-left">
              <span>Sordo ceguera</span>
            </label>
            <td className="flex gap-2">
              <input
                type="radio"
                name="radio-8"
                className="radio border-gray5"
              />Sí
              <input
                type="radio"
                name="radio-8"
                className="radio border-gray5 "
              />No
            </td>
          </div>

          <div className="flex flex-row items-center">
            <label className="label  text-left">
              <span>Discapacidad Intelectual</span>
            </label>
            <td className="flex gap-2">
              <input
                type="radio"
                name="radio-9"
                className="radio border-gray5"
              />Sí
              <input
                type="radio"
                name="radio-9"
                className="radio border-gray5 "
              />No
            </td>
          </div>

          <div className="flex flex-row items-center">
            <label className="label  text-left">
              <span>Discapacidad psicosocial</span>
            </label>
            <td className="flex gap-2">
              <input
                type="radio"
                name="radio-10"
                className="radio border-gray5"
              />Sí
              <input
                type="radio"
                name="radio-10"
                className="radio border-gray5 "
              />No
            </td>
          </div>

          <div className="flex flex-row items-center">
            <label className="label  text-left">
              <span>Discapacidad múltiple</span>
            </label>
            <td className="flex gap-2">
              <input
                type="radio"
                name="radio-11"
                className="radio border-gray5"
              />Sí
              <input
                type="radio"
                name="radio-11"
                className="radio border-gray5 "
              />No
            </td>
          </div>

          <div className="flex flex-row items-center">
            <label className="label  text-left">
              <span>Enfermedad que padece el estudiante</span>
            </label>
            <input
              type="text"
              className="input border-gray5 w-full max-w-sm h-10 bg-transparent text-sm"
            />
          </div>

          <div className="border-t-4 rounded-[2rem] border-gray5 col-span-3"></div>
          <br />
          <h1 className="col-span-3 text-center font-bold">Listado de capacidades y/o talentos excepcionales</h1>

          <div className="flex flex-row items-center">
            <label className="label  text-left">
              <span>En tecnología</span>
            </label>
            <td className="flex gap-2">
              <input
                type="radio"
                name="radio-12"
                className="radio border-gray5"
              />Sí
              <input
                type="radio"
                name="radio-12"
                className="radio border-gray5 "
              />No
            </td>
          </div>

          <div className="flex flex-row items-center">
            <label className="label  text-left">
              <span>En Liderazgo y emprendimiento</span>
            </label>
            <td className="flex gap-2">
              <input
                type="radio"
                name="radio-13"
                className="radio border-gray5"
              />Sí
              <input
                type="radio"
                name="radio-13"
                className="radio border-gray5 "
              />No
            </td>
          </div>

          <div className="flex flex-row items-center">
            <label className="label  text-left">
              <span>En ciencias naturales o básicas</span>
            </label>
            <td className="flex gap-2">
              <input
                type="radio"
                name="radio-14"
                className="radio border-gray5"
              />Sí
              <input
                type="radio"
                name="radio-14"
                className="radio border-gray5 "
              />No
            </td>
          </div>

          <div className="flex flex-row items-center">
            <label className="label  text-left">
              <span>En artes o letras</span>
            </label>
            <td className="flex gap-2">
              <input
                type="radio"
                name="radio-15"
                className="radio border-gray5"
              />Sí
              <input
                type="radio"
                name="radio-15"
                className="radio border-gray5 "
              />No
            </td>
          </div>

          <div className="flex flex-row items-center">
            <label className="label  text-left">
              <span>En Actividad física, ejercicio y deporte</span>
            </label>
            <td className="flex gap-2">
              <input
                type="radio"
                name="radio-16"
                className="radio border-gray5"
              />Sí
              <input
                type="radio"
                name="radio-16"
                className="radio border-gray5 "
              />No
            </td>
          </div>

          <div className="flex flex-row items-center">
            <label className="label  text-left">
              <span>En Ciencias Sociales o humanas</span>
            </label>
            <td className="flex gap-2">
              <input
                type="radio"
                name="radio-17"
                className="radio border-gray5"
              />Sí
              <input
                type="radio"
                name="radio-17"
                className="radio border-gray5 "
              />No
            </td>

            <br />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewStudent;
