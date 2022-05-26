import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';

import DashboardCard from './DashboardCard';
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

    const [data, setData] = useState({
        contractscount: [], 
        developerscount: [],
        gastoday: [],
        rewardstoday: [],
        rewardsleaders: [],
        executionleaders: []
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchData = () => {
        setIsLoading(true);
        Promise.all([
            fetch('/api/contractscount'),
            fetch('/api/developerscount'),
            fetch('/api/gastoday'),
            fetch('/api/rewardstoday'),
            fetch('/api/rewards/?limit=5'),
            fetch('/api/contracts/?limit=5'),
        ])
        .then(([res1, res2, res3, res4, res5, res6]) => Promise.all([res1.json(), res2.json(), res3.json(), res4.json(), res5.json(), res6.json()]))
        .then(([data1, data2, data3, data4, data5, data6]) => {
            setIsLoading(false);
            setData({
                contractscount: data1, 
                developerscount: data2,
                gastoday: data3,
                rewardstoday: data4,
                rewardsleaders: data5,
                executionleaders: data6,
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
        <>
        <Grid container item xs={12} spacing={0}>
            <Grid item xs={12} sm={3} spacing={0} >   
                <DashboardCard 
                    title="TOTAL CONTRACTS"
                    subtitle="total"
                    progresslabel="active"
                    data={data.contractscount}
                    isLoading={isLoading}
                />
            </Grid>

            <Grid item xs={12} sm={3} spacing={0} >
                <DashboardCard 
                    title="TOTAL DEVELOPERS"
                    subtitle="total"
                    progresslabel="active"
                    data={data.developerscount}
                    isLoading={isLoading}
                />
            </Grid>

            <Grid item xs={12} sm={3} spacing={0} >
                <DashboardCard 
                    title="GAS USED"
                    subtitle="today"
                    progresslabel="active"
                    data={data.gastoday}
                    isLoading={isLoading}
                />
            </Grid>

            <Grid item xs={12} sm={3} spacing={0} >      
                <DashboardCard 
                    title="REWARDS DISTRIBUTION"
                    subtitle="today"
                    progresslabel="active"
                    data={data.rewardstoday}
                    isLoading={isLoading}
                />
            </Grid>
        </Grid>

        <Grid container item xs={12} spacing={0}>
            <Grid item xs={12} sm={4} spacing={0} >
                <DashdoardRewardsRank 
                    data={data.rewardsleaders}
                    isLoading={isLoading}
                />
            </Grid>
            <Grid item xs={12} sm={4} spacing={0} >
                <DashdoardContractsRank 
                    data={data.executionleaders}
                    isLoading={isLoading}
                />
            </Grid>

            <Grid item xs={12} sm={4} spacing={0} >
                {/* <DashdoardLiveRewards /> */}
                <DashboardDiagram1 isLoading={isLoading} />
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
