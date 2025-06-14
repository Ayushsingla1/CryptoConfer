import { Coins, Image, Users } from "lucide-react";


export const ruleOptions = [
    {
    id: "none",
    title: "No Requirements",
    description: "Join without any token or NFT requirements",
    icon: <Users className="w-6 h-6" />,
    color: "from-slate-600 to-slate-700"
    },
    {
    id: "nft",
    title: "NFT Holders Only",
    description: "Require specific NFT ownership to join",
    icon: <Image className="w-6 h-6"/>,
    color: "from-blue-600 to-blue-700"
    },
    {
    id: "token",
    title: "Token Holders",
    description: "Require minimum token balance to participate",
    icon: <Coins className="w-6 h-6" />,
    color: "from-blue-500 to-blue-600"
    }
];
