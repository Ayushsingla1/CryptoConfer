import { GridLayout, ParticipantTile, useTracks } from "@livekit/components-react";
import {Track} from "livekit-client";

const MyVideoConference = () => {

  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false },
  );
  return (
    <div className='flex h-90vh w-full'>
      <GridLayout tracks={tracks} className='min-h-[90vh]'>
        <ParticipantTile />
      </GridLayout>
    </div>
  );
}

export default MyVideoConference;