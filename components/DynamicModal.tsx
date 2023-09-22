import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { FormControl } from "@material-ui/core";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "fit-content",
  maxHeight: "95%",
  width: "60%",
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
};

const boxTitle = {
  backgroundColor: "#0055a6",
  borderRadius: "10px 10px 0px 0px",
  padding: "2% 4%",
};

const title = {
  color: "white",
  fontFamily: ["Scada", "sans-serif"],
};

const boxContainer = {
  padding: " 3% 5%",
};

const inputContainer = {
  overflow: "auto",
  maxHeight: "500px",
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gridGap: "5px",
};

const input = {
  margin: "10px 5px",
  width: "98%",
  padding: "1px",
  fontFamily: ["Scada", "sans-serif"],
};

const buttonsContainer = {
  width: "100%",
  padding: "2% 0%",
};

const addButton = {
  width: "100%",
  "&:hover": {
    backgroundColor: "#0782F7",
  },
  fontFamily: ["Scada", "sans-serif"],
};

const updateButton = {
  width: "100%",
  "&:hover": {
    backgroundColor: "#0782F7",
  },
  fontFamily: ["Scada", "sans-serif"],
};

const cancelButton = {
  width: "100%",
  color: "white",
  backgroundColor: "#D81717",
  "&:hover": {
    backgroundColor: "#FF0000",
  },
  fontFamily: ["Scada", "sans-serif"],
};

export default function DynamicModal({
  arrayInputs,
  typeAdd,
  open,
  setOpen,
  addSuccessMsg,
  updateSuccessMsg,
  formValues,
  addMutation,
  updateMutation,
  cleaningStates,
  validationEvent,
  refetch,
}: any) {
  const handleClose = () => {
    cleaningStates();
    setOpen(false);
  };

  const handleAdd = () => {
    if (validationEvent()) {
      addMutation({
        variables: formValues,
      }).then((res: any) => {
        if (res.data) {
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
      updateMutation({
        variables: formValues,
      }).then((res: any) => {
        if (res.data) {
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

  return (
    <Modal
      keepMounted
      open={open}
      onClose={handleClose}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Box sx={style}>
        <Box sx={boxTitle}>
          <Typography variant="h3" component="h2" sx={title}>
            Formulario
          </Typography>
        </Box>
        <Box sx={boxContainer}>
          <Box sx={inputContainer} component="form" noValidate>
            {arrayInputs.map((item: any, i: any) => (
              <Box sx={input} key={i}>
                <FormControl variant="standard" fullWidth>
                  {item.html}
                </FormControl>
              </Box>
            ))}
          </Box>
          <Box sx={buttonsContainer}>
            <Grid container spacing={2}>
              {typeAdd ? (
                <Grid item xs={6}>
                  <Button
                    className="bg-[#1976d2]"
                    variant="contained"
                    sx={addButton}
                    endIcon={<AddIcon />}
                    onClick={handleAdd}
                  >
                    Agregar
                  </Button>
                </Grid>
              ) : (
                <Grid item xs={6}>
                  <Button
                    className="bg-[#1976d2]"
                    variant="contained"
                    sx={updateButton}
                    endIcon={<EditIcon />}
                    onClick={handleUpdate}
                  >
                    Editar
                  </Button>
                </Grid>
              )}
              <Grid item xs={6}>
                <Button
                  className="bg-[#D81717]"
                  variant="contained"
                  onClick={() => handleClose()}
                  sx={cancelButton}
                  endIcon={<CloseIcon />}
                >
                  Cancelar
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}

DynamicModal.propTypes = {
  arrayInputs: PropTypes.array.isRequired,
  typeAdd: PropTypes.bool.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  addSuccessMsg: PropTypes.string.isRequired,
  updateSuccessMsg: PropTypes.string.isRequired,
  formValues: PropTypes.object.isRequired,
  addMutation: PropTypes.func.isRequired,
  updateMutation: PropTypes.func.isRequired,
  cleaningStates: PropTypes.func.isRequired,
  validationEvent: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired,
};
