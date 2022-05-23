import React, { useState, useEffect } from 'react';
import Checkbox from '@material-ui/core/Checkbox';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';


export default function ControlPanel2() {


    const [isStandartGas, setIsStandartGas] = useState(true);
    const [isGaRebate, setIsGasRebate] = useState(true);
    const [isContractPremium, setIsContractPremiun] = useState(true);
    
    const handleIsStandartGas = (event) => {
        setIsStandartGas(event.target.checked);
        // console.log(isStandartGas);
        console.log(event.target.checked);
        // console.log(isStandartGas);
    };
    const handleIsGasRebateChange = (event) => {
        setIsGasRebate(event.target.checked);
    };
    const handleIsContractPremium = (event) => {
        setIsContractPremiun(event.target.checked);
    };

    useEffect(() => {
        console.log(isStandartGas, '- Has changed')
    },[isStandartGas]) // <-- here put the parameter to listen

    return (

        <>
            {/* <Paper variant="outlined" square className={classes.paper}> */}
                <Grid item xs={12} sm={6} spacing={2}>
                    <br/>
                    Sort by Reward Type:
                </Grid>
                <Grid item xs={12} spacing={0} >
                    <span>Standart Gas</span>
                    <Checkbox
                        checked={isStandartGas}
                        onChange={handleIsStandartGas}
                        defaultChecked
                        color="primary"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                    &nbsp;&nbsp;

                    Gas Rebates To User
                    <Checkbox
                        checked={isGaRebate}
                        onChange={handleIsGasRebateChange}
                        defaultChecked
                        color="primary"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />

                    &nbsp;&nbsp;

                    Collect Premium
                    <Checkbox
                        checked={isContractPremium}
                        onChange={handleIsContractPremium}
                        defaultChecked
                        color="primary"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />

                </Grid>
            
            {/* </Paper>  */}
        </>

    );
}
