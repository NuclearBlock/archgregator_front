import React from 'react';
import { useParams } from "react-router-dom";

import Grid from '@material-ui/core/Grid';

import ContractExecutionsGrid from '../components/grids/ContractExecutionsGrid'
import CopyToClipboard from '../utils/CopyToClipboard';

function ContractExecutionPage() {

    const params = useParams();

    return (
    
    <div cleaaName="main">

        <Grid container spacing={0}>
            <Grid  item xs={12} spacing={0}>
                <div className="main-title">
                    <h1>Smart contract executions</h1>
                    <span>{params.address}</span>
                    <CopyToClipboard textToCopy={params.address} />
                </div>
            </Grid>
        </Grid>

        <Grid container item xs={12} spacing={0}>
            <ContractExecutionsGrid />
        </Grid>

        
    </div>
  )
};

export default ContractExecutionPage;