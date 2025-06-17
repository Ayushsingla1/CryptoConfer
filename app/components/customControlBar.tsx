"use client"
import { useRoomContext, useLocalParticipant } from "@livekit/components-react";
import { useRouter } from "next/navigation";
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Monitor, 
  MonitorOff, 
  PhoneOff,
  MessageCircle
} from "lucide-react";

const CustomControlBar = ({setChatOpened} : {setChatOpened : React.Dispatch<React.SetStateAction<boolean>>}) => {
    const room = useRoomContext();
    const { localParticipant } = useLocalParticipant();
    const router = useRouter();

    const isVideoEnabled = localParticipant?.isCameraEnabled ?? false;
    const isAudioEnabled = localParticipant?.isMicrophoneEnabled ?? false;
    const isScreenSharing = localParticipant?.isScreenShareEnabled ?? false;

    const toggleVideo = () => {
        localParticipant?.setCameraEnabled(!isVideoEnabled);
    };

    const toggleAudio = () => {
        localParticipant?.setMicrophoneEnabled(!isAudioEnabled);
    };

    const toggleScreenShare = () => {
        localParticipant?.setScreenShareEnabled(!isScreenSharing);
    };

    const handleDisconnect = () => {
        room.disconnect();
        router.push('/');
    };

    const buttonBaseClasses = "relative flex items-center justify-center w-14 h-14 rounded-full transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-opacity-50 shadow-lg backdrop-blur-sm";
    
    return (
        <div className="w-full bg-gradient-to-r from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl border-t border-white/10 shadow-2xl">
            <div className="flex justify-between items-center px-8 py-4">
                <div className="flex flex-col items-start space-y-1 min-w-fit">
                    <span className="text-2xl font-bold text-white tracking-tight">
                        {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <span className="text-sm text-slate-300 font-medium">
                        {new Date().toLocaleDateString([], { 
                            weekday: 'short', 
                            month: 'short', 
                            day: 'numeric' 
                        })}
                    </span>
                </div>

                <div className="flex justify-center items-center gap-3 bg-black/20 rounded-full px-6 py-3 border border-white/10">
                    <button
                        className={`${buttonBaseClasses} ${
                            isVideoEnabled 
                                ? "bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white focus:ring-blue-400 shadow-blue-500/25" 
                                : "bg-gradient-to-br from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 text-slate-300 focus:ring-slate-400"
                        }`}
                        onClick={toggleVideo}
                        title={isVideoEnabled ? "Turn off camera" : "Turn on camera"}
                    >
                        {isVideoEnabled ? <Video size={22} /> : <VideoOff size={22} />}
                        <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${
                            isVideoEnabled ? 'bg-green-400' : 'bg-red-400'
                        } ring-2 ring-white/30`} />
                    </button>

                    <button
                        className={`${buttonBaseClasses} ${
                            isAudioEnabled 
                                ? "bg-gradient-to-br from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white focus:ring-emerald-400 shadow-emerald-500/25" 
                                : "bg-gradient-to-br from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 text-slate-300 focus:ring-slate-400"
                        }`}
                        onClick={toggleAudio}
                        title={isAudioEnabled ? "Mute microphone" : "Unmute microphone"}
                    >
                        {isAudioEnabled ? <Mic size={22} /> : <MicOff size={22} />}
                        <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${
                            isAudioEnabled ? 'bg-green-400' : 'bg-red-400'
                        } ring-2 ring-white/30`} />
                    </button>

                    <button
                        className={`${buttonBaseClasses} ${
                            isScreenSharing 
                                ? "bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 text-white focus:ring-purple-400 shadow-purple-500/25" 
                                : "bg-gradient-to-br from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 text-slate-300 focus:ring-slate-400"
                        }`}
                        onClick={toggleScreenShare}
                        title={isScreenSharing ? "Stop screen sharing" : "Start screen sharing"}
                    >
                        {isScreenSharing ? <MonitorOff size={22} /> : <Monitor size={22} />}
                        {isScreenSharing && (
                            <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-400 ring-2 ring-white/30" />
                        )}
                    </button>

                    <div className="w-px h-8 bg-white/20 mx-2" />

                    <button
                        className={`${buttonBaseClasses} bg-gradient-to-br from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 text-white focus:ring-red-400 shadow-red-500/25`}
                        onClick={handleDisconnect}
                        title="Leave call"
                    >
                        <PhoneOff size={22} />
                    </button>
                </div>
                
                {/* Chat Button */}
                <div className="flex items-center justify-center min-w-fit">
                    <button
                        onClick={() => setChatOpened(prev => !prev)}
                        className="relative flex items-center justify-center h-14 w-14 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 focus:ring-4 focus:ring-orange-400 focus:ring-opacity-50 shadow-lg shadow-orange-500/25 transition-all duration-300 transform hover:scale-110 backdrop-blur-sm"
                        title="Toggle chat"
                    >
                        <MessageCircle size={22} className="text-white" />
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CustomControlBar;