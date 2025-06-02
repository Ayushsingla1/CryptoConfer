"use client"
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Coins, Image, Plus, Settings, Shield, Sparkles, Users, Zap } from "lucide-react";
import { motion} from "motion/react";
import React, { useState } from "react";
import { containerVariants, floatingVariants, itemVariants } from "../components/create-room-motion";
import { useAccount, useSignMessage } from "wagmi";
import { useRouter } from "next/navigation";

const ruleOptions = [
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

const CreateRoom = () => {

    const {address} = useAccount();
    const {signMessageAsync} = useSignMessage()
    const [data,setData] = useState({
        roomName : "",
        tokenContract : "",
        nftContract : "",
        tokenCount : 1,
    })

    const router = useRouter();

    const changeHandler = (e : React.ChangeEvent<HTMLInputElement>) => {
        setData((prev) => {
            return {
                ...prev,
                [e.target.name] : e.target.value
            }
        })
    }

    const [isLoading,setLoading] = useState(false);

    const handleCreateRoom = async() => {
        setLoading(true);
        if(selectedRule === null){
            alert("Select a Rule for Room")
            setLoading(false);
            return;
        }
        if(data.roomName.trim().length === 0){
            alert("Enter some room name");
            setLoading(false)
            return;
        }
        try{
            if(selectedRule === 0){
                console.log("Creating a room with no rule");
                const message = `Creating a room with name ${data.roomName} and no rule`;
                const signature = await signMessageAsync({message : message});
                console.log(signature)
                // if(signature !== undefined){
                //     router.push(`/room/${signature.slice(0,10)}}/${address}`)
                // }
            }
            else if(selectedRule === 1){
                console.log("Creating a room with nft rule");
    
                if(data.nftContract.trim().length === 0) {
                    alert("Enter nft contract address");
                }
                else {
                    const message = `Creating a room with name ${data.roomName} and nft rule having contract address ${data.nftContract}`;
                    const signature = await signMessageAsync({message : message});
                    console.log(signature)
                    // if(signature !== undefined){
                    //     router.push(`/room/${signature.slice(0,10)}}/${address}`)
                    // }
                }
            }
            else{
                console.log("Creating a room with token rule");
                if(data.tokenContract.trim().length === 0){
                    alert("Enter token contract address");
                }
                else{
                    const message = `Creating a room with name ${data.roomName} and nft rule having contract address ${data.tokenContract} and a count of ${data.tokenContract}`;
                    const signature = await signMessageAsync({message : message});
                    console.log(signature)
                    // if(signature !== undefined){
                    //      router.push(`/room/${signature.slice(0,10)}}/${address}`)
                    // }
                }
            }
        }catch(e){
            console.log(e);
        }finally{
            setLoading(false);
        }
    }

    const [selectedRule,SetSelectedRule] = useState<number|null>(null);

    return <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 text-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"
          variants={floatingVariants}
          animate="animate"
        />
        <motion.div
          className="absolute top-40 right-32 w-24 h-24 bg-blue-400/10 rounded-full blur-xl"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 1 }}
        />
        <motion.div
          className="absolute bottom-32 left-1/3 w-40 h-40 bg-slate-500/10 rounded-full blur-xl"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 2 }}
        />
      </div>

      <motion.div
        className="relative z-10 container mx-auto px-6 py-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible">
        <motion.header 
            className="flex justify-between items-center mb-16"
            variants={itemVariants}
            >
            <motion.div 
                className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
            >
                MeetAI Token Rooms
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <ConnectButton/>
            </motion.div>
            </motion.header>
            <motion.section className="flex items-center flex-col">
                <motion.section className="flex flex-col justify-center items-center">
                    <div className="text-white text-4xl font-bold font-stretch-110%">Join a Meeting Room</div>
                    <div className="text-white mt-6 text-lg">Enter a room ID or create a new room with custom access rules using AI</div>

                    <motion.button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex justify-center items-center px-6 rounded-md mt-8"  whileHover={{scale : 1.1}} whileTap={{scale : 0.90}}>
                        <Sparkles className="w-5 h-5 mr-2"/>
                        Create Room with AI 
                        <Zap className="w-5 h-5 ml-2"/>
                    </motion.button>
                </motion.section>

                    <motion.section className="mt-20 flex flex-col items-center px-10 gap-y-12 self-center border-2 border-slate-600 rounded-xl py-10 bg-transparent shadow-lg">
                        <motion.div className="flex flex-col gap-y-6 self-start w-full">
                            <motion.label htmlFor="roomName" className="flex items-center">
                                <Settings className="w-5 h-5 mr-2"/>
                                Room Name
                            </motion.label>
                            <motion.input type="text" name="roomName" id="roomName" value={data.roomName} placeholder="Enter your room name" className="w-full px-2 py-2  text-white border-2 border-slate-600 rounded-lg" onChange={changeHandler}/>
                        </motion.div>

                        <motion.div className="flex flex-col self-start gap-y-6">
                            <motion.div className="flex items-center">
                                <Shield className="w-5 h-5 mr-2"/>
                                Access Rules
                            </motion.div>

                            <motion.div className="flex gap-x-10">
                                {
                                    ruleOptions.map((rule,index) => (
                                        <motion.div key={index} className={`flex transition-all duration-300 flex-col items-center gap-y-6 rounded-2xl py-4 justify-center shadow-2xl px-4 w-64 border-2 ${selectedRule===index ? 'border-blue-500 bg-blue-500/10' : 'border-slate-600 bg-slate-700/50 hover:border-slate-500'}`} whileHover={{scale:1.05}} onClick={() => SetSelectedRule(index)}>
                                            <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${rule.color} flex items-center justify-center mx-auto mb-4 text-white`}>{rule.icon}</div>
                                            <div className="font-semibold">{rule.title}</div>
                                            <div className="text-center text-gray-300">{rule.description}</div>
                                        </motion.div>
                                    ))
                                }
                            </motion.div>
                        </motion.div>
                            <motion.div className="self-start w-full">
                            {
                                selectedRule === 1 || selectedRule == 2 ? (<div>
                                    {
                                        selectedRule === 1 ? 
                                        (<motion.div className="w-full text-white">
                                            <motion.input type="text" className="py-2 px-2 border-2 border-slate-600 rounded-lg w-full" placeholder="Enter the nft contract address" name = "nftContract" value={data.nftContract} onChange={changeHandler}/>
                                        </motion.div>) 
                                        : 
                                        (<motion.div className="w-full gap-x-5 flex text-white">
                                            <motion.input type="text" className="py-2 px-2 border-2 border-slate-600 rounded-lg w-full" placeholder="Enter the tokens contract address" name="tokenContract" value={data.tokenContract} onChange={changeHandler}/>
                                            <motion.input type="number" min={1} defaultValue={1} className="py-2 px-2 border-2 border-slate-600 rounded-lg w-full" placeholder="Enter the tokens Count" name="tokenCount" value={data.tokenCount} onChange={changeHandler}/>
                                        </motion.div>)
                                    }
                                </div>) : (<></>)
                            }
                            </motion.div>
                        <motion.button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex justify-center items-center px-6 rounded-2xl font-semibold" onClick={handleCreateRoom}>
                               {
                                isLoading ? (<>loading.....</>) : (<><Plus className="w-5 h-5 mr-2"/> Create Room</>)
                               }
                        </motion.button>
                    </motion.section>
            </motion.section>

      </motion.div>
    </div>
}

export default CreateRoom;