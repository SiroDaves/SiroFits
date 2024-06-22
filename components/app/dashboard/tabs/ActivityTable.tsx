import { DataTable } from "@/components/reusable/DataTable";
//import { useActivityStore } from "@/state/activity/activity";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

import { FC, useState } from "react";
import { Activity } from "@/state/activity/types";

interface ActivityTableProps { data: Activity[] }

export const ActivityTable: FC<ActivityTableProps> = ({
  data
}) => {
  //const { fetchClubActivities } = useActivityStore();
  const router = useRouter();

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "quoteNumber",
      header: "Activity No.",
    },
    {
      accessorKey: "customer",
      header: "Customer",
      cell: ({ row }) => {
        return (
          <span className="capitalize">
            {row.original?.firstName + " " + row.original?.surname}
          </span>
        );
      },
    },
    {
      accessorKey: "plan",
      header: "Plan",
      cell: ({ row }) => {
        return <span>{row.original?.quoteDetail?.planName}</span>;
      },
    },
    {
      accessorKey: "quoteStatus",
      header: "Status",
    },
    {
      accessorKey: "date",
      header: "Update At",
      cell: ({ row }) => {
        return (
          <span>
            {dayjs(row.original?.updateAt).format("YYYY-MM-DD hh:mm A")}
          </span>
        );
      },
    },
  ];

  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};
