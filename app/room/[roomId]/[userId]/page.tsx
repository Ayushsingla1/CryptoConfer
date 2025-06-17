'use client';
import { RoomContext} from '@livekit/components-react';
import { Room } from 'livekit-client';
import '@livekit/components-styles';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import MyVideoComponent from '@/app/components/videoComponents';

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
  }, [roomInstance, room, name]);

  return (
    <RoomContext.Provider value={roomInstance}>
      <MyVideoComponent/>
    </RoomContext.Provider>
  );
}

