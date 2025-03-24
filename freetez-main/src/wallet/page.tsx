import React, { useState } from "react";
import { connectWallet, disconnectWallet } from "../wallet";

const WalletConnect = () => {
    const [walletAddress, setWalletAddress] = useState("");

    const handleConnect = async () => {
        const address = await connectWallet();
        if (address) setWalletAddress(address);
    };

    return (
        <div>
            {walletAddress ? (
                <button onClick={disconnectWallet}>Disconnect Wallet</button>
            ) : (
                <button onClick={handleConnect}>Connect Wallet</button>
            )}
            {walletAddress && <p>Connected: {walletAddress}</p>}
        </div>
    );
};

export default WalletConnect;
