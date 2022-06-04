import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress'; 

import ContractInfoPanel from '../components/panels/ContractInfoPanel'
import ContractMetadataPanel from '../components/panels/ContractMetadataPanel'
import ContractExecutionsPanel from '../components/panels/ContractExecutionsPanel'
import ContractRewardsPanel from '../components/panels/ContractRewardsPanel'

import CopyToClipboard from '../utils/CopyToClipboard';


function ContractInfoPage() {

    const params = useParams();

    const [data, setData] = useState({
        contractData: false, 
        contractSummary: false,
        contractMetaData: false,
        contractRewards: false,
        contractExecutions: false,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchData = () => {
        setIsLoading(true);

        Promise.all([
            fetch(`/api/contracts/${params.address}`),
            fetch(`/api/contractsummary/${params.address}`),
            fetch(`/api/contracts/metadata/${params.address}`),
            fetch(`/api/rewards/${params.address}/?limit=10`),
            fetch(`/api/executions/${params.address}?limit=10`),
        ])
        .then(([res1, res2, res3, res4, res5]) => Promise.all([res1.json(), res2.json(), res3.json(), res4.json(), res5.json()]))
        .then(([data1, data2, data3, data4, data5]) => {
            
            setIsLoading(false);
            setData({
                contractData: data1, 
                contractSummary: data2,
                contractMetaData: data3,
                contractRewards: data4,
                contractExecutions: data5,
            });
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
    
        <div className="main">

            <Grid container spacing={0}>
                <Grid  item xs={12} spacing={0}>
                    <div className="main-title">
                        <h1>Smart contract details</h1>
                        <span>{params.address}</span>
                        <CopyToClipboard textToCopy={params.address} />
                    </div>
                </Grid>
            </Grid>

            {/* {isLoading && <div className="progress-main"><CircularProgress size="4rem" /></div>}  */}
            
            <Grid container spacing={0}>

                <Grid  item xs={12} spacing={0} >
                    <ContractInfoPanel info={data.contractData} summary={data.contractSummary} isLoading={isLoading} />
                </Grid>

            </Grid>

            <Grid container spacing={0}>

                <Grid  item xs={12} spacing={0} >
                    <ContractMetadataPanel data={data.contractMetaData} isLoading={isLoading} />
                </Grid>

            </Grid>

            <Grid container spacing={0} >

                <Grid  item sm={6} spacing={0} >
                    <ContractRewardsPanel data={data.contractRewards} isLoading={isLoading} />
                </Grid> 
                
                <Grid  item sm={6} spacing={0} >
                    <ContractExecutionsPanel data={data.contractExecutions} isLoading={isLoading} />
                </Grid> 

            </Grid>

        </div>
    )
};

export default ContractInfoPage;