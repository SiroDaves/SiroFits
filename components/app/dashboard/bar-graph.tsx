"use client";

import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { FC } from "react";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom" as const,
    },
  },
  scales: {
    x: {
      beginAtZero: true,
      stepSize: 200,
      barPercentage: 1,
    },
  },
};

export const BarGraph: FC<{ weeklySummaryResponse: any }> = ({
  weeklySummaryResponse,
}) => {
  const data = {
    labels: weeklySummaryResponse?.map((day: any) => day.dayOfWeek.trim()),
    datasets: [
      {
        label: "Review",
        data: weeklySummaryResponse?.map((day: any) => day.reviewActivities),
        backgroundColor: "rgba(18, 118, 190, 0.8)",
      },
      {
        label: "Approved",
        data: weeklySummaryResponse?.map((day: any) => day.approvedActivities),
        backgroundColor: "rgba(229, 35, 19, 0.8)",
      },
    ],
  };

  return (
    <div
      style={{
        height: "350px",
        width: "100%",
      }}
    >
      <Bar options={options} data={data} width={"1200px"} height={"350px"} />
    </div>
  );
};
