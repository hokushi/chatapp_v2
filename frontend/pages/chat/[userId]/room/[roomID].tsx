import {useState,useEffect} from "react";
import { useRouter } from "next/router";
import axios from "axios";

const ChatRoom = () => {
    const router = useRouter();
    const [messageList, setMessageList] = useState(undefined);

    useEffect(() => {
        console.log(router)
        console.log(router.query.roomID);
        const messageURL = `http://localhost:3130/chat/message/${router.query.roomID}`;
        axios.get(messageURL)
        .then((res) => {
            console.log(res.data);
            setMessageList(res.data);
            console.log(res.data[0].room)
        })
        .catch((err) => {
            console.log(err);
        })
    }, [])

    if(messageList){
    return (
        <>
        <div className="fixed top-0 w-full py-1 mx-auto bg-slate-300 grid grid-cols-7">
          <button
            className="text-3xl col-start-1 col-end-2"
            onClick={() => router.back()}
          >
            ▷
          </button>
          <h1 className="text-3xl flex justify-center col-start-3 col-end-6">
            {messageList[0].room}
          </h1>
        </div>
        </>
    );
    } else {
        return <div>loading...</div>;
    }
    };

export default ChatRoom;