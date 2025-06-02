"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const joinHandler = (e: any) => {
    e.preventDefault();
    const room = data.room;
    const name = data.name;
    router.push(`/room/${room}/${name}`);
  }

  const [data, setData] = useState({
    room: '',
    name: '',
  });

  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data.room,data.name);
  }

  return (
    <div className="flex flex-col gap-y-10">
        <input type="text" placeholder="enter room name" name="room" id="room" value={data.room} onChange={handleChange}></input>
        <input type="text" placeholder="enter your name" name="name" id="name" value={data.name} onChange={handleChange}></input>
        <button type="submit" onClick={e => joinHandler(e)}>Join</button>
    </div>
  );
}
