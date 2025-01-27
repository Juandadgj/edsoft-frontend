import { useRef } from "react";
import { useState } from "react";
import {
  useCreateSetYearMutation,
  useGetSchoolarYearsQuery,
  useUpdateScholarYearMutation,
  ScholarYear,
} from "../../generated/graphql";
import useSchoolYear from "@/hooks/useSchoolYear";
import TableComponent from "../Table";
import CustomModal from "../CustomModal";
import SetYearForm from "./forms/SetYearForm";
import { ContainerComponents } from "../ContainerComponents";

const columns = [
  { title: "", dataIndex: "selected", key: "selected" },
  { title: "Año", dataIndex: "year", key: "year" },
  { title: "Rector", dataIndex: "rector", key: "rector" },
  {
    title: "Detalle",
    dataIndex: "details",
    key: "details",
  },
  { title: "Editar", dataIndex: "edit", key: "edit" },
];

function SetYear() {
  const { year, selectScholarYear } = useSchoolYear();
  const [open, setOpen] = useState(false);
  const [openComment, setOpenComment] = useState(false);
  const [comment, setComment] = useState<ScholarYear>();
  const modalLoading = useRef<any>();
  const modalClose = useRef<any>();
  const [type, setType] = useState<boolean>(false);
  // Form to manage inputs values
  const [schoolYear, setSchoolYear] = useState<any>({ 
    id_year: "",
    rector: "",
    secretary: "",
    comment: "",
  });

  const { data, loading, error } = useGetSchoolarYearsQuery({
    fetchPolicy: "network-only",
  });

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
            setOpenComment(true);
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
            setType(true);
            setSchoolYear({
              id_year: schoYear?.id_year,
              secretary: schoYear?.secretary,
              rector: schoYear?.rector,
              comment: schoYear?.comment,
            })
            setOpen(true);
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
  const handlerSelectScholarYear = async (year: number | undefined) => {
    if (year) {
      modalLoading?.current.click();
      selectScholarYear({ variables: { idYear: year } }).then(() => {
        modalClose?.current.click();
      });
    }
  };
  const hanclerCloseModal = () => {
    setOpen(false);
    setSchoolYear({
      id_year: "",
      rector: "",
      secretary: "",
      comment: "",
    });
  };
  return (
    <ContainerComponents>
        <div className="w-full flex items-center justify-between my-3">
          <h3>
            <strong className="text-xl text-black ps-8">
              Elegir Año Académico {year}
            </strong>
          </h3>
          <div className="flex items-center gap-2">
            <label className="input input-bordered input-sm h-9 py-5 flex items-center gap-2 focus-within:outline-none focus-within:border-2 focus-within:border-main-blue text-black transition">
              <input type="text" className="grow" placeholder="Buscar" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
            <button
              type="button"
              className="btn btn-sm bg-main-blue mb-0 px-10 h-9 rounded-[10px] transition border-none hover:bg-[#0b5ed7] text-white text-xs"
              onClick={() => {
                setType(false);
                setSchoolYear({
                  id_year: "",
                  rector: "",
                  secretary: "",
                  comment: "",
                });
                setOpen(true);
              }}
            >
              <h4 className="text-white text-xs">+ Nuevo Año</h4>
            </button>
          </div>
        </div>
        <div className="text-black h-full">
          {loading && (
            <div className="w-full h-full flex justify-center items-center">
              <span className="loading loading-dots loading-lg bg-main-blue"></span>
            </div>
          )}
          {error && <div>¡Ocurrio un error!</div>}
          {data?.scholarYears && (
            <div className="border-white py-4 h-full">
              <TableComponent column={columns} data={processedScholarYears()} />
            </div>
          )}
        </div>
      {/**Modal year comments */}
      <CustomModal open={openComment}>
        <div className="text-black">
          <button
            onClick={() => {
              setOpenComment(false);
            }}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-red-500"
          >
            ✕
          </button>
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
      </CustomModal>
      <CustomModal open={open} title="Crear año escolar">
        <SetYearForm
          year={schoolYear}
          years={data?.scholarYears}
          onClose={hanclerCloseModal}
          setSchoolYear={setSchoolYear}
          type={type}
        />
      </CustomModal>
    </ContainerComponents>
  );
}

export default SetYear;
