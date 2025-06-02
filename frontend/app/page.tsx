import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Home() {

  return (
    <div className="flex flex-col gap-y-10 w-screen h-screen bg-black">
      <div className="self-end pt-6 pr-6"><ConnectButton chainStatus="icon"/></div>
    </div>
  );
}
