import { generateMnemonic, validateMnemonic } from "bip39";
import { InMemorySigner } from "@taquito/signer";

async function generateTezosKey() {
    try {
        // Generate a 15-word mnemonic
        const mnemonic = generateMnemonic(160);

        // Validate the mnemonic
        if (!validateMnemonic(mnemonic)) {
            throw new Error("Invalid mnemonic generated");
        }

        console.log("Mnemonic:", mnemonic);

        // Generate Tezos keys from the mnemonic
        const signer = await InMemorySigner.fromMnemonic({ mnemonic }); // Only mnemonic is needed
        const privateKey = await signer.secretKey();
        const publicKey = await signer.publicKey();
        const address = await signer.publicKeyHash();

        console.log("Private Key:", privateKey);
        console.log("Public Key:", publicKey);
        console.log("Tezos Address:", address);
    } catch (error) {
        console.error("Error generating Tezos keys:", error);
    }
}

generateTezosKey();