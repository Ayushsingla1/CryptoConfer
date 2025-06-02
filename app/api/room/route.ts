import { NextRequest, NextResponse } from "next/server"
import { Rooms } from "../../lib/rooms-data";

export const POST = async(req : NextRequest) => {

    const body = await req.json();
    console.log(body);

    const roomId = body.roomId;
    if(!roomId) {
        return NextResponse.json({type:"room-id-not-given"})
    }
    if(Rooms.has(roomId)){
        return NextResponse.json({type:"room-found"});
    }
    else return NextResponse.json({type:"not-found"});
}