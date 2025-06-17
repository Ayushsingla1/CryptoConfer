"use client"
import { ReceivedChatMessage, useRoomContext } from "@livekit/components-react";
import React, { useState, useRef, useEffect } from "react";
import { useAccount } from "wagmi";
import { X, Send, MessageCircle } from "lucide-react";
import { useWriteContract } from "wagmi";
import { sendTokens } from "./sendTokens";


const ChatComponent = ({ 
    setChatOpened, 
    chatMessages, 
    send, 
    isSending, 
    chatOpened 
}: { 
    setChatOpened: React.Dispatch<React.SetStateAction<boolean>>, 
    chatMessages: ReceivedChatMessage[], 
    send: (message: string) => Promise<ReceivedChatMessage>, 
    isSending: boolean, 
    chatOpened: boolean 
}) => {
    const { address } = useAccount();
    const [message, setMessage] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const { writeContractAsync } = useWriteContract();
    const room = useRoomContext();
    console.log(room.remoteParticipants);
    
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatMessages]);

    useEffect(() => {
        if (chatOpened && inputRef.current) {
            inputRef.current.focus();
        }
    }, [chatOpened]);

    const handleSend = async (e: React.MouseEvent<HTMLButtonElement> | React.FormEvent) => {
        e.preventDefault();
        if (message.trim().length === 0) return;

        if(message === "/send"){
            try {
                const participants : string[] = [];
                room.remoteParticipants.forEach(participant => {
                    participants.push(participant.identity);
                })
                const res = await sendTokens(writeContractAsync,participants,1);
                console.log(res);
                setMessage("");
            } catch (error) {
                console.log("Error Occured")
                console.log(error)
            }
        }
        
        else{
            try {
                await send(message);
                setMessage("");
            } catch (error) {
                console.error("Failed to send message:", error);
            }
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (!isSending && message.trim().length > 0) {
                handleSend(e);
            }
        }
    };

    const formatTime = (timestamp: number) => {
        const now = new Date();
        const messageTime = new Date(timestamp);
        const diffInHours = (now.getTime() - messageTime.getTime()) / (1000 * 60 * 60);
        
        if (diffInHours < 24) {
            return messageTime.toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
            });
        } else {
            return messageTime.toLocaleDateString([], { 
                month: 'short', 
                day: 'numeric',
                hour: '2-digit', 
                minute: '2-digit' 
            });
        }
    };

    return (
        <div className="flex flex-col h-full bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent_50%)]" />
            </div>
            
            <div className="relative z-10 flex items-center justify-between p-4 bg-gradient-to-r from-slate-700/50 to-slate-800/50 backdrop-blur-sm border-b border-white/10">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow-lg">
                        <MessageCircle size={20} className="text-white" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-white">Chat</h3>
                        <p className="text-xs text-slate-300">
                            {chatMessages.length} message{chatMessages.length !== 1 ? 's' : ''}
                        </p>
                    </div>
                </div>
                <button 
                    className="p-2 hover:bg-white/10 rounded-full transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/20" 
                    onClick={() => setChatOpened(false)} 
                    aria-label="Close Chat"
                >
                    <X size={20} className="text-slate-300 hover:text-white transition-colors" />
                </button>
            </div>

            <div className="flex-1 overflow-hidden flex flex-col">
                <div className="flex-1 overflow-y-auto p-4 space-y-3 scroll-smooth">
                    {chatMessages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center opacity-60">
                            <MessageCircle size={48} className="text-slate-400 mb-4" />
                            <p className="text-slate-400 text-sm">No messages yet</p>
                            <p className="text-slate-500 text-xs mt-1">Start the conversation!</p>
                        </div>
                    ) : (
                        chatMessages.map((msg, index) => {
                            const isSelf = msg.from?.identity === address;
                            const showAvatar = index === 0 || chatMessages[index - 1]?.from?.identity !== msg.from?.identity;
                            
                            return (
                                <div
                                    key={index}
                                    className={`flex gap-2 ${isSelf ? 'flex-row-reverse' : 'flex-row'}`}
                                >
                                    <div className={`flex-shrink-0 ${showAvatar ? 'opacity-100' : 'opacity-0'}`}>
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                                            isSelf 
                                                ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white' 
                                                : 'bg-gradient-to-br from-slate-600 to-slate-700 text-slate-200'
                                        }`}>
                                            {(msg.from?.identity || 'U')[0].toUpperCase()}
                                        </div>
                                    </div>
                                    
                                    <div className={`flex flex-col max-w-[80%] ${isSelf ? 'items-end' : 'items-start'}`}>
                                        {showAvatar && !isSelf && (
                                            <span className="text-xs text-slate-400 mb-1 px-3">
                                                {msg.from?.identity?.slice(0, 8)}...
                                            </span>
                                        )}
                                        <div
                                            className={`px-4 py-3 rounded-2xl break-words shadow-lg backdrop-blur-sm border ${
                                                isSelf
                                                    ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white border-blue-400/20 rounded-br-md'
                                                    : 'bg-gradient-to-br from-slate-700 to-slate-800 text-white border-white/10 rounded-bl-md'
                                            }`}
                                        >
                                            <div className="text-sm leading-relaxed">{msg.message}</div>
                                            <div className={`text-xs mt-2 ${
                                                isSelf ? 'text-blue-100' : 'text-slate-400'
                                            }`}>
                                                {formatTime(msg.timestamp)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            <div className="relative z-10 p-4 bg-gradient-to-r from-slate-700/50 to-slate-800/50 backdrop-blur-sm border-t border-white/10">
                <form onSubmit={handleSend} className="flex gap-3">
                    <div className="flex-1 relative">
                        <input 
                            ref={inputRef}
                            className="w-full bg-slate-900/80 border border-white/20 rounded-full px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
                            placeholder="Type your message..." 
                            value={message} 
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            disabled={isSending}
                        />
                        {message.trim().length > 0 && (
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-slate-400">
                                {message.length}/500
                            </div>
                        )}
                    </div>
                    <button 
                        type="submit"
                        disabled={isSending || message.trim().length === 0} 
                        className={`p-3 rounded-full transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 shadow-lg ${
                            isSending || message.trim().length === 0
                                ? 'bg-slate-600 text-slate-400 cursor-not-allowed focus:ring-slate-500'
                                : 'bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white focus:ring-blue-400 shadow-blue-500/25'
                        }`}
                        aria-label={isSending ? 'Sending message' : 'Send message'}
                    >
                        <Send size={18} className={`transition-transform ${isSending ? 'animate-pulse' : ''}`} />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatComponent;