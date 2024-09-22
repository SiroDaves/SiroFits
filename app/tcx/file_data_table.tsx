"use client";

import React from 'react';
import { useSirofitsStore } from "@/state/sirofits/sirofits";
import { DescriptionPanel } from '@/components/reusable/DescriptionPanel';
import { formatTime } from '@/lib/formating';

const FileDataTable: React.FC = () => {
  const { fileData } = useSirofitsStore();

  return (
    <table className="table-auto">
      <tbody>
        <tr>
          <td><h1>Time</h1></td>
          <td>
            <DescriptionPanel
              label="Moving Time"
              description={formatTime(fileData?.movingTime)}
            />
          </td>
          <td>
            <DescriptionPanel
              label="Elapsed Time"
              description={formatTime(fileData?.elapsedTime)}
            />
          </td>
        </tr>
        <tr>
          <td><h1>Speed</h1></td>
          <td>
            <DescriptionPanel
              label="Avg Speed"
              description={`${fileData?.avgSpeed} km/h`}
            />
          </td>
          <td>
            <DescriptionPanel
              label="Max Speed"
              description={`${fileData.maxSpeed} km/h`}
            />
          </td>
        </tr>
        <tr>
          <td><h1>Heart Rate</h1></td>
          <td>
            <DescriptionPanel
              label="Avg Heart Rate"
              description={`${fileData.avgHeartRate} bpm`}
            />
          </td>
          <td>
            <DescriptionPanel
              label="Max Heart Rate"
              description={`${fileData.maxHeartRate} bpm`}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default FileDataTable;

