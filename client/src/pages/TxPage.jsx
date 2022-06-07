import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import CopyToClipboard from '../utils/CopyToClipboard';

import TxPanel from '../components/panels/TxPanel'

import { defaultRegistryTypes as defaultStargateTypes } from '@cosmjs/stargate';
import { CosmWasmClient, createWasmAminoConverters   } from '@cosmjs/cosmwasm-stargate';
import { decodeTxRaw, Registry } from '@cosmjs/proto-signing'
import { 
    MsgStoreCode,
    MsgInstantiateContract, 
    MsgExecuteContract,
    MsgMigrateContract,
    MsgUpdateAdmin,
    MsgClearAdmin,
} from "cosmjs-types/cosmwasm/wasm/v1/tx";

const RPC_NODE = process.env.REACT_APP_RPC_NODE || "https://rpc.torii-1.archway.tech";
// console.log('RPC_NODE=', RPC_NODE);

const wasmTypes = createWasmAminoConverters();
/* this contains /ibc.applications.transfer.v1.MsgTransfer */
let registry = new Registry(defaultStargateTypes);
registry.register('/cosmwasm.wasm.v1.MsgStoreCode', MsgStoreCode);
registry.register('/cosmwasm.wasm.v1.MsgInstantiateContract', MsgInstantiateContract);
registry.register('/cosmwasm.wasm.v1.MsgExecuteContract', MsgExecuteContract);
registry.register('/cosmwasm.wasm.v1.MsgMigrateContract', MsgMigrateContract);
registry.register('/cosmwasm.wasm.v1.MsgUpdateAdmin', MsgUpdateAdmin);
registry.register('/cosmwasm.wasm.v1.MsgClearAdmin', MsgClearAdmin);

export default function TxPage() {

    const params = useParams();

    const [data, setData] = useState({
        tx: false,
        log: [],
        rawTx: {},
        messages: [],
        body: {},
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const tx_hash = params.tx_hash

    const fetchData = () => {
        setIsLoading(true);

        CosmWasmClient.connect(RPC_NODE)
        .then((response) => response.getTx(tx_hash))
        //.then((response) => response.json)
        .then((data) => {      
            // console.log(data);

            let txLog = data.rawLog;
            if (data.code == 0) {
                txLog = JSON.parse(data.rawLog);
            }
            
            const decodedTx = decodeTxRaw(data.tx);
            const parsedMessages = [];
            for (const message of decodedTx.body.messages) {
                const decodedMsg = registry.decode(message);
                parsedMessages.push(decodedMsg);
            }

            const txBody = decodedTx.body;
            const txBodyDecoded = registry.decodeTxBody(txBody);

            setData({
                tx: data,
                log: txLog,
                rawTx: decodedTx,
                messages: parsedMessages,
                body: txBody,
            });

            setIsLoading(false);
        })
        .catch((error) => {
            setIsLoading(false);
            setError(error.message);
            console.log(error);
        });

    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        
        <div className='main'>
            
            <Grid container spacing={0}>
                <Grid  item xs={12} spacing={0}>           
                    <div className="main-title">
                        <h1>Transaction Details</h1>
                        <span>{params.tx_hash}</span>
                        <CopyToClipboard textToCopy={params.tx_hash} />
                    </div>
                </Grid>
            </Grid>

            <Grid container spacing={0}>
                <Grid  item xs={12} spacing={0}>             
                    <TxPanel data={data} isLoading={isLoading} />
                </Grid>
            </Grid>

        </div>
        
    );
}
