import { SignMessageMutateAsync } from "wagmi/query";
import { Rule } from "./rooms-data";
import { Data } from "../create-room/page";
import axios from "axios";


type response = {
    success: boolean,
    roomId?: string,
}

export const createRoom = async (signMessageAsync: SignMessageMutateAsync<unknown>, data: Data, address: string): Promise<response> => {

    console.log(data);
    try {
        if (data.type === Rule.NoRule) {
            const message = `Creating a room with name ${data.roomName} and no rule`;
            const signature = await signMessageAsync({ message: message });
            if (signature != null) {
                const res = await axios.put("/api/room", {
                    owner: address,
                    rule: Rule.NoRule,
                    roomId: signature.slice(0, 10)
                });

                return res.data.success ? { success: true, roomId: signature.slice(0, 10), }
                    : { success: false };
            }
            else return { success: false };

        }
        else if (data.type === Rule.NftRule) {
            if (!data.nftContract) {
                alert("Nft contract not given");
                return { success: false }
            }
            if (data.nftContract.trim().length === 0) {
                alert("Enter nft contract address");
                return { success: false }
            }
            else {
                const message = `Creating a room with name ${data.roomName} and nft rule having contract address ${data.nftContract}`;
                const signature = await signMessageAsync({ message: message });
                if (signature != null) {
                    const res = await axios.put("/api/room", {
                        owner: address,
                        rule: Rule.NftRule,
                        nftAddress: data.nftContract,
                        roomId: signature.slice(0, 10)
                    });


                    return res.data.success ? { success: true, roomId: signature.slice(0, 10), }
                        : { success: false };
                }
                else return { success: false };
            }
        }
        else {
            if (!data.tokenContract) {
                alert("token contract not given");
                return { success: false }
            }
            if (data.tokenContract.trim().length === 0) {
                alert("Enter token contract address");
                return { success: false }
            }
            else {
                const message = `Creating a room with name ${data.roomName} and nft rule having contract address ${data.tokenContract} and a count of ${data.tokenContract}`;
                const signature = await signMessageAsync({ message: message });
                console.log(signature)
                if (signature != null) {
                    const res = await axios.put("/api/room", {
                        owner: address,
                        rule: Rule.TokenRule,
                        tokenCount: data.tokenCount,
                        tokenContract: data.tokenContract,
                        roomId: signature.slice(0, 10)
                    });

                    return res.data.success ? { success: true, roomId: signature.slice(0, 10), }
                        : { success: false };
                }
                else return { success: false };
            }
        }
    } catch (e) {
        console.log(e)
        return { success: false };
    }
}