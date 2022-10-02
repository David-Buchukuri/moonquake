import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend, ResponsiveContainer
} from "recharts";
import axios from "axios";

export default function Chart() {
  const [data, setData] = useState([]);
  const url =
    "https://test-deployment-production.up.railway.app/api/statistics/by-year";
  const fetchData = async () => {
    const res = await axios.get(url);
    const rawData = res.data;
    const mappedData = rawData.map(({ year, amount }) => {
      return { name: year, amount };
    });
    setData(mappedData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <div className="chart__wrapper">
        {data && (
          <div style={{ width: "100%", height: 600 }}>
            <ResponsiveContainer>
              <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
                barSize={70}
              >
                <XAxis dataKey="name" scale="point" padding={{ left: 35, right: 35 }} />
                <YAxis />
                <Tooltip />
                <Legend />
                <CartesianGrid strokeDasharray="3 3" />
                <Bar dataKey="amount" fill="#8884d8" animationDuration={1500} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

      </div>
    </div>
  );
}
