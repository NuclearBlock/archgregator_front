import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Grid from '@material-ui/core/Grid';

import CodePanel from '../components/panels/CodePanel'
import CodeRelativeContractsPanel from '../components/panels/CodeRelativeContractsPanel'

export default function CodePage() {

    const params = useParams();

    const [data, setData] = useState({
        codeData: false, 
        contractsData: false,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchData = () => {
        setIsLoading(true);

        Promise.all([
            fetch(`/api/codes/${params.code_id}`),
            fetch(`/api/codecontracts/${params.code_id}`),
        ])
        .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
        .then(([data1, data2]) => {
            
            setIsLoading(false);
            setData({
                codeData: data1, 
                contractsData: data2, 
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
                    <CodePanel data={data.codeData} isLoading={isLoading} />
                </Grid>
            </Grid>

            <Grid container spacing={0}>
                <Grid  item xs={12} spacing={0}>
                    <CodeRelativeContractsPanel data={data.contractsData} isLoading={isLoading} />
                </Grid>
            </Grid>

        </div>
        
    );
}
