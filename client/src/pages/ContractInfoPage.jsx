import React, { useState, useEffect } from 'react';
import { Routes, Route, useParams } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import ContractInfo from '../components/ContractInfo'
import ContractExecutionsGrid from '../components/grids/ContractExecutionsGrid'
import ContractRewardsPanel from '../components/panels/ContractRewardsPanel'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },  
    paper: {
        padding: theme.spacing(2),
        textAlign: 'left',
        width: '100%',
        maxWidth: '100%',
        color: theme.palette.text.secondary,
    },
    arrow: {
        color: theme.palette.common.black,
    },
    tooltip: {
        fontSize: '1em',
        backgroundColor: theme.palette.common.black,
    },
    table: {
        width: '100%',
        border: '',
    },
    tableContract: {
        width: '70%',
        border: '',
    },
}));

function ContractInfoPage() {

    const classes = useStyles();

    const params = useParams();

    return (
    
        <>
            <Grid container spacing={0}>
                <Grid  item xs={12} spacing={2}>
                    <h1>Smart contract details</h1>
                    {params.address}
                    <br/><br/>
                </Grid>
            </Grid>

            <Grid container spacing={2} className={classes.root}>
                <Grid  item sm={6} spacing={2} className={classes.root}>
                    <ContractInfo/>
                </Grid>

                <Grid  item sm={6} spacing={2} className={classes.root}>
                    <Grid container spacing={0} className={classes.root}>
                        <Grid  item xs={12} spacing={2} className={classes.root}>
                            <ContractRewardsPanel/>
                        </Grid> 
                        <Grid  item xs={12} spacing={2} className={classes.root}>
                            <ContractExecutionsGrid limit={10}/>
                        </Grid> 
                    </Grid> 
                </Grid>   
            </Grid>

            <Grid container spacing={0} className={classes.root}>
                
            </Grid>

        </>
    )
};

export default ContractInfoPage;