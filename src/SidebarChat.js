import React, { useState, useEffect } from "react";
import "./SidebarChat.css";
import { Avatar } from "@mui/material";
import Chat from "./Chat";

import {
  orderBy,
  query,
  collection,
  doc,
  // getDocs,
  // docs,
  onSnapshot,
  // getDoc,
  getFirestore,
  // docChanges,
  addDoc,
  // Timestamp,
  // serverTimestamp,
  // FieldValue,
} from "firebase/firestore";

import { Link } from "react-router-dom";

const SidebarChat = ({ id, name, addNewChat }) => {
  const [SEED, setSEED] = useState("");
  const [myMessages, setMyMessages] = useState("");
  // const [mydots, setMydots] = useState(false);

  useEffect(() => {
    if (id) {
      const currRoom = doc(getFirestore(), "rooms", id);
      const currRoomCollection = collection(currRoom, "messages");
      const ordered = query(currRoomCollection, orderBy("timestamp", "desc"));

      onSnapshot(ordered, (snapshot) =>
        setMyMessages(snapshot.docs.map((doc) => doc.data()))
      );
    }
  }, [id]);

  useEffect(() => {
    setSEED(Math.floor(Math.random() * 5000));
  }, []);

  const URL = `https://avatars.dicebear.com/api/bottts/${SEED}.svg?background=white`;

  const createRoom = () => {
    const roomName = prompt("Please Enter Name For The Room");

    if (roomName) {
      try {
        addDoc(collection(getFirestore(), "rooms"), {
          name: roomName,
        });
      } catch (error) {
        alert("Sorry some Error");
      }
    }
  };
  let msg = myMessages[0]?.message;
  // let msg2 = myMessages[0]?.message;

  // let msgg = toString(msggg);
  let len = 0;
  let len2 = 0;
  let myName = "";
  if (msg) {
    if (msg.length > 15) {
      len = msg.length;
      msg = msg.substr(0, 16);
      // setMydots(true);
    }
  }

  if (name) {
    if (name.length > 15) {
      len2 = name.length;
      myName = name.substr(0, 16);
    }
  }

  // console.log(msggg);
  // fdsfd;
  const renderChat = () => {
    <Chat key={id} id={id} />;
    console.log("i am in sc ");
  };

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div onClick={renderChat} className="sidebarchat">
        <Avatar src={URL} />
        <div className="sidebarchat-info">
          <h3>
            {myName} {len2 > 15 ? "..." : name}
          </h3>
          {/* {console.log(name)} */}
          <p className="my-paragraph">
            {msg} {len > 15 ? "..." : ""}
            {/* Just Some Random stuff */}
          </p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createRoom} className="sidebarchat">
      <h3
        style={{ letterSpacing: "5px", alignItems: "center", margin: "auto" }}
      >
        Create a Room
      </h3>
    </div>
  );
};

export default SidebarChat;
