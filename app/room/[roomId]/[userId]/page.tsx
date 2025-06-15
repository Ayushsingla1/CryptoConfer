'use client';
import {
  GridLayout,
  ParticipantTile,
  RoomAudioRenderer,
  RoomContext,
  useTracks,
  useChat,
} from '@livekit/components-react';
import { Room, Track } from 'livekit-client';
import '@livekit/components-styles';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ChatComponent from '@/app/components/chatComponents';
import CustomControlBar from '@/app/components/customControlBar';

export default function Page() {

  const params = useParams();
  const room = params.roomId;
  const name = params.userId;
  const [roomInstance] = useState(() => new Room({
    adaptiveStream: true,
    dynacast: true,
  }));

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const resp = await fetch(`/api/token?room=${room}&username=${name}`);
        const data = await resp.json();
        if (!mounted) return;
        if (data.token) {
          await roomInstance.connect(process.env.NEXT_PUBLIC_URL!, data.token);
        }
      } catch (e) {
        console.error(e);
      }
    })();
  
    return () => {
      mounted = false;
      roomInstance.disconnect();
    };
  }, [roomInstance,room,name]);

  return (
    <RoomContext.Provider value={roomInstance}>
      <div data-lk-theme="default" style={{ height: '100dvh' }} className='bg-black'>
        <MyVideoConference />
        <RoomAudioRenderer />
        {/* <ControlBar /> */}
        <CustomControlBar/>
      </div>
    </RoomContext.Provider>
  );
}

function MyVideoConference() {
  const [chatOpened,setChatOpened] = useState(false);
  const {chatMessages , send, isSending} = useChat();
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false },
  );
  return (

    <div className='flex'>
      <GridLayout tracks={tracks} style={{ height: 'calc(100vh - var(--lk-control-bar-height))' }}>
        <ParticipantTile />
      </GridLayout>
      {
        chatOpened ? (<ChatComponent setChatOpened = {setChatOpened} chatMessages={chatMessages} send={send} isSending={isSending}/>)
        : 
        (<button
  onClick={() => setChatOpened(true)}
  className="absolute bottom-4 right-4 z-50 flex items-center justify-center h-12 w-12 rounded-full bg-orange-600 hover:bg-orange-500 focus:ring-2 focus:ring-white shadow-lg transition-all duration-300 ease-in-out"
  aria-label="Open chat"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-white"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4.5-1.084L3 21l1.265-3.798A8.964 8.964 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
    />
  </svg>
</button>)
      }
    </div>
  );
}