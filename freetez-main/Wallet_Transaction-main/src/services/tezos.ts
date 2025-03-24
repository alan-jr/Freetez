import { TezosToolkit } from '@taquito/taquito';
import { InMemorySigner } from '@taquito/signer';

const Tezos = new TezosToolkit('https://mainnet-tezos.giganode.io');

export const setWallet = async (privateKey: string) => {
    const signer = await InMemorySigner.fromSecretKey(privateKey);
    Tezos.setProvider({ signer });
};

export default Tezos;