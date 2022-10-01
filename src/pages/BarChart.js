import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
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
      barSize={20}
    >
      <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
      <YAxis />
      <Tooltip />
      <Legend />
      <CartesianGrid strokeDasharray="3 3" />
      <Bar dataKey="amount" fill="#8884d8" animationDuration={1500} />
    </BarChart>
  );
}