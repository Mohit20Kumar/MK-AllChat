import * as React from "react";
// import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
// import "./Menu.css";
import {
  // orderBy,
  // query,
  // collection,
  doc,
  // getDocs,
  // docs,
  // onSnapshot,
  // getDoc,
  getFirestore,
  // docChanges,
  // addDoc,
  // deleteCol,
  // Timestamp,
  // serverTimestamp,
  // FieldValue,
  // deleteDoc,
  // deleteField,
  // updateDoc,
  writeBatch,

  // getDatabase,
} from "firebase/firestore";
// import { getDatabase } from "firebase/database";
// import { httpsCallable } from "firebase/functions";

const BasicMenu = ({ roomId }) => {
  // const [toDelete, setToDelete] = React.useState([]);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteRoom = () => {
    const batch = writeBatch(getFirestore());
    const currRoom = doc(getFirestore(), "rooms", roomId);
    batch.delete(currRoom);
    batch.commit();
    navigate("/");
  };

  return (
    <div className="hehehe">
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
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {/* <MenuItem onClick={(handleClose, deleteConvo)}>Clear Convo</MenuItem> */}
        <MenuItem onClick={(handleClose, deleteRoom)}>Delete Room</MenuItem>
      </Menu>
    </div>
  );
};

export default BasicMenu;
