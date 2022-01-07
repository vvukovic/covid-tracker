import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../api";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

import styles from "./Chart.module.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Chart = () => {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const initialDailyData = await fetchDailyData();

      setDailyData(initialDailyData);
    };

    fetchApi();
  }, []);

  const labels = dailyData.map(({ date }) =>
    new Date(date).toLocaleDateString()
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "COVID-19 cases around the world",
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        data: dailyData.map(({ confirmed }) => confirmed),
        label: "Infected",
        borderColor: "#3333ff",
        fill: true,
      },
      {
        data: dailyData.map(({ deaths }) => deaths),
        label: "Deaths",
        borderColor: "red",
        backgroundColor: "rgba(255, 0, 0, 0.5)",
        fill: true,
      },
      {
        data: dailyData.map(({ recovered }) => recovered),
        label: "Recovered",
        borderColor: "green",
        backgroundColor: "rgba(0, 255, 0, 0.5)",
        fill: true,
      },
    ],
  };

  return (
    <div className={styles.container}>
      <Line options={options} data={data} />
    </div>
  );
};

export default Chart;
