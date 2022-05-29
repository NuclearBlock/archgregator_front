import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function ContractInfoChart() {

    const params = useParams();

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const fetchData = () => {
        fetch(`/api/executionscount/${params.address}/30`)
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

    return (

        <>
        <ResponsiveContainer width="100%" height="100%">
        <>

            {isLoading && <div className="chart-progress">Loading data ...</div>} 

            {data.length == 0 && <div className="chart-progress">No data found</div>}
              
            {data.length > 0 &&
                <AreaChart
                  width={550}
                  height={150}
                  data={data}
                  margin={{
                    top: 0,
                    right: 0,
                    left: -40,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="5 5" />
                  <XAxis dataKey="date" />
                  <YAxis tick={false} />
                  <Tooltip />
                  <Area type="monotone" dataKey="executed" stroke="#ff5820" fill="#f7ab93" />
                </AreaChart>
            }
        </>
        </ResponsiveContainer>

        {/* <div>
            Execution Chart
        </div> */}
        </>

    );

}