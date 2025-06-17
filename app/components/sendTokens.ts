import { Config } from "wagmi";
import { ABI, CONTRACT_ADDRESS, USDC_CONTRACT_ADDRESS } from "../utils/contractDetails";
import { erc20Abi } from "viem";
import { WriteContractMutateAsync } from "wagmi/query";

const approve = async (writeContractAsync: WriteContractMutateAsync<Config, unknown>, amount: number) => {

    try {
        await writeContractAsync(
            {
                abi: erc20Abi,
                address: USDC_CONTRACT_ADDRESS,
                functionName: "approve",
                args: [CONTRACT_ADDRESS, BigInt(amount)]
            }
        )
    } catch (e) {
        console.log(e);
        throw e;
    }
}

const tranfer = async (writeContractAsync: WriteContractMutateAsync<Config, unknown>, amount: number, participants: string[]) => {
    try {
        await writeContractAsync(
            {
                abi: ABI,
                address: CONTRACT_ADDRESS,
                functionName: "transfer",
                args: [participants, (amount * (10**6))]
            }
        )
    }
    catch (e) {
        console.log(e);
        throw e;
    }
}

export const sendTokens = async (writeContractAsync: WriteContractMutateAsync<Config, unknown>, participants: string[], amount: number) => {
    const totalAmount = participants.length * amount * (10 ** 6);
    await approve(writeContractAsync, totalAmount);
    await tranfer(writeContractAsync, amount, participants);
}