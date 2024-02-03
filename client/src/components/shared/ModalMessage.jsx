import { Button, Typography, Modal, Box } from "@mui/material";
import styled from "styled-components";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  height: 225,
  bgcolor: "#424242",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
  color: "white",
};
const ModalMessage = ({
  handleClose,
  submitFormBtn,
  flag = false,
  open,
  message = "Please create new contact for the first time✌️",
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          style={{
            borderBottom: "2px solid ",
            borderBottomColor: "white",
            width: "fit-content",
          }}
        >
          Contact Management System
        </Typography>
        <Typography
          id="modal-modal-description"
          style={{ lineHeight: "30px", marginBottom: "67px" }}
          sx={{ mt: 2 }}
          variant="inherit"
        >
          {message}
        </Typography>
        {flag && (
          <ButtonContainer>
            <Button
              variant="contained"
              onClick={(e) => submitFormBtn(e, "yes")}
              color="primary"
            >
              Yes
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={(e) => submitFormBtn(e, "no")}
            >
              No
            </Button>
          </ButtonContainer>
        )}
      </Box>
    </Modal>
  );
};

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 10px;
`;
export default ModalMessage;
