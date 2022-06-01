import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Grid from '@material-ui/core/Grid';

import RewardPanel from '../components/panels/RewardPanel'
import RewardRelativeExecutionsPanel from '../components/panels/RewardRelativeExecutionsPanel'

export default function RewardPage() {

    const params = useParams();

    const [data, setData] = useState({
        rewardsData: false, 
        executionsData: false,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchData = () => {
        setIsLoading(true);

        Promise.all([
            fetch(`/api/rewards/${params.address}/${params.block}`),
            fetch(`/api/executions/${params.address}/${params.block}`),
        ])
        .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
        .then(([data1, data2]) => {
            
            setIsLoading(false);
            setData({
                rewardsData: data1, 
                executionsData: data2, 
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
        
        <div className='main'>
            
            <Grid container spacing={0}>
                <Grid  item xs={12} spacing={0}>           
                    <div className="main-title">
                        <h1>Rewards Details</h1>
                    </div>
                </Grid>
            </Grid>

            <Grid container spacing={0}>
                <Grid  item xs={12} spacing={0}>
                    <RewardPanel data={data.rewardsData} isLoading={isLoading} />
                </Grid>
            </Grid>

            <Grid container spacing={0}>
                <Grid  item xs={12} spacing={0}>
                    <RewardRelativeExecutionsPanel data={data.executionsData} isLoading={isLoading} />
                </Grid>
            </Grid>

        </div>
        
    );
}
