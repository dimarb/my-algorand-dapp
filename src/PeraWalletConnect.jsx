import React, { useState } from 'react';
import { PeraWalletConnect } from '@perawallet/connect';
import { callMethod } from './appCaller'; // Asegúrate de que la ruta es correcta

const peraWallet = new PeraWalletConnect();

const PeraWalletConnectComponent = () => {
    const [accountAddress, setAccountAddress] = useState(null);

    const connectWallet = async () => {
        try {
            const newAccounts = await peraWallet.connect();
            peraWallet.connector.on("disconnect", () => {
                setAccountAddress(null);
            });

            if (newAccounts.length > 0) {
                setAccountAddress(newAccounts[0]);
            }
        } catch (error) {
            console.error("Failed to connect to Pera Wallet", error);
        }
    };

    const handleCallContract = async () => {
        if (accountAddress) {
            const method =  {
                "name": "emitShares",
                "args": [
                  {
                    "name": "name",
                    "type": "string"
                  },
                  {
                    "name": "unitName",
                    "type": "string"
                  },
                  {
                    "name": "q",
                    "type": "uint64"
                  }
                ],
                "returns": {
                  "type": "uint64"
                }
              }
            await callMethod(peraWallet,accountAddress, method, ["Mi Token", "MTK", "1000"]);
        } else {
            alert("Connect to Pera Wallet first");
        }
    };

    return (
        <div>
            <button onClick={connectWallet}>Connect Pera Wallet</button>
            {accountAddress && (
                <div>
                    <p>Connected Account: {accountAddress}</p>
                    <button onClick={handleCallContract}>Cree su Token</button>
                </div>
            )}
        </div>
    );
};

export default PeraWalletConnectComponent;