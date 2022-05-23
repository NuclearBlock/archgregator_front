import React from 'react';
import { Routes, Route, useParams } from "react-router-dom";

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },  
    paper: {
        padding: theme.spacing(2),
        textAlign: 'left',
        minWidth: '100%',
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

export default function ParametersBlock() {

    const useStyles = makeStyles((theme) => ({
        root: {
            width: '100%',
        },  
        paper: {
            padding: theme.spacing(2),
            textAlign: 'right',
            minWidth: '100%',
            color: theme.palette.text.secondary,
        },
    }));


    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" }
        return new Date(dateString).toLocaleDateString(undefined, options)
    }

    const classes = useStyles();
    const params = useParams();

    return (

        <Paper className={classes.paper}>
                Contract {params.address} Rewards Data         
        </Paper>
        
    );
}
