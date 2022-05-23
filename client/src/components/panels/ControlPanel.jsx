import React, { useState } from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';




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
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 200,
        },
    }));

    const classes = useStyles();

    // The first commit of Material-UI
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    // const handleStartDateChange = (date) => {
    //     setStartDate(date);
    // };
    // const handleEndDateChange = (date) => {
    //     setEndDate(date);
    // };

    return (

        <Paper className={classes.paper}>
            

                <span>&nbsp;&nbsp;</span>

                
          

        </Paper>
        
    );
}
