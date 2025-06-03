import { NextRequest, NextResponse } from "next/server"
import { Room, Rooms, Rule } from "../../lib/rooms-data";

export const POST = async(req : NextRequest) => {

    const body = await req.json();
    console.log(body);

    const roomId = body.roomId;
    if(!roomId) {
        return NextResponse.json({type:"room-id-not-given"})
    }
    if(Rooms.has(roomId)){
        return NextResponse.json({type:"room-found",rule : Rooms.get(roomId)?.rules});
    }
    else return NextResponse.json({type:"not-found"});
}


export const PUT = async(req : NextRequest) => {
    console.log("hi there");
    const body = await req.json();
    console.log(body);
    const roomId = body.roomId;
    try{
        if(!roomId){
        return NextResponse.json({type:"room-id-not-given"})
        }

        if(!Rooms.has(roomId)){
            console.log("creating a room");
            const room  : Room = {
                id : roomId,
                participants : new Set(),
                rules : {
                    type : Rule.NoRule
                },
            }
            Rooms.set(roomId,room);
        }
        const room = Rooms.get(roomId);
        if(!room) return NextResponse.json({type:"room-found"});
        if(body.rule === Rule.NoRule){
            room.rules.type = Rule.NoRule;
        }
        else if(body.rule === Rule.NftRule){
            room.rules.type = Rule.NftRule;
            room.rules.nftAddress = body.nftAddress;
        }
        else if(body.rule === Rule.TokenRule){
            room.rules.type = Rule.TokenRule;
            room.rules.tokenCount = body.tokenCount;
            room.rules.tokenAddress = body.tokenContract;
        }
        console.log(room)
        return NextResponse.json({success : true});

    }catch(e){
        console.log(e);
        return NextResponse.json({success : false})
    }
}


