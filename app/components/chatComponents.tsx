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
    const [isSendMode, setIsSendMode] = useState(false);
    const [sendAmount, setSendAmount] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const { writeContractAsync } = useWriteContract();
    const room = useRoomContext();

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
        
        if (isSendMode) {
            if (!sendAmount || parseFloat(sendAmount) <= 0) return;
            
            try {
                const participants: string[] = [];
                room.remoteParticipants.forEach(participant => {
                    participants.push(participant.identity);
                });
                
                const res = await sendTokens(writeContractAsync, participants, parseFloat(sendAmount));
                console.log(res);
            
                await send(`Sent ${sendAmount} tokens to all participants`);

                setIsSendMode(false);
                setSendAmount("");
                setMessage("");
            } catch (error) {
                console.log("Error occurred while sending tokens:", error);
                await send("Failed to send tokens. Please try again.");
                setIsSendMode(false);
                setSendAmount("");
                setMessage("");
            }
        } else {
            if (message.trim().length === 0) return;
            if (message.toLowerCase().startsWith('/send')) {
                setIsSendMode(true);
                setMessage("");
                return;
            }
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
            if (!isSending && (isSendMode ? sendAmount.trim().length > 0 : message.trim().length > 0)) {
                handleSend(e);
            }
        }
        
        if (e.key === 'Escape' && isSendMode) {
            setIsSendMode(false);
            setSendAmount("");
            setMessage("");
        }
    };

    const cancelSendMode = () => {
        setIsSendMode(false);
        setSendAmount("");
        setMessage("");
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
                {isSendMode ? (
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                <span className="text-sm text-green-400 font-medium">Token Send Mode</span>
                            </div>
                            <button 
                                onClick={cancelSendMode}
                                className="text-slate-400 hover:text-white text-sm transition-colors"
                            >
                                Cancel (ESC)
                            </button>
                        </div>
                        
                        <div className="bg-slate-800/50 rounded-lg p-3 border border-yellow-500/20">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-yellow-400 text-sm">💰</span>
                                <span className="text-sm text-slate-300">
                                    Sending tokens to {room.remoteParticipants.size} participant{room.remoteParticipants.size !== 1 ? 's' : ''}
                                </span>
                            </div>
                            <div className="text-xs text-slate-400">
                                {Array.from(room.remoteParticipants.values()).map(p => p.identity.slice(0, 8) + '...').join(', ')}
                            </div>
                        </div>
                        
                        <form onSubmit={handleSend} className="flex gap-3">
                            <div className="flex-1 relative">
                                <input 
                                    ref={inputRef}
                                    type="number"
                                    step="0.01"
                                    min="0.01"
                                    className="w-full bg-slate-900/80 border border-green-400/30 rounded-full px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
                                    placeholder="Enter amount to send..." 
                                    value={sendAmount} 
                                    onChange={(e) => setSendAmount(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    disabled={isSending}
                                    autoFocus
                                />
                                {sendAmount && parseFloat(sendAmount) > 0 && (
                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-green-400">
                                        {parseFloat(sendAmount) * room.remoteParticipants.size} total
                                    </div>
                                )}
                            </div>
                            <button 
                                type="submit"
                                disabled={isSending || !sendAmount || parseFloat(sendAmount) <= 0} 
                                className={`px-4 py-3 rounded-full transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 shadow-lg ${
                                    isSending || !sendAmount || parseFloat(sendAmount) <= 0
                                        ? 'bg-slate-600 text-slate-400 cursor-not-allowed focus:ring-slate-500'
                                        : 'bg-gradient-to-br from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white focus:ring-green-400 shadow-green-500/25'
                                }`}
                                aria-label={isSending ? 'Sending tokens' : 'Send tokens'}
                            >
                                {isSending ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span className="text-sm">Sending...</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm">💰 Send</span>
                                    </div>
                                )}
                            </button>
                        </form>
                    </div>
                ) : (
                    <form onSubmit={handleSend} className="flex gap-3">
                        <div className="flex-1 relative">
                            <input 
                                ref={inputRef}
                                className="w-full bg-slate-900/80 border border-white/20 rounded-full px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
                                placeholder="Type your message or '/send' for tokens..." 
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
                            {message.toLowerCase().startsWith('/send') && (
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-green-400 animate-pulse">
                                    Press Enter
                                </div>
                            )}
                        </div>
                        <button 
                            type="submit"
                            disabled={isSending || message.trim().length === 0} 
                            className={`p-3 rounded-full transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 shadow-lg ${
                                isSending || message.trim().length === 0
                                    ? 'bg-slate-600 text-slate-400 cursor-not-allowed focus:ring-slate-500'
                                    : message.toLowerCase().startsWith('/send')
                                    ? 'bg-gradient-to-br from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white focus:ring-green-400 shadow-green-500/25'
                                    : 'bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white focus:ring-blue-400 shadow-blue-500/25'
                            }`}
                            aria-label={isSending ? 'Sending message' : 'Send message'}
                        >
                            <Send size={18} className={`transition-transform ${isSending ? 'animate-pulse' : ''}`} />
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ChatComponent;