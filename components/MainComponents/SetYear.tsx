import { useRef } from "react";
import { useState } from "react";
import {
  useCreateSetYearMutation,
  useGetSchoolarYearsQuery,
  useUpdateScholarYearMutation,
  ScholarYear,
} from "../../generated/graphql";
import DynamicModal from "../DynamicModal";
import Swal from "sweetalert2";
import { Input } from "../Input";
import useSchoolYear from "@/hooks/useSchoolYear";

const columns = [
  {
    Header: "",
    accessor: "selected",
  },
  {
    Header: "Año",
    accessor: "year",
  },
  {
    Header: "Rector",
    accessor: "rector",
  },
  {
    Header: "Detalle",
    accessor: "details",
  },
  {
    Header: "Editar",
    accessor: "edit",
  },
];

function SetYear() {
  const { year, selectScholarYear } = useSchoolYear();
  const [AddSetYear] = useCreateSetYearMutation();
  const [UpdateSchoolarYear] = useUpdateScholarYearMutation();
  const [open, setOpen] = useState(false);
  const [typeAdd, setTypeAdd] = useState(false);
  const [comment, setComment] = useState<ScholarYear>();
  const modalComment = useRef<any>();
  const modal = document.getElementById("modal") as HTMLDialogElement;
  const modalLoading = useRef<any>();
  const modalClose = useRef<any>();

  // Form to manage inputs values
  const [formValues, setFormValues] = useState<any>({
    id_year: "",
    rector: "",
    secretary: "",
    comment: "",
  });

  // Obj to manage every input error
  const [errors, setErrors] = useState<any>({
    id_year: "",
    rector: "",
    secretary: "",
    comment: "",
  });
  const { data, loading, error, refetch } = useGetSchoolarYearsQuery({
    fetchPolicy: "network-only",
  });

  const validationEvent = () => {
    if (formValues.id_year && formValues.rector && formValues.secretary) {
      if (typeAdd) {
        const year_repeated = data?.scholarYears.filter(
          (schoYear) => schoYear?.id_year === formValues.id_year
        );
        if (year_repeated!.length > 0) {
          setOpen(false);
          modal.close();
          Swal.fire({
            icon: "error",
            title: "Año establecido ya existe...",
            showConfirmButton: false,
            timer: 1700,
          });
          cleaningStates();
          return false;
        }
      }
      return true;
    } else {
      for (const item in formValues) {
        if (!formValues[item]) {
          setErrors((err: any) => ({ ...err, [item]: "Campo Requerido!" }));
        } else {
          setErrors((err: any) => ({ ...err, [item]: "" }));
        }
      }
      return false;
    }
  };

  const cleaningStates = () => {
    for (const item in errors) {
      setErrors((err: any) => ({ ...err, [item]: "" }));
    }
    for (const i in formValues) {
      setFormValues((val: any) => ({ ...val, [i]: "" }));
    }
  };

  const arrayInputs: Array<any> = [
    {
      html: (
        <Input
          required
          disabled={!typeAdd}
          name="id_year"
          type="number"
          value={formValues.id_year}
          onChange={({ target }: any) => {
            const val = parseInt(target.value);
            setFormValues({ ...formValues, [target.name]: val });
          }}
          label="Año escolar"
          errorText={errors.id_year}
        />
      ),
    },
    {
      html: (
        <Input
          required
          name="rector"
          type="text"
          value={formValues.rector}
          onChange={({ target }: any) => {
            setFormValues({ ...formValues, [target.name]: target.value });
          }}
          placeholder="Rector"
          label="Nombres y Apellidos del rector"
          errorText={errors.rector}
        />
      ),
    },
    {
      html: (
        <Input
          required
          name="secretary"
          type="text"
          value={formValues.secretary}
          onChange={({ target }: any) => {
            setFormValues({ ...formValues, [target.name]: target.value });
          }}
          label="Nombres y Apellidos del secretario"
          errorText={errors.secretary}
        />
      ),
    },
    {
      html: (
        <Input
          required
          name="comment"
          type="text"
          value={formValues.comment}
          onChange={({ target }: any) => {
            setFormValues({ ...formValues, [target.name]: target.value });
          }}
          label="Comentarios"
          errorText={errors.comment}
        />
      ),
    },
  ];

  const processedScholarYears = () => {
    if (!data?.scholarYears) return [];
    return data.scholarYears.map((schoYear) => ({
      selected: year == schoYear?.id_year,
      year: (
        <button
          onClick={() => handlerSelectScholarYear(schoYear?.id_year)}
          className="btn bg-transparent hover:bg-transparent border-none shadow-none text-black text-base hover:text-main-blue hover:scale-105 transition duration-500"
        >
          {schoYear?.id_year}
        </button>
      ),
      rector: schoYear?.rector ?? "",
      details: (
        <button
          onClick={() => {
            setComment({
              id_year: schoYear?.id_year ?? 0,
              rector: schoYear?.rector,
              secretary: schoYear?.secretary,
              comment: schoYear?.comment,
            });
            modalComment.current.showModal();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 36 36"
          >
            <path
              fill="#0055A6"
              d="M32 6H4a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h28a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2m0 22H4V8h28Z"
              className="clr-i-outline clr-i-outline-path-1"
            />
            <path
              fill="#0055A6"
              d="M9 14h18a1 1 0 0 0 0-2H9a1 1 0 0 0 0 2"
              className="clr-i-outline clr-i-outline-path-2"
            />
            <path
              fill="#0055A6"
              d="M9 18h18a1 1 0 0 0 0-2H9a1 1 0 0 0 0 2"
              className="clr-i-outline clr-i-outline-path-3"
            />
            <path
              fill="#0055A6"
              d="M9 22h10a1 1 0 0 0 0-2H9a1 1 0 0 0 0 2"
              className="clr-i-outline clr-i-outline-path-4"
            />
            <path fill="none" d="M0 0h36v36H0z" />
          </svg>
        </button>
      ),
      edit: (
        <button
          className="border-0"
          onClick={() => {
            setTypeAdd(false);
            setFormValues((t: any) => ({
              ...t,
              id_year: schoYear?.id_year,
              secretary: schoYear?.secretary,
              rector: schoYear?.rector,
              comment: schoYear?.comment,
            }));
            modal?.showModal();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 36 36"
          >
            <path
              fill="#0055A6"
              d="M28 30H6V8h13.22l2-2H6a2 2 0 0 0-2 2v22a2 2 0 0 0 2 2h22a2 2 0 0 0 2-2V15l-2 2Z"
              className="clr-i-outline clr-i-outline-path-1"
            />
            <path
              fill="#0055A6"
              d="m33.53 5.84l-3.37-3.37a1.61 1.61 0 0 0-2.28 0L14.17 16.26l-1.11 4.81A1.61 1.61 0 0 0 14.63 23a1.69 1.69 0 0 0 .37 0l4.85-1.07L33.53 8.12a1.61 1.61 0 0 0 0-2.28M18.81 20.08l-3.66.81l.85-3.63L26.32 6.87l2.82 2.82ZM30.27 8.56l-2.82-2.82L29 4.16L31.84 7Z"
              className="clr-i-outline clr-i-outline-path-2"
            />
            <path fill="none" d="M0 0h36v36H0z" />
          </svg>
        </button>
      ),
    }));
  };

  const handlerCreateSetYear = async () => {
    return await AddSetYear({
      variables: { createScholarYearInput: formValues },
    });
  };
  const handlerUpdateSetYear = async () => {
    return await UpdateSchoolarYear({
      variables: { updateScholarYearInput: formValues },
    });
  };

  const handlerSelectScholarYear = async (year: number | undefined) => {
    if (year) {
      modalLoading?.current.click();
      selectScholarYear({ variables: { idYear: year } }).then(() => {
        modalClose?.current.click();
      });
    }
  };

  return (
    <div className="rounded-tl-[20px] w-full h-[100vh] overflow-hidden bg-gray1 p-10 pb-3">
      <div className="h-[6%] flex justify-between">
        <div>
          <strong className="text-xl text-black ps-8 pb-4">
            Elegir Año Académico {year}
          </strong>
        </div>
        <div className="text-end pr-6">
          <button
            type="button"
            className="btn bg-main-blue btn-primary w-[16rem] mb-0 pb-0 !h-full btn-sm rounded-t-[40px] hover:bg-[#0b5ed7] hover:scale-105"
            onClick={() => {
              setTypeAdd(true);
              modal?.showModal();
            }}
          >
            <h4 className="text-white text-xs">+ Nuevo Año</h4>
          </button>
        </div>
      </div>
      <div className="mx-auto  bg-white border-none border-2 shadow-2xl rounded-[2rem] p-5 h-[94%]">
        <div className="text-black h-full">
          {loading && (
            <div className="w-full h-full flex justify-center items-center">
              <span className="loading loading-dots loading-lg bg-main-blue"></span>
            </div>
          )}
          {error && <div>¡Ocurrio un error!</div>}
          {data?.scholarYears && !loading && (
            <div className="border-white py-4 h-full">
              <div
                className={`w-full px-3 overflow-x-auto animate-fade-left h-full`}
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "#25429e #F3F4F6",
                  scrollbarGutter: "20px",
                }}
              >
                <table className="table text-black">
                  <thead className="flex items-center justify-center">
                    <tr className="flex w-full justify-center border-main-blue border-b-4 text-base font-semibold">
                      {columns.map((key: any, index: any) => (
                        <th
                          key={index}
                          className={`text-center text-main-blue whitespace-normal flex items-center justify-center ${
                            index == 0 ? "w-[20%]" : "w-full"
                          }`}
                        >
                          <p className="w-full">{key.Header}</p>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="w-full py-2">
                    {processedScholarYears().map((item: any, index: number) => (
                      <div style={{ textDecoration: "none", width: "100%" }} key={index}>
                        <tr className="flex w-full p-1 my-4 bg-gray1 border-none rounded-[20px] text-sm font-semibold">
                          <td className="flex w-[20%] justify-center items-center text-center">
                            {item.selected ? (
                              <div className="w-full flex justify-center items-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="25"
                                  height="25"
                                  viewBox="0 0 36 36"
                                >
                                  <path
                                    fill="#0055A6"
                                    d="m28.89 20.91l-5-2.91l4.87-2.86a3.11 3.11 0 0 0 1.14-1.08a3 3 0 0 0-4.09-4.15L21 12.76V7a3 3 0 0 0-6 0v5.76l-4.85-2.85a3 3 0 1 0-3 5.18l5 2.91l-4.95 2.86a3.11 3.11 0 0 0-1.14 1.08a3 3 0 0 0 4.09 4.14L15 23.24v5.66a3 3 0 0 0 2 2.94A3 3 0 0 0 21 29v-5.76l4.85 2.85a3 3 0 1 0 3-5.18Z"
                                    className="clr-i-solid clr-i-solid-path-1"
                                  />
                                  <path fill="none" d="M0 0h36v36H0z" />
                                </svg>
                              </div>
                            ) : (
                              ""
                            )}
                          </td>
                          <td className="flex w-full justify-center items-center text-center">
                            <p className="w-full">{item.year}</p>
                          </td>
                          <td className="flex w-full justify-center items-center text-center">
                            <p className="w-full">{item.rector}</p>
                          </td>
                          <td className="flex w-full justify-center items-center text-center">
                            {item.details}
                          </td>
                          <td className="flex w-full justify-center items-center text-center">
                            {item.edit}
                          </td>
                        </tr>
                      </div>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
      {/**Modal loading mutatio select year */}
      <input
        type="checkbox"
        ref={modalLoading}
        id="modalLoading"
        className="modal-toggle"
      />
      <div className="modal" role="dialog">
        <div className="modal-box h-14 w-14 rounded-[100%] p-0">
          <div className="w-full h-full flex justify-center items-center">
            <span className="loading loading-dots loading-lg bg-main-blue"></span>
          </div>
          <label ref={modalClose} className="hidden" htmlFor="modalLoading">
            Close Modal
          </label>
        </div>
      </div>
      {/**Modal year comments */}
      <dialog ref={modalComment} className="modal">
        <div className="modal-box text-black">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-red-500">
              ✕
            </button>
          </form>
          <h3 className="text-center font-bold text-md">
            Datos del año academico
          </h3>
          <br />
          <div className="w-full flex justify-center items-center">
            <div className="text-center text-sm">
              <p className="">Año Escolar: {comment?.id_year}</p>
              <p className="">
                Nombres y apellido de la rector: {comment?.rector}
              </p>
              <p className="">
                Nombres y apellido del secretario: {comment?.secretary}
              </p>
              <p className="">Comentario: {comment?.comment}</p>
            </div>
          </div>
        </div>
      </dialog>
      <DynamicModal
        arrayInputs={arrayInputs}
        typeAdd={typeAdd}
        open={open}
        setOpen={setOpen}
        addSuccessMsg={"Calificacion Creada!"}
        updateSuccessMsg={"Calificacion Actualizada!"}
        formValues={formValues}
        addMutation={handlerCreateSetYear}
        updateMutation={handlerUpdateSetYear}
        cleaningStates={cleaningStates}
        validationEvent={validationEvent}
        refetch={refetch}
      />
    </div>
  );
}

export default SetYear;
