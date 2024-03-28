import * as React from "react";

import Swal from "sweetalert2";

export default function DynamicModal({
  arrayInputs,
  typeAdd,
  open,
  setOpen,
  addSuccessMsg,
  updateSuccessMsg,
  addMutation,
  updateMutation,
  cleaningStates,
  validationEvent,
  refetch,
  variables,
}: any) {
  const handleClose = () => {
    cleaningStates();
    modal.close();
  };

  const handleAdd = () => {
    if (validationEvent()) {
      addMutation().then((res: any) => {
        if (res.data) {
          modal.close();
          Swal.fire({
            icon: "success",
            title: addSuccessMsg,
            showConfirmButton: false,
            timer: 1500,
          });
          cleaningStates();
          refetch();
          setOpen(false);
        } else {
          Swal.fire({
            icon: "error",
            title: "Ha habido un error...",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    } else return;
  };

  const handleUpdate = () => {
    if (validationEvent()) {
      updateMutation().then((res: any) => {
        if (res.data) {
          modal.close();
          Swal.fire({
            icon: "success",
            title: updateSuccessMsg,
            showConfirmButton: false,
            timer: 1500,
          });
          cleaningStates();
          refetch();
          setOpen(false);
        } else {
          modal.close();
          Swal.fire({
            icon: "error",
            title: "Ha habido un error...",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    } else return;
  };
  const modal = document.getElementById("modal") as HTMLDialogElement;
  
  return (
    <dialog id="modal" className="modal">
      <div className="modal-box bg-white max-w-2xl">
        <div className="grid grid-cols-2 mb-3">
          {arrayInputs.map((item: any, i: any) => (
            <div key={i} className="ms-4 me-4">
              <div className="w-full">{item.html}</div>
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center gap-3">
          <div>
            {typeAdd ? (
              <button
                onClick={handleAdd}
                className="btn bg-blue3 border-none text-white hover:bg-[#0b5ed7] transition duration-500"
              >
                Agregar
              </button>
            ) : (
              <button
                onClick={handleUpdate}
                className="btn bg-blue3 border-none text-white hover:bg-[#0b5ed7] transition duration-500"
              >
                Editar
              </button>
            )}
          </div>
          <div>
            <button
              onClick={handleClose}
              className="btn bg-red-500 hover:bg-red-600 text-white border-none transition duration-500"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}
