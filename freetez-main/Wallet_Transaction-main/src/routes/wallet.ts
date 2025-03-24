import express, { Request, Response } from "express";
import { TezosToolkit } from "@taquito/taquito";

const router = express.Router();
const tezos = new TezosToolkit("https://mainnet.api.tez.ie"); // Replace with your Tezos RPC

// Send XTZ
router.post("/send", async (req: Request, res: Response): Promise<void> => {
    try {
        const op = await tezos.contract.transfer({
            to: req.body.to,
            amount: req.body.amount,
        });
        await op.confirmation(1);
        res.json({ message: "XTZ transfer successful", hash: op.hash });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// Send FA1.2 Token
router.post("/sendFA12", async (req: Request, res: Response): Promise<void> => {
    try {
        const contract = await tezos.contract.at(req.body.contractAddress);
        const op = await contract.methods.transfer(
            req.body.from,
            req.body.to,
            req.body.amount
        ).send();
        await op.confirmation(1);
        res.json({ message: "FA1.2 Token transfer successful", hash: op.hash });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// Send FA2 Token
router.post("/sendFA2", async (req: Request, res: Response): Promise<void> => {
    try {
        const contract = await tezos.contract.at(req.body.contractAddress);
        const op = await contract.methods.update_operators([
            { add_operator: { owner: req.body.from, operator: req.body.to, token_id: req.body.tokenId } },
        ]).send();
        await op.confirmation(1);
        res.json({ message: "FA2 Token transfer successful", hash: op.hash });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
