import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';



const Diagram = () => {

  const [data, setData] = useState([])

  const fetch = async () => {
    const response = await axios.get(
      "https://test-deployment-production.up.railway.app/api/statistics"
    );
    const chartsData = response?.data?.map((element) => {
      return {
        uv: Number(element.magnitude),
        pv: Number(element.magnitude),
        year: element.timestamp?.substring(0, 10),
      };
    });
    setData(chartsData)
  }
  useEffect(() => {
    fetch()
  }, [])
  // console.log(data)
  return (
    <div className='App'>
      <div className='chart__wrapper'>
        <div style={{ width: '100%', height: 600}}>
          <ResponsiveContainer>
            <AreaChart
              width={500}
              height={400}
              data={data}
              margin={{
                top: 50,
                right: 50,
                bottom: 50,
              }}
            >
              <CartesianGrid />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Diagram