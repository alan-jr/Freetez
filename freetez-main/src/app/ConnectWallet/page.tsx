import React, { useState } from "react";

const ConnectWallet: React.FC = () => {
  const [privateKey, setPrivateKey] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handlePrivateKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPrivateKey(value);

    if (value.length >= 90 && value.length <= 100) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const handleConnect = () => {
    if (isValid) {
      setIsConnected(true);
    }
  };

  return (
    <div style={{ position: "fixed", bottom: "20px", right: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
      {/* Button to open the modal */}
      <button
        onClick={() => setShowModal(true)}
        style={{ padding: "10px 20px", borderRadius: "5px", cursor: "pointer", backgroundColor: "purple", color: "white", border: "none" }}
      >
        Connect Wallet
      </button>

      {/* Modal */}
      {showModal && (
        <div style={{
          position: "fixed", bottom: "20px", right: "20px",
          backgroundColor: "white", padding: "20px", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
        }}>
          {!isConnected ? (
            <>
              <h3>Enter Private Key</h3>
              <input
                type="text"
                placeholder="Enter your private key"
                value={privateKey}
                onChange={handlePrivateKeyChange}
                style={{
                  padding: "10px",
                  marginBottom: "10px",
                  border: "1px solid",
                  borderColor: isValid ? "green" : "red",
                  borderRadius: "5px",
                  width: "300px",
                  color: "black"
                }}
              />
              <button
                onClick={handleConnect}
                style={{
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: isValid ? "pointer" : "not-allowed",
                  backgroundColor: isConnected ? "green" : "purple",
                  color: "white",
                  marginTop: "10px"
                }}
                disabled={isConnected}
              >
                {isConnected ? "Connected" : "Connect"}
              </button>
              {privateKey.length > 0 && (
                <p style={{ color: isValid ? "green" : "red", fontWeight: "bold", marginTop: "10px" }}>
                  {isValid ? "Wallet Connected" : "Invalid Key"}
                </p>
              )}
            </>
          ) : (
            <p style={{ color: "green", fontWeight: "bold" }}>Wallet Connected</p>
          )}
          <button onClick={() => setShowModal(false)} style={{ marginTop: "10px", backgroundColor: "red", color: "white", padding: "5px 10px", borderRadius: "5px", border: "none", cursor: "pointer" }}>Close</button>
        </div>
      )}
    </div>
  );
};

export default ConnectWallet;
