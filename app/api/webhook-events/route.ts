import { WebhookReceiver } from 'livekit-server-sdk';
import { NextRequest, NextResponse } from 'next/server';
import { Rooms,Room } from '@/app/lib/rooms-data';

const receiver = new WebhookReceiver(
  process.env.NEXT_PUBLIC_API_KEY!,
  process.env.NEXT_PUBLIC_API_SECRET!
);

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const authHeader = req.headers.get('authorization');

    console.log('Auth Header:', authHeader);
    console.log('Raw Body:', rawBody);

    const event = await receiver.receive(rawBody, authHeader!); 
    console.log('Event:', event);

    console.log(event.event);

    if(event.event === "room_started"){

        if(!event.room?.name){
          return;
        }
        const room : Room = {
            id : event.room?.name,
            participants : new Set()
        }
        Rooms.set(event.room?.name,room);
    }
    else if(event.event === "participant_joined"){
        if(!event.room?.name || !event.participant?.identity) return;
        const roomId : string = event.room?.name;
        const participant : string = event.participant?.identity;
        Rooms.get(roomId)?.participants.add(participant);
    }
    else if(event.event === "participant_left"){
        if(!event.room?.name || !event.participant?.identity) return;
        const roomId : string = event.room?.name;
        const participant : string = event.participant?.identity;
        Rooms.get(roomId)?.participants.delete(participant);
    }
    else if(event.event === "room_finished"){
      if(!event.room?.name) return;
        const roomId : string = event.room?.name;
        Rooms.delete(roomId);
    }

    console.log(Rooms);

    return new NextResponse('Received', { status: 200 });

  } 
  catch (err) {
    console.error('Webhook error:', err);
    return new NextResponse('Webhook validation failed', { status: 400 });
  }
}