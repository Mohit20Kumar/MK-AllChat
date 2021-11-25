import * as React from "react";
// import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton } from "@mui/material";
import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
// import { getAuth, signOut } from "firebase/auth";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
import { useNavigate } from "react-router-dom";

// import "./Menu.css";

const BasicMenu = () => {
  // const [logout, setLogout] = useState(false);
  // const navigate = useNavigate();
  // const auth = getAuth();
  const [openModal, setOpenModal] = React.useState(false);
  const handleModalOpen = () => {
    setOpenModal(true);
    setAnchorEl(null);
  };
  const navigate = useNavigate();

  const handleModalClose = () => setOpenModal(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const userLogout = () => {
    setAnchorEl(null);

    navigate("/");
    window.location.reload();
  };

  const style = {
    textAlign: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    // width: ,
    letterSpacing: "10px",
    bgcolor: "background.paper",
    border: "4px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div className="hehehe">
      <Modal
        open={openModal}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              style={{
                background: "#393E46",
                color: "white",
                letterSpacing: "4px",
              }}
              variant="h4"
              component="h2"
            >
              About
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              This is a Website made for chatting with your Friends and Loved
              Ones.
              <br /> This website was made by Mohit Kumar using REACT JS. Also,
              It uses FIREBASE for Backend Connectivity and Authentication.
              <br />
              It impliments the idea of Zero Privacy. Hence, all your Chats will
              be Public.
              <br />
              Since it's a web based Chatting App, it will be best viewed in
              Bigger Screens.
              <br />
              Enjoy! XD
            </Typography>
          </Box>
        </Fade>
      </Modal>
      <IconButton>
        <MoreVertIcon
          style={{ color: "white" }}
          id="basic-button"
          aria-controls="basic-menu"
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        />
      </IconButton>
      {/* <Button
        style={{ color: "white" }}
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </Button> */}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={{
          horizontal: "right",
          vertical: "top",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={(handleClose, handleModalOpen)}>About</MenuItem>
        <MenuItem onClick={(handleClose, userLogout)}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default BasicMenu;
