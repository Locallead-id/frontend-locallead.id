import { Checkbox } from "@/components/ui/checkbox";
import { Employee } from "@/constants/data";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export const columns: ColumnDef<Employee>[] = [
  {
    id: "select",
    header: ({ table }) => <Checkbox checked={table.getIsAllPageRowsSelected()} onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)} aria-label="Select all" />,
    cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "profile.fullName",
    header: "NAME",
  },
  // {
  //   accessorKey: "country",
  //   header: "COUNTRY",
  // },
  {
    accessorKey: "email",
    header: "EMAIL",
  },
  {
    accessorKey: "profile.isPremium",
    header: "STATUS",
    cell: ({ row }) => {
      return <div className="">{row.getValue("profile.isPremium") ? "Premium" : "Basic"}</div>;
    },
  },
  {
    accessorKey: "total_results",
    header: "FINISHED",
    // Not Done
    cell: ({ row }) => {
      const totalResults = row.getValue("total_results") ?? 0;
      const totalAssessments = row.getValue("total_assessments") ?? 0;

      // return <div> {`${totalResults} / ${totalAssessments}`}</div>;
      return <div> {`${totalResults}`}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
