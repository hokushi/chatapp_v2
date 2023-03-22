import {useState,useEffect} from "react";
import { useRouter } from "next/router";
import axios from "axios";

const MessageComponent = ({ sendthing, isMine, setterfunc }) => {
    const floatStyle = isMine ? "float-right" : "float-left";
    const colorStyle = isMine ? "bg-gray-300" : "bg-white";
    const [deleteCheck, setDeleteCheck] = useState(false);
  
    const messageID = sendthing.senderIcon;
  
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
  
        {/*{isMine && deleteCheck && (
          <Check
            messageID={messageID}
            setterfunc={setterfunc}
            setDeleteCheck={setDeleteCheck}
          />
        )}*/}
      </div>
    );
  };
  

const ChatRoom = () => {
    const router = useRouter();
    const [messageList, setMessageList] = useState(undefined);
    const [renderAfterSend, setRenderAfterSend] = useState(false);

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
    }, [renderAfterSend])

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
        </>
    );
    } else {
        return <div>loading...</div>;
    }
    };

export default ChatRoom;