import { TezosToolkit } from "@taquito/taquito";
import { InMemorySigner } from "@taquito/signer";
import dotenv from "dotenv";

dotenv.config();
const privateKey = process.env.PRIVATE_KEY;
if (!privateKey) {
    throw new Error("❌ Private key is missing in environment variables");
}
const Tezos = new TezosToolkit("https://mainnet.smartpy.io"); // Replace with your network
Tezos.setProvider({ signer: new InMemorySigner(process.env.PRIVATE_KEY!) });

export async function sendFA12Token(tokenContract: string, recipient: string, amount: number) {
    try {
        const contract = await Tezos.contract.at(tokenContract);
        const operation = await contract.methods.transfer(process.env.WALLET_ADDRESS, recipient, amount).send();
        await operation.confirmation();
        console.log("FA1.2 Token Transfer Successful! Hash:", operation.hash);
        return operation.hash;
    } catch (error) {
        console.error("FA1.2 Token Transfer Failed:", error);
        throw error;
    }
}
export async function sendFA2Token(tokenContract: string, tokenId: number, recipient: string, amount: number) {
    try {
        const contract = await Tezos.contract.at(tokenContract);
        const operation = await contract.methods.update_operators([
            {
                add_operator: {
                    owner: process.env.WALLET_ADDRESS,
                    operator: recipient,
                    token_id: tokenId
                }
            }
        ]).send();
        await operation.confirmation();
        console.log("FA2 Token Transfer Successful! Hash:", operation.hash);
        return operation.hash;
    } catch (error) {
        console.error("FA2 Token Transfer Failed:", error);
        throw error;
    }
}
export const signer = new InMemorySigner(privateKey);