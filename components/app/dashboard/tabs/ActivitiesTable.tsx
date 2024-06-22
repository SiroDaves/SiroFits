import { DataTable } from "@/components/reusable/DataTable";
import { ColumnDef } from "@tanstack/react-table";

import { FC } from "react";
import { FormatDistance, FormatElevation, FormatTime, calculateSpeed } from "@/lib/formating";
import { ClubAthlete } from "@/state/athlete/types";

interface ActivityTableProps { data: ClubAthlete[], activityType: string }

export const ActivitiesTable: FC<ActivityTableProps> = ({
  data, activityType
}) => {
  var activityColumnHeader = 'Activities';
  var paceColumnHeader = 'Pace';
  switch (activityType) {
    case 'Ride':
      activityColumnHeader = 'Rides';
      var paceColumnHeader = 'Avg. Speed';
      break;
    case 'Run':
      activityColumnHeader = 'Runs';
      break;
    case 'Walk':
      activityColumnHeader = 'Walks';
      break;
    case 'InlineSkate':
      var paceColumnHeader = 'Avg. Speed';
      break;
  }

  const columns: ColumnDef<ClubAthlete>[] = [{
    accessorKey: "rank",
    header: "Rank",
    cell: ({ row }) => {
      return (
        <span>
          {row.index + 1}
        </span>
      );
    },
  },
  {
    accessorKey: "athlete",
    header: "Athlete",
    cell: ({ row }) => {
      return (
        <span>
          {row.original?.fullname}
        </span>
      );
    },
  },
  {
    accessorKey: "time",
    header: "Time",
    cell: ({ row }) => {
      return (
        <span>
          {FormatTime(row.original?.time)}
        </span>
      );
    },
  },
  {
    accessorKey: "activities",
    header: activityColumnHeader,
    cell: ({ row }) => {
      return (
        <span>
          {row.original?.activities}
        </span>
      );
    },
  },
  {
    accessorKey: "distance",
    header: "Distance",
    cell: ({ row }) => {
      return (
        <span>
          {FormatDistance(row.original?.distance)}
        </span>
      );
    },
  },
  /*{
    accessorKey: "pace",
    header: paceColumnHeader,
    cell: ({ row }) => {
      return (
        <span>
          {calculateSpeed(row.original?.distance, row.original?.time, activityType)}
        </span>
      );
    },
  },*/
  {
    accessorKey: "elevation",
    header: "Elevation Gain",
    cell: ({ row }) => {
      return (
        <span>
          {FormatElevation(row.original?.elevation)}
        </span>
      );
    },
  },
  ]

  if (activityType != 'All') {
    const timeColumnIndex = columns.findIndex(column => column.header === 'Time');
    if (timeColumnIndex !== -1) {
      columns.splice(timeColumnIndex, 1);
    }
  }
  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};
