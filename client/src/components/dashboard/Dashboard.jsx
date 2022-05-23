import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import DashboardCard1 from './DashboardCard1';
import DashboardCard2 from './DashboardCard2';
import DashboardCard3 from './DashboardCard3';
import DashboardCard4 from './DashboardCard4';
import DashboardDiagram1 from './DashboardDiagram1';
import DashdoardRewardsRank from './DashdoardRewardsRank';
import DashdoardContractsRank from './DashdoardContractsRank';
import DashdoardChart from './DashdoardChart';

import Helper from '../../utils/Helper'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 500,
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




export default function Dashboard() {

    const classes = useStyles();

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const fetchData = () => {
        fetch('/api/info')
        .then((response) => response.json())
        .then((data) => {
            setIsLoading(false);
            setData(data);
        })
        .catch((error) => {
            setIsLoading(false);
            setIsError(true);
            console.log(error);
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
        <Grid container item xs={12} spacing={0}>
            <Grid item xs={12} sm={3} spacing={0} >   
                <DashboardCard1 />
            </Grid>

            <Grid item xs={12} sm={3} spacing={0} >
                <DashboardCard2 />  
            </Grid>

            <Grid item xs={12} sm={3} spacing={0} >
                <DashboardCard3 />
            </Grid>

            <Grid item xs={12} sm={3} spacing={0} >      
                <DashboardCard4 />
            </Grid>
        </Grid>

        <Grid container item xs={12} spacing={0}>
            <Grid item xs={12} sm={4} spacing={0} >
                <DashdoardRewardsRank />
            </Grid>
            <Grid item xs={12} sm={4} spacing={0} >
                <DashdoardContractsRank />
            </Grid>

            <Grid item xs={12} sm={4} spacing={0} >
                {/* <DashdoardLiveRewards /> */}
                <DashboardDiagram1 />
            </Grid>
        </Grid>

        <Grid container item xs={12} spacing={0}>
            <Grid container sm={4} spacing={0} >

            </Grid>

            <Grid container sm={4} spacing={0} >

            </Grid>
                
            <Grid container sm={4} spacing={0} >

            </Grid>
        </Grid>

        </>

    );
}
