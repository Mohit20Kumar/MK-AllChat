import Picker from "emoji-picker-react";
import React, { useRef, useEffect, useState, useCallback } from "react";
// import URL from "./SidebarChat";
import { Avatar, IconButton } from "@mui/material";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
import BasicMenu from "./ChatMenu";
import "./Chat.css";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import { useParams } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import SendIcon from "@mui/icons-material/Send";
// import ReactScrollableFeed from "react-scrollable-feed";
import ScrollableFeed from "react-scrollable-feed";

import {
  orderBy,
  query,
  collection,
  doc,
  // getDocs,
  // docs,
  onSnapshot,
  getDoc,
  getFirestore,
  // docChanges,
  addDoc,
  // Timestamp,
  serverTimestamp,
  // FieldValue,
  // deleteDoc,
} from "firebase/firestore";

const Chat = () => {
  const [{ user }, dispatch] = useStateValue();
  const { roomId } = useParams();
  // const roomId = "0KfZNrQmAPjibXcZK2Tj";
  // console.log(roomId);
  // const roomId = id;
  const inputRef = useRef();
  const [insideMessages, setInsideMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [cursorPosition, setCursorPosition] = useState();
  const [roomName, setRoomName] = useState("");
  const messageEl = useRef();
  console.log(roomId);
  console.log("now i am in chat");

  // const scrollToBottom = () => {
  //   messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  // };

  // useEffect(() => {}, [message]);
  const getMeData = async () => {
    if (roomId) {
      const currRoom = doc(getFirestore(), "rooms", roomId);
      const data = await getDoc(currRoom);
      setRoomName(data.data().name);

      // Something dangerous

      const currRoomCollection = collection(currRoom, "messages");
      const ordered = query(currRoomCollection, orderBy("timestamp", "asc"));

      onSnapshot(ordered, (snapshot) =>
        setInsideMessages(snapshot.docs.map((doc) => doc.data()))
      );
      // console.log(insideMessages);
      // each.map((smaller) => {
      // console.log(smaller.data().name);
      // });
    }
    // console.log(roomId);;
  };
  useEffect(() => {
    getMeData();
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      const currRoom = doc(getFirestore(), "rooms", roomId);
      const currRoomCollection = collection(currRoom, "messages");

      addDoc(currRoomCollection, {
        message: message,
        name: user.displayName,
        timestamp: serverTimestamp(),
      });

      setMessage("");
      setShowEmoji(false);
    }

    // Adding messages to the firebase with some magic which is casted by me ofcourse.
  };

  const handleEmojiOnOff = () => {
    inputRef.current.focus();
    setShowEmoji(!showEmoji);
  };

  // emojiss
  // const [chosenEmoji, setChosenEmoji] = useState(null);

  const onEmojiClick = (e, { emoji }) => {
    // setChosenEmoji(emojiObject);
    const ref = inputRef.current;
    ref.focus();
    const start = message.substring(0, ref.selectionStart);
    const end = message.substring(ref.selectionEnd);
    const text = start + emoji + end;
    setMessage(text);
    setCursorPosition(start.length + emoji.length);

    // setInput(input + chosenEmoji.emoji);
  };
  // console.log(showEmoji);
  useEffect(() => {
    inputRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);

  let myDate = new Date(
    insideMessages[insideMessages.length - 1]?.timestamp?.toDate()
  ).toUTCString();

  useEffect(() => {
    inputRef.current.focus();
  }, [roomId]);

  // useEffect(() => {
  //   if (messageEl) {
  //     messageEl.current.addEventListener("DOMNodeInserted", (event) => {
  //       const { currentTarget: target } = event;
  //       target.scroll({ top: target.scrollHeight, behavior: "smooth" });
  //     });
  //   }
  // }, [message]);

  // const messagesEndRef = useRef(null);

  // const scrollToBottom = () => {
  //   messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  // };

  // useEffect(scrollToBottom, [insideMessages]);

  return (
    <div className="chat">
      <div className="chat-header">
        {/* <Avatar src={URL} /> */}

        <Avatar src="https://avatars.dicebear.com/api/bottts/$1.svg" />
        <div className="chat-headerInfo">
          <h3 style={{ textTransform: "capitalize" }}>
            {/* {roomName} */}
            {roomName.length > 30 ? roomName.substr(0, 31) + "..." : roomName}
          </h3>

          {insideMessages.length !== 0 ? (
            <p>
              Last Msg Was Sent On: {myDate === "Invalid Date" ? " " : myDate}
            </p>
          ) : (
            <p>Send a Message..Please</p>
          )}
        </div>
        <div className="chat-headerRight">
          <BasicMenu roomId={roomId} />
        </div>
      </div>

      <ScrollableFeed className="chat-body">
        <div>
          {insideMessages.map((singleMsg) => {
            return <Msg {...singleMsg} {...user} key={singleMsg.id} />;
          })}
          {/* <div ref={messagesEndRef} /> */}
        </div>
      </ScrollableFeed>
      <div className="chat-footer">
        <IconButton>
          <InsertEmoticonIcon
            onClick={handleEmojiOnOff}
            style={{ color: "white" }}
          />
        </IconButton>
        {showEmoji ? (
          <Picker
            pickerStyle={{
              position: "absolute",
              top: "-340px",
              left: "8px",
            }}
            onEmojiClick={onEmojiClick}
          />
        ) : null}
        <form>
          <input
            ref={inputRef}
            id="example1"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            type="text"
            placeholder="Type Something"
          />
          {/* <button onClick={sendMessage} type="submit"> */}
          <IconButton
            className="my-btn"
            style={{ color: "white", margin: "0 5px" }}
            onClick={sendMessage}
            type="submit"
          >
            <SendIcon />
          </IconButton>
          {/* </button> */}
        </form>
      </div>
    </div>
  );
};

export default Chat;

// import React from "react";

export const Msg = ({ name, message, timestamp, displayName }) => {
  return (
    <div>
      <p className={`chat-message ${name === displayName && "chat-reciever"}`}>
        <span className="chat-name">{name}</span>
        {message}
        <span className="chat-timestamp">
          {new Date(timestamp?.toDate()).toUTCString()}
        </span>
      </p>
    </div>
  );
};
