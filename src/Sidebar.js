import { Avatar } from "@mui/material";
import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import db from "./firebase"; //Dont remove this Import
import {
  // query,
  collection,
  // doc,
  // getDocs,
  // docs,
  onSnapshot,
  getFirestore,
  // docChanges,
} from "firebase/firestore";
import BasicMenu from "./SidebarMenu";
// import ChatIcon from "@mui/icons-material/Chat";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import SearchOutlined from "@mui/icons-material/Search"

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SidebarChat from "./SidebarChat";
import { useStateValue } from "./StateProvider";
const Sidebar = () => {
  // const [changeIt, setChangeIt] = useState(false);
  const [{ user }, dispatch] = useStateValue();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedRooms, setSearchedRooms] = useState([]);
  const [rooms, setRooms] = useState([]);

  // console.log(doc(db, "rooms"));

  // async function getRooms() {
  // const citySnapshot = await getDocs(citiesCol);

  useEffect(() => {
    const allRooms = collection(getFirestore(), "rooms");
    onSnapshot(allRooms, (snapshot) => {
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);
  // onSnapshot(allRooms, (snapshot)=> {
  // });
  // const cityList = citySnapshot.docs.map((doc) => doc.data());
  // setRooms(cityList);
  // }
  // console.log(rooms);
  // getRooms();

  // console.log(rooms);
  // useEffect(() => {
  //   db.collection("rooms").onSnapShot((snapshot) => {
  //     setRooms(
  //       snapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         data: doc.data(),
  //       }))
  //     );
  //   });
  // }, []);

  useEffect(() => {
    if (searchTerm) {
      const something = rooms.filter((each) => {
        if (each.data.name.includes(searchTerm)) {
          return each;
        }
        return null;
      });
      setSearchedRooms(something);
    }
  }, [searchTerm, rooms]);

  const submitSearch = (e) => {
    e.preventDefault();
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <Avatar src={user?.photoURL} />
        <div className="sidebar-headerRight">
          {/* <ChatIcon /> */}
          {/* <IconButton> */}
          <BasicMenu />
          {/* </IconButton> */}
        </div>
      </div>

      <div className="sidebar-search">
        <div className="sidebar-searchContainer">
          <SearchOutlinedIcon />
          <form className="myForm" onSubmit={submitSearch}>
            <input
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              type="text"
              value={searchTerm}
              placeholder="Search a Room"
            />
          </form>
        </div>
      </div>

      <div className="sidebar-chats">
        <SidebarChat addNewChat />

        {searchTerm ? (
          searchedRooms.length < 1 ? (
            <h3 style={{ textAlign: "center", margin: "10px 0" }}>
              No Rooms Found!
            </h3>
          ) : (
            searchedRooms.map((room) => {
              return (
                <SidebarChat key={room.id} name={room.data.name} id={room.id} />
              );
            })
          )
        ) : (
          rooms.map((room) => {
            return (
              <SidebarChat key={room.id} name={room.data.name} id={room.id} />
            );
          })
        )}

        {/* <SidebarChat /> */}
      </div>
    </div>
  );
};

export default Sidebar;
