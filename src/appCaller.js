import algodClient from './algorandClient';
import algosdk from 'algosdk';
import appId from './appId';


export const callMethod = async (peraWallet,accountAddress, method, methodArgs) => {
    console.log(appId)
    
           // Obtener parámetros de transacción
        const suggestedParams = await algodClient.getTransactionParams().do();
        suggestedParams.fee = 12_000;
        // Crear la transacción de llamada al contrato inteligente
        const txn = algosdk.makeApplicationCallTxnFromObject({
            from: accountAddress,
            appIndex: appId,
            onComplete: algosdk.OnApplicationComplete.NoOpOC,
            appArgs: [(new algosdk.ABIMethod(method)).getSelector(), ...methodArgs.map(arg => typeof arg === 'string' ? new Uint8Array(Buffer.from(arg)) : new Uint8Array(Buffer.from(arg)))],
            suggestedParams
        });

        console.log("Transaction created:", txn.from);

        const signedTxn = await peraWallet.signTransaction([[
            {
                txn: txn,
                message: "Call smart contract transaction",
                signers: [algosdk.encodeAddress(txn.from.publicKey)],
            }
        ]]);
    
      // Enviar transacción a la TestNet
      const { txId } = await algodClient.sendRawTransaction(signedTxn).do();

      console.log("Transaction sent with ID:", txId);
        
   
};

