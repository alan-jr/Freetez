import { TezosToolkit, MichelsonMap } from '@taquito/taquito';
import { InMemorySigner } from '@taquito/signer';
import dotenv from 'dotenv';

dotenv.config(); // Load private key from .env

const RPC_URL = 'https://ghostnet.ecadinfra.com'; // Testnet RPC
const PRIVATE_KEY = process.env.TEZOS_PRIVATE_KEY || ''; // Load from .env

const Tezos = new TezosToolkit(RPC_URL);

async function deployEscrow() {
    try {
        Tezos.setProvider({ signer: new InMemorySigner(PRIVATE_KEY) });

        // Smart contract Michelson code
        const escrowContractCode = `(parameter (or (unit %release) (unit %refund)));
        (storage (pair (address %client) (address %freelancer) (mutez %balance)));
        (code {...Your Michelson Contract Here...}))`;

        // Initial storage values
        const initialStorage = {
            client: 'tz1...',  // Replace with Client Tezos Address
            freelancer: 'tz1...', // Replace with Freelancer Tezos Address
            balance: 0,
        };

        console.log('Deploying Escrow Contract...');

        // Deploy contract
        const originationOp = await Tezos.contract.originate({
            code: escrowContractCode,
            storage: initialStorage,
        });

        console.log(`Awaiting confirmation...`);
        const contract = await originationOp.contract();
        console.log(`Escrow Contract Deployed at: ${contract.address}`);

    } catch (error) {
        console.error('Error deploying contract:', error);
    }
}

deployEscrow();
    