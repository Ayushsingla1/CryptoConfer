import { ReceivedChatMessage } from "@livekit/components-react";
import React, { useState } from "react";
import { useAccount } from "wagmi";


const ChatComponent = ({ setChatOpened , chatMessages, send, isSending}: { setChatOpened: React.Dispatch<React.SetStateAction<boolean>>, chatMessages : ReceivedChatMessage[], send : (message: string) => Promise<ReceivedChatMessage> , isSending: boolean }) => {

    const { address } = useAccount();

    const [message, setMessage] = useState("");

    console.log(chatMessages);

    const handleSend = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (message.trim().length === 0) return alert("No message entered");
        const res = await send(message);
        console.log(res);
        return;
    }

    return <div className="flex flex-col bg-black text-white h-[9-vh] w-1/4 justify-between mb-3">
        <div className="text-center mt-5 text-xl">
            <div className="self-end text-end mr-4">
                <button className="text-white text-xl hover:text-red-500 transition mr-4 mt-2" onClick={() => setChatOpened(false)} aria-label="Close Chat">✕</button></div>
            <div>Chat Messages</div>
        </div>
        <div className="flex flex-col gap-y-5 px-4">
            <div className="flex flex-col gap-y-4 overflow-y-auto max-h-[75vh]">
                {
                    chatMessages.map((message, index) => {
                        const isSelf = message.from?.identity === address;
                        return (
                            <div
                                key={index}
                                className={`flex flex-col px-3 py-2 rounded-md break-words max-w-[75%] w-fit ${isSelf ? 'bg-blue-600 text-white self-end' : 'bg-gray-800 text-white self-start'
                                    }`}
                            >
                                <div>{message.message}</div>
                                <div className="text-xs text-gray-300 self-end mt-1">
                                    {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                            </div>
                        );
                    })
                }
            </div>

            <div className="flex gap-x-2">
                <input className="border-2 border-gray-600 w-10/12 rounded-md px-2 py-1 h-10" placeholder="Enter Your Message" value={message} name="message" onChange={(e) => setMessage(e.target.value)} />
                <button disabled={isSending || message.trim().length === 0} onClick={(e) => handleSend(e)} className={`px-4 py-2 rounded-md text-white ${isSending || message.trim().length === 0
                    ? 'bg-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-500'
                    } transition`}>{isSending ? 'Sending...' : 'Send'}</button>
            </div>

        </div>

    </div>
}

export default ChatComponent;