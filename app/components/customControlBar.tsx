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
  PhoneOff 
} from "lucide-react";

const CustomControlBar = () => {
    const room = useRoomContext();
    const { localParticipant } = useLocalParticipant();
    const router = useRouter();

    const isVideoEnabled = localParticipant?.isCameraEnabled ?? false;
    const isAudioEnabled = localParticipant?.isMicrophoneEnabled ?? false;
    const isScreenSharing = localParticipant?.isScreenShareEnabled ?? false;

    const toggleVideo = () => {
        localParticipant?.setCameraEnabled(!isVideoEnabled);
        console.log(localParticipant);
    };

    const toggleAudio = () => {
        localParticipant?.setMicrophoneEnabled(!isAudioEnabled);
        console.log(localParticipant);
    };

    const toggleScreenShare = () => {
        localParticipant?.setScreenShareEnabled(!isScreenSharing);
    };

    const handleDisconnect = () => {
        room.disconnect();
        router.push('/');
    };

    const buttonBaseClasses = "flex items-center justify-center w-12 h-12 rounded-full transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2";
    
    return (
        <div className="w-full flex justify-center items-center gap-x-4 p-4">
            <button
                className={`${buttonBaseClasses} ${
                    isVideoEnabled 
                        ? "bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-500" 
                        : "bg-gray-200 hover:bg-gray-300 text-gray-700 focus:ring-gray-500"
                }`}
                onClick={toggleVideo}
                title={isVideoEnabled ? "Turn off camera" : "Turn on camera"}
            >
                {isVideoEnabled ? <Video size={20} /> : <VideoOff size={20} />}
            </button>

            <button
                className={`${buttonBaseClasses} ${
                    isAudioEnabled 
                        ? "bg-green-500 hover:bg-green-600 text-white focus:ring-green-500" 
                        : "bg-gray-200 hover:bg-gray-300 text-gray-700 focus:ring-gray-500"
                }`}
                onClick={toggleAudio}
                title={isAudioEnabled ? "Mute microphone" : "Unmute microphone"}
            >
                {isAudioEnabled ? <Mic size={20} /> : <MicOff size={20} />}
            </button>

            <button
                className={`${buttonBaseClasses} ${
                    isScreenSharing 
                        ? "bg-purple-500 hover:bg-purple-600 text-white focus:ring-purple-500" 
                        : "bg-gray-200 hover:bg-gray-300 text-gray-700 focus:ring-gray-500"
                }`}
                onClick={toggleScreenShare}
                title={isScreenSharing ? "Stop screen sharing" : "Start screen sharing"}
            >
                {isScreenSharing ? <MonitorOff size={20} /> : <Monitor size={20} />}
            </button>
            <button
                className={`${buttonBaseClasses} bg-red-500 hover:bg-red-600 text-white focus:ring-red-500 ml-4`}
                onClick={handleDisconnect}
                title="Leave call"
            >
                <PhoneOff size={20} />
            </button>
        </div>
    );
};

export default CustomControlBar;