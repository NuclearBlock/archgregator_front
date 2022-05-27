import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import DashboardCard from './DashboardCard';
import DashboardDiagram1 from './DashboardDiagram1';
import DashboardRewardsRank from './DashboardRewardsRank';
import DashboardSubsidiesRank from './DashboardSubsidiesRank';
import DashboardContractsRank from './DashboardContractsRank';
import DashboardChart from './DashboardChart';

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
        subsidiesleaders: [],
        executionleaders: [],
        rewardsratio: [],
        rewardschart: [],
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
            fetch('/api/rewards/?type=2&limit=5'),
            fetch('/api/rewards/?type=3&limit=5'),
            fetch('/api/contracts/?limit=5'),
            fetch('/api/rewardsratio'),
            fetch('/api/rewardschart'),
        ])
        .then(([res1, res2, res3, res4, res5, res6, res7, res8, res9]) => Promise.all([res1.json(), res2.json(), res3.json(), res4.json(), res5.json(), res6.json(), res7.json(), res8.json(), res9.json()]))
        .then(([data1, data2, data3, data4, data5, data6, data7, data8, data9]) => {
            setIsLoading(false);
            setData({
                contractscount: data1, 
                developerscount: data2,
                gastoday: data3,
                rewardstoday: data4,
                rewardsleaders: data5,
                subsidiesleaders: data6,
                executionleaders: data7,
                rewardsratio: data8,
                rewardschart: data9,
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
                    title="CONTRACTS GAS"
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
            <Grid container sm={8} spacing={0} >
                <DashboardChart data={data.rewardschart} isLoading={isLoading} />
            </Grid>
            <Grid container sm={4} spacing={0} >
                <DashboardDiagram1 data={data.rewardsratio} isLoading={isLoading} />
            </Grid>
        </Grid>

        <Grid container item xs={12} spacing={0}>
            <Grid item xs={12} sm={4} spacing={0} >
                <DashboardRewardsRank 
                    data={data.rewardsleaders}
                    isLoading={isLoading}
                />
            </Grid>
            <Grid item xs={12} sm={4} spacing={0} >
                <DashboardSubsidiesRank 
                    data={data.subsidiesleaders}
                    isLoading={isLoading}
                />
            </Grid>

            <Grid item xs={12} sm={4} spacing={0} >
                <DashboardContractsRank 
                    data={data.executionleaders}
                    isLoading={isLoading}
                />
            </Grid>
        </Grid>

        

        </>

    );
}
