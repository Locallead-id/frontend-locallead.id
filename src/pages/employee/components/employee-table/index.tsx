import DataTable from "@/components/shared/data-table";
import { columns } from "./columns";
import EmployeeTableActions from "./employee-table-action";  

type TEmployeeTableProps = {
  users: any;
  page: number;
  totalUsers: number;
  pageCount: number;
};

export default function EmployeeTable({
  users,
  pageCount,
}: TEmployeeTableProps) {
  return (
    <>
      <EmployeeTableActions />
      {users && (
        <DataTable columns={columns} data={users} pageCount={pageCount} />
      )}
    </>
  );
}
