import {useState,useEffect} from "react";
import { useRouter } from "next/router";
import Check from "../../../components/check";
import axios from "axios";
import Link from "next/link";

const MessageComponent = ({ sendthing, isMine, setterfunc }) => {
    const floatStyle = isMine ? "float-right" : "float-left";
    const colorStyle = isMine ? "bg-gray-300" : "bg-white";
    const [deleteCheck, setDeleteCheck] = useState(false);

    const messageID = sendthing.content_id;
  
    return (
      <div className="overflow-hidden">
        {isMine || (
          <div className="float-left mr-2">{sendthing.senderIcon}</div>
        )}
        <div
          className={`rounded-t-md border-2 px-2 py-0 mt-1 max-w-xs text-base bg-gray-300 ${colorStyle} ${floatStyle}`}
          onClick={() => setDeleteCheck(!deleteCheck)}
        >
          {sendthing.content}
        </div>
        <div className={`${floatStyle} mt-5 text-gray-400 text-xs`}>
          {sendthing.created_at[2]}:{sendthing.created_at[3]}
        </div>
  
        {isMine && deleteCheck && (
          <Check
            messageID={messageID}
            setterfunc={setterfunc}
            setDeleteCheck={setDeleteCheck}
          />
        )}
      </div>
    );
  };
  

const ChatRoom = () => {
    const router = useRouter();
    const roomID = router.query.roomID;
    const myID = router.query.userId;
    const messageURL = `http://localhost:3130/chat/room/${roomID}/message`;
    const backpageURL = `http://localhost:3000/chat/select/${myID}`;
    const [message, setMessage] = useState("");
    const [messageList, setMessageList] = useState(undefined);
    const [renderAfterSend, setRenderAfterSend] = useState(false);

    useEffect(() => {
        if(router.isReady){
        console.log(router)
        console.log(router.query.roomID);
        /*localStorage.setItem("roomID", JSON.stringify(router.query.roomID));
        const roomID=Number(JSON.parse(localStorage.getItem("roomID")))*/
        axios.get(messageURL)
        .then((res) => {
            console.log(res.data);
            setMessageList(res.data);
            console.log(res.data[0].room)
        })
        .catch((err) => {
            console.log(err);
        })}
    }, [router.query, renderAfterSend])

    const sendMessage = () => {
        if (!message) {
          return;
        } else {
          const sendInformation = {
            senderID: JSON.parse(localStorage.getItem("myID")),
            content: message,
          };
          console.log(sendInformation);
          axios
            .post(messageURL, sendInformation)
            .then((res) => {
              setMessage("");
              console.log("送信完了")
            })
            .catch((err) => {
              console.log(err);
            });
        }
      };

    if(messageList){
    return (
        <>
        <div className="fixed top-0 w-full py-1 mx-auto bg-slate-300 grid grid-cols-7">
          <Link
            href={backpageURL}
            className="text-3xl col-start-1 col-end-2"
          >
            ▷
          </Link>
          <h1 className="text-3xl flex justify-center col-start-3 col-end-6">
            {messageList[0].room}
          </h1>
        </div>
        <div className="my-12 overflow-y-scroll h-auto">
            {messageList.map((message:{content:string;room:string;senderID:string;senderIcon:number;created_at:number[]},index:number) => {
                const isMine =
                message.senderID ==
                (JSON.parse(localStorage.getItem("myID")));
                if (index == 0) {
                    return (
                      <div key={index}>
                        <div className="text-center">
                          {message.created_at[0]}月{message.created_at[1]}日
                        </div>
                        <MessageComponent
                          sendthing={message}
                          isMine={isMine}
                          setterfunc={() => {
                            setRenderAfterSend(!renderAfterSend);
                          }}
                        />
                      </div>
                    );
                  }
                  if (
                    messageList[index].created_at[1] ==
                    messageList[index - 1].created_at[1]
                  ) {
                    return (
                      <div key={index}>
                        <MessageComponent
                          sendthing={message}
                          isMine={isMine}
                          setterfunc={() => {
                            setRenderAfterSend(!renderAfterSend);
                          }}
                        />
                      </div>
                    );
                } else {
                    return (
                      <div key={index}>
                        <div className="text-center">
                          {message.created_at[0]}月{message.created_at[1]}日
                        </div>
                        <MessageComponent
                          sendthing={message}
                          isMine={isMine}
                          setterfunc={() => {
                            setRenderAfterSend(!renderAfterSend);
                          }}
                        />
                      </div>
                    );
                  }
                })}
        </div>
        <div className="fixed bottom-0 w-full px-0 mx-auto mt-10 bg-slate-300">
          <form onSubmit={sendMessage}>
            <input
              type="text"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              className="block w-full p-2 pl-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-gray-700 focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
              placeholder="message"
              required
            />
            <button
              type="submit"
              className="absolute right-0 bottom-0 bg-slate-300 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              送信
            </button>
          </form>
        </div>
        </>
    );
    } else {
        return <div>loading...</div>;
    }
    };

export default ChatRoom;