import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import styled from "styled-components";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const ModalMessage = ({
  handleClose,
  submitFormBtn,
  flag = false,
  open,
  message = "Please create new contact, you see me when no contacts in thesystem.✌️",
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Contact Management System
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {message}
        </Typography>
        {flag && (
          <ButtonContainer>
            <Button onClick={(e) => submitFormBtn(e, "Yes")}>Yes</Button>
            <Button onClick={(e) => submitFormBtn(e, "No")}>No</Button>
          </ButtonContainer>
        )}
      </Box>
    </Modal>
  );
};

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;
export default ModalMessage;
