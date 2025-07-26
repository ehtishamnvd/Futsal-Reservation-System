import React, { useEffect, useState } from "react";
import { db, auth, storage } from "../firebase";
import * as CONSTANT from "../Constant/constant";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  Timestamp,
  orderBy,
  setDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import User from "../components/User";
import MessageForm from "../components/MessageForm";
import Message from "../components/Message";
import { async } from "@firebase/util";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState("");
  const [text, setText] = useState("");
  const [img, setImg] = useState("");
  const [msgs, setMsgs] = useState([]);
  const [onlineUserID, setOnlineUserID] = useState(
    window.localStorage.getItem("onlineID")
  );
  const [onlineUserName, setOnlineUserName] = useState(
    window.localStorage.getItem("onlineName")
  );

  useEffect(() => {
    setOnlineUserID(window.localStorage.getItem("onlineID"));
    setOnlineUserName(window.localStorage.getItem("onlineName"));
    getAllUsers();
  });
  const getAllUsers = async () => {
    let id = window.localStorage.getItem("onlineID");
    await CONSTANT.API.get(`/team/all/${id}`).then((res) => {
      setUsers(res.data);
    });
  };

  const selectUser = async (user) => {
    setChat(user);

    const user2 = user._id;
    const id =
      onlineUserID > user2
        ? `${onlineUserID + user2}`
        : `${user2 + onlineUserID}`;

    const msgsRef = collection(db, "messages", id, "chat");
    const q = query(msgsRef, orderBy("createdAt", "asc"));

    onSnapshot(q, (querySnapshot) => {
      let msgs = [];
      querySnapshot.forEach((doc) => {
        msgs.push(doc.data());
      });
      setMsgs(msgs);
    });

    // get last message b/w logged in user and selected user
    const docSnap = await getDoc(doc(db, "lastMsg", id));
    // if last message exists and message is from selected user
    if (docSnap.data() && docSnap.data().from !== onlineUserID) {
      // update last message doc, set unread to false
      await updateDoc(doc(db, "lastMsg", id), { unread: false });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user2 = chat._id;

    const id =
      onlineUserID > user2
        ? `${onlineUserID + user2}`
        : `${user2 + onlineUserID}`;

    let url;
    if (img) {
      const imgRef = ref(
        storage,
        `images/${new Date().getTime()} - ${img.name}`
      );
      const snap = await uploadBytes(imgRef, img);
      const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
      url = dlUrl;
    }

    await addDoc(collection(db, "messages", id, "chat"), {
      text,
      from: onlineUserID,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || "",
    });

    await setDoc(doc(db, "lastMsg", id), {
      text,
      from: onlineUserID,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || "",
      unread: true,
    });

    setText("");
    setImg("");
  };
  return (
    <div className="home_container">
      <div className="users_container">
        {users.map((user) => (
          <User
            key={user._id}
            user={user}
            selectUser={selectUser}
            user1={onlineUserID}
            chat={chat}
          />
        ))}
      </div>
      <div className="messages_container">
        {chat ? (
          <>
            <div className="messages_user">
              <h3>{chat.name}</h3>
            </div>
            <div className="messages">
              {msgs.length
                ? msgs.map((msg, i) => (
                    <Message key={i} msg={msg} user1={onlineUserID} />
                  ))
                : null}
            </div>
            <MessageForm
              handleSubmit={handleSubmit}
              text={text}
              setText={setText}
              setImg={setImg}
            />
          </>
        ) : (
          <h3 className="no_conv">Select a user to start conversation</h3>
        )}
      </div>
    </div>
  );
};

export default Home;
