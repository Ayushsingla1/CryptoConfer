import { RoomAudioRenderer, useChat } from "@livekit/components-react"
import CustomControlBar from "./customControlBar"
import ChatComponent from "./chatComponents"
import { useState } from "react";
import MyVideoConference from "./videoConference";

const MyVideoComponent = () => {
    const [chatOpened, setChatOpened] = useState(false);
    const { chatMessages, send, isSending } = useChat();
    
    return (
        <div 
            data-lk-theme="default" 
            className='h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative'
        >
            
            <div className="relative flex flex-col h-full">
                <div className="flex-1 flex flex-row gap-4 p-4 min-h-0">
                    <div 
                        className={`
                            flex-1 relative rounded-2xl overflow-hidden 
                            bg-gradient-to-br from-slate-800/50 to-slate-900/50 
                            backdrop-blur-sm border border-white/10 shadow-2xl
                            transition-all duration-500 ease-in-out
                            ${chatOpened ? 'mr-2' : ''}
                        `}
                    >
                        <MyVideoConference />
                    </div>
                    
                    <div 
                        className={`
                            transition-all duration-500 ease-in-out transform
                            ${chatOpened 
                                ? 'w-80 opacity-100 translate-x-0 scale-100' 
                                : 'w-0 opacity-0 translate-x-8 scale-95 pointer-events-none'
                            }
                        `}
                    >
                        {chatOpened && (
                            <div className="h-full rounded-2xl overflow-hidden bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-md border border-white/10 shadow-2xl">
                                <ChatComponent 
                                    setChatOpened={setChatOpened} 
                                    chatMessages={chatMessages} 
                                    send={send} 
                                    isSending={isSending} 
                                    chatOpened={chatOpened} 
                                />
                            </div>
                        )}
                    </div>
                </div>
                
                <div className="relative z-10">
                    <CustomControlBar setChatOpened={setChatOpened} />
                </div>
            </div>
            
            <RoomAudioRenderer />
        </div>
    )
}

export default MyVideoComponent;