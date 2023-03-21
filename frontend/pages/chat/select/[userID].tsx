import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";

const selectRoom = () => {

    const [chatroom, setChatroom] = useState([]);
    const [personalID, setPersonalID] = useState("");

    useEffect(() => {
        const userID=JSON.parse(localStorage.getItem("myID"));
        const RoomURL=`http://localhost:3130/chat/room/${userID}`
        setPersonalID(userID)
        axios.get(RoomURL)
        .then((res) => {
            console.log(res.data);
            setChatroom(res.data);
          })
        .catch((err) => {
            console.log(err);
            }
        )
        }, [])

    if(chatroom){
        return (
            <>
              <div className="text-5xl bg-slate-200">トーク</div>
              {chatroom.map((chatroom: { name: string; id }, index: number) => {
          return (
            <div>
              <div className="w-full grid grid-cols-10 my-1" key={chatroom.id}>
                <div className="col-start-1 col-end-2 text-5xl bg-slate-400">
                  {chatroom.id}
                </div>
                <Link
                  className="col-start-2 col-end-11 text-base"
                  href={`http://localhost:3000/chat/${personalID}/room/${chatroom.id}`}
                >
                  {chatroom.name}
                </Link>
              </div>
            </div>
          );
        })}
            </>
        )
    } else {
        return <div>loading...</div>;
    }
}

export default selectRoom