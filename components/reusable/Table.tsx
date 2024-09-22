import { Pagination } from "@/components/reusable";
import { DataTable } from "@/components/reusable/DataTable";
import { PaginationProps } from "@/lib/app";
import { useProposalStore } from "@/state/sirofits/sirofits";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface TableProps {
  data: any;
  withPagination?: boolean;
  pagination: PaginationProps;
  onPaginationChange?: (page: number) => void;
  columns: ColumnDef<any>[];
}

export const CustomeTable: FC<TableProps> = ({
  data,
  withPagination,
  pagination,
  onPaginationChange,
  columns,
}) => {
  const { updateSelectedProposal } = useProposalStore();
  const router = useRouter();
  const viewProposal = (row: any) => {
    updateSelectedProposal(row);
    router.push(`/proposals/${row?.id}`);
  };

  return (
    <div>
      <DataTable columns={columns} data={data} />
      {withPagination && (
        <Pagination
          currentPage={pagination.number + 1}
          totalPages={pagination.totalPages}
          onPaginationChange={onPaginationChange}
        />
      )}
    </div>
  );
};
